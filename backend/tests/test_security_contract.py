"""Dependency-free contract checks for auth guards; runtime integration tests remain necessary."""
import ast
from pathlib import Path
import unittest

SOURCE = Path(__file__).resolve().parents[1].joinpath("main.py").read_text(encoding="utf-8")
TREE = ast.parse(SOURCE)


def endpoint(name):
    return next(node for node in TREE.body if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) and node.name == name)


def body_of(name):
    return ast.get_source_segment(SOURCE, endpoint(name))


class SecurityContractTests(unittest.TestCase):
    def test_account_endpoints_enforce_identity(self):
        for name in ("get_profile", "sync_progress", "record_lesson_completion"):
            with self.subTest(name=name):
                body = body_of(name)
                self.assertIn("Depends(get_current_user)", body)
                self.assertIn("require_owner(current_user,", body)

    def test_credit_topup_is_admin_only(self):
        body = body_of("topup_credits")
        self.assertIn("Depends(require_admin)", body)
        self.assertIn("Query(ge=1, le=10000)", body)

    def test_blog_publication_checks_custom_claims(self):
        self.assertIn("Editor permission required", body_of("create_blog_post"))
        self.assertIn("get_current_user", body_of("create_blog_post"))

    def test_credit_issuance_is_not_controlled_by_client(self):
        self.assertIn("le=0", SOURCE.split("class SyncRequest")[1].split("class LessonCompletionRequest")[0])

    def test_cors_is_not_wildcard_with_credentials(self):
        self.assertNotIn('allow_origins=["*"]', SOURCE)
        self.assertIn("LMS_ALLOWED_ORIGINS", SOURCE)


if __name__ == "__main__":
    unittest.main()
