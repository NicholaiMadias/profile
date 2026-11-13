"""Small, read-only Microsoft Graph user client."""
import time
from urllib.parse import urlsplit

import requests


class GraphClient:
    def __init__(self, token, session=None, max_retries=3, max_pages=1000, sleep=time.sleep):
        if not token or not token.strip():
            raise ValueError("An access token is required")
        if max_retries < 0 or max_pages < 1:
            raise ValueError("Retry and page limits must be non-negative and positive")
        self.session = session if session is not None else requests.Session()
        self.headers = {"Authorization": f"Bearer {token}"}
        self.max_retries = max_retries
        self.max_pages = max_pages
        self.sleep = sleep

    @staticmethod
    def _valid_graph_url(url):
        parts = urlsplit(url)
        return (
            parts.scheme == "https"
            and parts.hostname == "graph.microsoft.com"
            and parts.port in (None, 443)
            and not parts.username
            and not parts.password
            and parts.path.startswith("/v1.0/")
        )

    def _get(self, url):
        for attempt in range(self.max_retries + 1):
            response = self.session.get(url, headers=self.headers, timeout=30, allow_redirects=False)
            if 300 <= response.status_code < 400:
                raise ValueError("Graph redirect rejected to protect bearer token")
            if response.status_code not in (429, 500, 502, 503, 504):
                response.raise_for_status()
                return response
            if attempt == self.max_retries:
                response.raise_for_status()
            retry_after = response.headers.get("Retry-After", "")
            try:
                delay = float(retry_after)
                if not 0 <= delay <= 60:
                    raise ValueError
            except (TypeError, ValueError):
                delay = min(2 ** attempt, 30)
            self.sleep(delay)
        raise RuntimeError("Unreachable retry state")

    def get_users(self):
        url = "https://graph.microsoft.com/v1.0/users"
        users = []
        visited = set()
        while url:
            if not isinstance(url, str) or not self._valid_graph_url(url):
                raise ValueError("Unexpected Graph pagination URL")
            if url in visited:
                raise ValueError("Graph pagination cycle detected")
            if len(visited) >= self.max_pages:
                raise RuntimeError("Graph pagination limit exceeded; results incomplete")
            visited.add(url)
            data = self._get(url).json()
            if not isinstance(data, dict) or not isinstance(data.get("value"), list):
                raise ValueError("Unexpected Graph response structure")
            users.extend(data["value"])
            url = data.get("@odata.nextLink")
        return users
