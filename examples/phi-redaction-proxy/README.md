# Local PHI tokenization reference

**Demonstration only.** This code is **not HIPAA Safe Harbor certification**, a complete de-identification solution, or a production-ready security control. It is intended for synthetic test data and approved engineering review.

This example combines Presidio's language-aware detection with custom patterns for labeled clinical fields. It merges overlapping spans, creates randomized request-scoped tokens, and permits local-only restoration after validation.

## Run

```bash
python -m pip install presidio-analyzer spacy
python -m spacy download en_core_web_lg
python -m unittest -v test_phi_proxy.py
python phi_proxy.py
```

The synthetic unit tests inject a fake analyzer, so they run without downloading a language model. The interactive example requires Presidio and a configured NLP model. Neither path sends data to an external LLM.

## Limitations

- Automated detection cannot establish compliance with HIPAA Safe Harbor. The enumerated identifiers and the "actual knowledge" condition must be assessed.
- NER may miss names, locations, dates, unusual spellings, and contextual clues. Additional rules and reviews are needed for unlabeled identifiers, contextual ages above 89, full-face photographs, biometric data, rare occupations, and organization-specific formats.
- Over-redaction of five-digit numeric strings is possible.
- This example does not implement a provider authorization gate, a business associate agreement, production secrets management, retention controls, or any external API call.
- Do not log plaintext notes, token mappings, telemetry, returned PHI, or rehydrated content. Clearing a Python dictionary is not guaranteed secure memory erasure.
- Review LLM outputs for injected, changed, or missing placeholders before local restoration.
- Pin dependencies and regression-test with institution-approved clinical corpora in the target environment.

**Read more:** https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html

**Presidio:** https://microsoft.github.io/presidio/

**Blog article:** https://nicholai.online/blog/phi-redaction-proxy
