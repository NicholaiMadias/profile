import unittest
from unittest.mock import Mock

from endpoint_toolkit.graph import GraphClient


class GraphClientTests(unittest.TestCase):
    def test_requires_token(self):
        with self.assertRaises(ValueError):
            GraphClient("")

    def test_paginates(self):
        first = Mock()
        first.json.return_value = {
            "value": [{"id": "one"}],
            "@odata.nextLink": "https://graph.microsoft.com/v1.0/users?$skiptoken=next",
        }
        second = Mock()
        second.json.return_value = {"value": [{"id": "two"}]}
        session = Mock()
        session.get.side_effect = [first, second]
        users = GraphClient("test-token", session=session).get_users()
        self.assertEqual([user["id"] for user in users], ["one", "two"])
        self.assertEqual(session.get.call_count, 2)

    def test_rejects_external_next_link(self):
        response = Mock()
        response.json.return_value = {
            "value": [],
            "@odata.nextLink": "https://example.org/steal",
        }
        session = Mock()
        session.get.return_value = response
        with self.assertRaises(ValueError):
            GraphClient("test-token", session=session).get_users()
        self.assertEqual(session.get.call_count, 1)


if __name__ == "__main__":
    unittest.main()
