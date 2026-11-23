"""Offline synthetic tests for placeholder management; never call external APIs."""
import unittest
from dataclasses import dataclass
from phi_proxy import LocalPHIProxy


@dataclass
class Result:
    start: int
    end: int
    entity_type: str
    score: float = 0.9


class SyntheticAnalyzer:
    def analyze(self, *, text, entities, language, score_threshold):
        assert language == "en"
        findings = []
        for term, tag in [
            ("Jane Doe", "PERSON"),
            ("MRN-8472910", "MEDICAL_RECORD_NUMBER"),
            ("04/14/2026", "DATE_TIME"),
            ("34683", "ZIP_CODE"),
        ]:
            cursor = 0
            while True:
                p = text.find(term, cursor)
                if p == -1:
                    break
                findings.append(Result(p, p + len(term), tag))
                cursor = p + len(term)
        pos = text.find("MRN-8472910")
        if pos >= 0:
            findings.append(Result(pos + 4, pos + len("MRN-8472910"), "ZIP_CODE", 0.7))
        return findings


class ProxyTests(unittest.TestCase):
    def setUp(self):
        self.proxy = LocalPHIProxy(analyzer=SyntheticAnalyzer())

    def test_repeat_token_and_left_to_right_order(self):
        note = "Jane Doe, MRN-8472910. Jane Doe was seen 04/14/2026. ZIP 34683."
        result = self.proxy.scrub(note)
        self.assertNotIn("Jane Doe", result.text)
        self.assertNotIn("8472910", result.text)
        self.assertNotIn("34683", result.text)
        self.assertEqual(result.text.count("PERSON_1__"), 2)
        self.assertEqual(len(result.vault), 4)
        self.assertEqual(self.proxy.rehydrate_locally(result.text, result.vault), note)

    def test_overlap_is_merged_and_does_not_corrupt_following_text(self):
        note = "MRN-8472910 and Jane Doe"
        result = self.proxy.scrub(note)
        self.assertNotIn("8472910", result.text)
        person_token = next(k for k,v in result.vault.items() if v == "Jane Doe")
        self.assertTrue(result.text.endswith(" and " + person_token))
        self.assertEqual(self.proxy.rehydrate_locally(result.text, result.vault), note)

    def test_unknown_token_fails_closed(self):
        result = self.proxy.scrub("Jane Doe")
        unknown = "__PHI_1234567890abcdef_PERSON_9__"
        with self.assertRaises(ValueError):
            self.proxy.rehydrate_locally(unknown, result.vault)

    def test_request_tokens_are_distinct(self):
        a = self.proxy.scrub("Jane Doe")
        b = self.proxy.scrub("Jane Doe")
        self.assertNotEqual(a.text, b.text)

    def test_ineligible_input_raises(self):
        with self.assertRaises(TypeError):
            self.proxy.scrub(None)


if __name__ == "__main__":
    unittest.main()
