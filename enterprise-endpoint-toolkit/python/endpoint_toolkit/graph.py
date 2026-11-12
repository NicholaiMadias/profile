import requests

class GraphClient:
    def __init__(self, token, session=None):
        if not token:
            raise ValueError("An access token is required")
        self.session = session or requests.Session()
        self.headers = {"Authorization": f"Bearer {token}"}

    def get_users(self):
        url = "https://graph.microsoft.com/v1.0/users"
        users = []
        while url:
            response = self.session.get(url, headers=self.headers, timeout=30)
            response.raise_for_status()
            data = response.json()
            users.extend(data.get("value", []))
            url = data.get("@odata.nextLink")
            if url and not url.startswith("https://graph.microsoft.com/"):
                raise ValueError("Unexpected Graph pagination URL")
        return users
