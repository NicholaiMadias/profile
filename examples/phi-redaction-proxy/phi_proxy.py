"""Illustrative local PHI tokenization before third-party LLM requests.

NOT a HIPAA Safe Harbor certification or complete de-identification solution.
Requires evaluation, policy review, and approval before external transmission.
"""

from __future__ import annotations

import re
import secrets
from dataclasses import dataclass
from typing import Dict, List, Optional, Protocol


@dataclass(frozen=True)
class Detection:
    start: int
    end: int
    entity_type: str
    score: float


@dataclass
class ScrubResult:
    text: str
    # Sensitive! Keep this mapping within the authorized local request boundary.
    vault: Dict[str, str]


class Analyzer(Protocol):
    def analyze(self, *, text: str, entities: List[str], language: str,
                score_threshold: float) -> List[Detection]: ...


# Exact entity types supported by a baseline Presidio installation.
BASE_ENTITIES = [
    "PERSON", "LOCATION", "DATE_TIME", "PHONE_NUMBER", "EMAIL_ADDRESS",
    "US_SSN", "IP_ADDRESS", "URL", "US_DRIVER_LICENSE", "US_BANK_NUMBER",
    "MEDICAL_LICENSE",
]

# Conservative local templates for labeled fields. Customize and validate them
# against the identifiers actually used by your healthcare organization.
CUSTOM_FIELDS = {
    "MEDICAL_RECORD_NUMBER": r"\b(?:MRN|medical\s+record(?:\s+(?:number|no\.?))?)\s*[:#=-]?\s*[A-Z0-9][A-Z0-9-]{4,19}\b",
    "HEALTH_PLAN_ID": r"\b(?:member\s+ID|subscriber\s+ID|health\s+plan\s+ID|policy\s+(?:number|no\.?|ID))\s*[:#=-]?\s*[A-Z0-9][A-Z0-9-]{3,24}\b",
    "ACCOUNT_NUMBER": r"\b(?:account\s+(?:number|no\.?|ID)|acct\s*#?)\s*[:#=-]?\s*[A-Z0-9][A-Z0-9-]{3,24}\b",
    "CERTIFICATE_LICENSE_NUMBER": r"\b(?:certificate\s+(?:number|no\.?|ID)|license\s+(?:number|no\.?|ID))\s*[:#=-]?\s*[A-Z0-9][A-Z0-9-]{3,24}\b",
    "DEVICE_IDENTIFIER": r"\b(?:device\s+(?:serial|ID)|serial\s+(?:number|no\.?))\s*[:#=-]?\s*[A-Z0-9][A-Z0-9-]{3,29}\b",
    "VEHICLE_IDENTIFIER": r"\b(?:VIN|license\s+plate)\s*[:#=-]?\s*[A-Z0-9][A-Z0-9-]{3,19}\b",
    "ZIP_CODE": r"\b\d{5}(?:-\d{4})?\b",
    # One illustrative labeled-phrase recognizer; contextual high ages and
    # age-derived dates require additional policy handling.
    "AGE_90_PLUS": r"\b(?:age(?:d)?\s*[:=]?\s*)(?:9\d|1\d{2})\b",
}

TOKEN_PATTERN = re.compile(r"__PHI_[0-9a-f]{16}_[A-Z][A-Z0-9_]*_\d+__")


class LocalPHIProxy:
    def __init__(self, analyzer: Optional[Analyzer] = None,
                 score_threshold: float = 0.6) -> None:
        if not 0.0 <= score_threshold <= 1.0:
            raise ValueError("score_threshold must be between 0 and 1")
        self.score_threshold = score_threshold
        if analyzer is None:
            from presidio_analyzer import AnalyzerEngine, Pattern, PatternRecognizer

            analyzer = AnalyzerEngine()
            for entity_type, expression in CUSTOM_FIELDS.items():
                recognizer = PatternRecognizer(
                    supported_entity=entity_type,
                    patterns=[Pattern(name=entity_type.lower(), regex=expression,
                                      score=0.85)],
                    supported_language="en",
                    global_regex_flags=re.DOTALL | re.MULTILINE | re.IGNORECASE,
                )
                analyzer.registry.add_recognizer(recognizer)
        self.analyzer = analyzer

    def scrub(self, text: str) -> ScrubResult:
        if not isinstance(text, str):
            raise TypeError("text must be a string")
        detected = self.analyzer.analyze(
            text=text, entities=BASE_ENTITIES + list(CUSTOM_FIELDS),
            language="en", score_threshold=self.score_threshold,
        )

        # Merge intersecting detection spans. This prevents text corruption
        # and conservatively redacts the union when recognizers disagree.
        spans = sorted(
            (Detection(int(r.start), int(r.end), str(r.entity_type), float(r.score))
             for r in detected if 0 <= r.start < r.end <= len(text)),
            key=lambda d: (d.start, d.end),
        )
        merged: List[tuple[int, int, str]] = []
        for result in spans:
            if merged and result.start < merged[-1][1]:
                start, end, old_entity_type = merged[-1]
                merged[-1] = (
                    start,
                    max(end, result.end),
                    old_entity_type if old_entity_type == result.entity_type else "SENSITIVE",
                )
            else:
                merged.append((result.start, result.end, result.entity_type))

        # Randomized per-request namespace, independent of patient identity.
        nonce = secrets.token_hex(8)
        while f"__PHI_{nonce}_" in text:
            nonce = secrets.token_hex(8)
        seen: Dict[tuple[str, str], str] = {}
        counters: Dict[str, int] = {}
        vault: Dict[str, str] = {}
        output: List[str] = []
        cursor = 0
        for start, end, entity_type in merged:
            original = text[start:end]
            key = (entity_type, original)
            if key not in seen:
                counters[entity_type] = counters.get(entity_type, 0) + 1
                token = f"__PHI_{nonce}_{entity_type}_{counters[entity_type]}__"
                seen[key] = token
                vault[token] = original
            output.extend([text[cursor:start], seen[key]])
            cursor = end
        output.append(text[cursor:])
        return ScrubResult("".join(output), vault)

    @staticmethod
    def rehydrate_locally(llm_output: str, vault: Dict[str, str]) -> str:
        """Authorized local output only. Never retransmit to a public LLM."""
        if not isinstance(llm_output, str):
            raise TypeError("llm_output must be a string")

        def replace(match: re.Match[str]) -> str:
            token = match.group(0)
            if token not in vault:
                raise ValueError("LLM output contains an unknown PHI placeholder")
            return vault[token]

        return TOKEN_PATTERN.sub(replace, llm_output)


if __name__ == "__main__":
    # Synthetic data only. Do not log real clinical notes or token mappings.
    synthetic = (
        "Patient Jane Doe (MRN-8472910) was seen on 04/14/2026 "
        "and lives in ZIP 34683. Call 727-555-0194. "
        "Jane Doe reported fatigue following lisinopril initiation."
    )
    proxy = LocalPHIProxy()
    result = proxy.scrub(synthetic)
    print("Illustrative scrubbed text (requires privacy review):\n", result.text)
    # This demo deliberately makes no external LLM API request.
    result.vault.clear()
