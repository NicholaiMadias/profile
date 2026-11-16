import unittest
from unittest.mock import Mock

import requests

from endpoint_toolkit.graph import GraphClient


def response(value=None, next_link=None, status=200, headers=None):
    result = Mock()
    result.status_code = status
    result.headers = headers or {}
    result.json.return_value = {"value": value if value is not None else []}
    if next_link:
        result.json.return_value["@odata.nextLink"] = next_link
    if status >= 400:
        result.raise_for_status.side_effect = requests.HTTPError(str(status))
    return result


class GraphClientTests(unittest.TestCase):
    def test_requires_token(self):
        with self.assertRaises(ValueError):
            GraphClient("")

    def test_paginates(self):
        session = Mock()
        session.get.side_effect = [
            response([{"id": "one"}], "https://graph.microsoft.com/v1.0/users?$skiptoken=next"),
            response([{"id": "two"}]),
        ]
        users = GraphClient("test-token", session=session).get_users()
        self.assertEqual([user["id"] for user in users], ["one", "two"])
        self.assertEqual(session.get.call_count, 2)

    def test_rejects_external_next_link(self):
        session = Mock()
        session.get.return_value = response([], "https://example.org/steal")
        with self.assertRaises(ValueError):
            GraphClient("test-token", session=session).get_users()
        self.assertEqual(session.get.call_count, 1)

    def test_rejects_graph_lookalike(self):
        session = Mock()
        session.get.return_value = response([], "https://graph.microsoft.com.evil.test/v1.0/users")
        with self.assertRaises(ValueError):
            GraphClient("token", session=session).get_users()

    def test_detects_cycle(self):
        session = Mock()
        session.get.return_value = response([], "https://graph.microsoft.com/v1.0/users")
        with self.assertRaisesRegex(ValueError, "cycle"):
            GraphClient("token", session=session).get_users()

    def test_limits_pages(self):
        session = Mock()
        session.get.return_value = response([], "https://graph.microsoft.com/v1.0/users?$skiptoken=2")
        with self.assertRaisesRegex(RuntimeError, "incomplete"):
            GraphClient("token", session=session, max_pages=1).get_users()

    def test_retries_throttling(self):
        session = Mock()
        session.get.side_effect = [response(status=429, headers={"Retry-After": "2"}), response([{"id": "ok"}])]
        pauses = []
        result = GraphClient("token", session=session, sleep=pauses.append).get_users()
        self.assertEqual(result, [{"id": "ok"}])
        self.assertEqual(pauses, [2])

    def test_exhausted_retries_raises(self):
        session = Mock()
        session.get.return_value = response(status=503)
        with self.assertRaises(requests.HTTPError):
            GraphClient("token", session=session, max_retries=1, sleep=lambda _: None).get_users()
        self.assertEqual(session.get.call_count, 2)

    def test_rejects_redirect(self):
        session = Mock()
        session.get.return_value = response(status=302)
        with self.assertRaisesRegex(ValueError, "redirect"):
            GraphClient("token", session=session).get_users()

    def test_rejects_malformed_response(self):
        session = Mock()
        result = response()
        result.json.return_value = {"value": {}}
        session.get.return_value = result
        with self.assertRaises(ValueError):
            GraphClient("token", session=session).get_users()


if __name__ == "__main__":
    unittest.main()
