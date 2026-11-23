import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Protecting Patient Data Before LLM API Calls: A Python PHI Redaction Proxy';
const description = 'Build a practical Presidio + regex PHI tokenization proxy, with local-only re-identification, overlap handling, and HIPAA Safe Harbor limitations.';
export const metadata: Metadata = { title, description };

const quickExample = String.raw`# Synthetic data only; detection is NOT proof of de-identification.
from phi_proxy import LocalPHIProxy

proxy = LocalPHIProxy()
result = proxy.scrub(
    "Patient Jane Doe (MRN-8472910) was seen on 04/14/2026."
)
# Inspect and approve result.text under your organization's PHI policy.
# Only an approved workflow may send reviewed text to an external API.
safe_text = result.text
# Re-identify ONLY inside the authorized environment:
restored = proxy.rehydrate_locally(safe_text, result.vault)
result.vault.clear()`;

export default function PHIRedactionArticle() {
  return (
    <article className="blog-shell blog-article">
      <header>
        <p className="blog-meta"><time dateTime="2026-11-23">November 23, 2026</time> · Healthcare Security · Python</p>
        <h1>{title}</h1>
        <p className="blog-deck">{description}</p>
        <p><Link href="/blog">Back to Nicholai’s Blog</Link></p>
      </header>
      <p>External large language models are useful for summarizing notes, drafting patient-support responses, and classifying service requests. The privacy boundary is the hard part: a clinical prompt may contain identifiers in both structured fields and ordinary prose.</p>
      <p>This reference implementation uses two local detection layers before an external model is ever considered: Microsoft Presidio for language-aware PII detection, plus custom regular expressions for labeled healthcare identifiers. Detected spans are replaced with randomized, request-scoped tokens. A private mapping can restore values later—but only inside an authorized environment.</p>

      <h2>Architecture: identify, replace, validate, then decide</h2>
      <ol>
        <li><strong>Analyze locally:</strong> use NER to find names and locations and patterns to detect phone numbers, dates, SSNs, MRNs, member IDs, accounts, and other structured values.</li>
        <li><strong>Resolve overlaps:</strong> merge intersecting spans before substituting tokens so identifiers are not partially leaked or text offsets corrupted.</li>
        <li><strong>Tokenize:</strong> issue randomized placeholders such as <code>__PHI_..._PERSON_1__</code>, scoped to one request and unrelated to patient identifiers. Repeat references to the same string can reuse the same placeholder within that request.</li>
        <li><strong>Require a policy gate:</strong> check the remaining text for identifiers and re-identification risk; do not assume the detector found everything.</li>
        <li><strong>Call an external LLM only when authorized:</strong> confirm the vendor relationship, data-handling commitments, and applicable business associate arrangements for any remaining PHI.</li>
        <li><strong>Restore locally if needed:</strong> validate placeholders, reinsert values inside the controlled environment, and never log or retransmit the sensitive mapping.</li>
      </ol>

      <h2>Why two layers beat a regex-only scrubber</h2>
      <p>A phone number may follow a predictable pattern; a patient name in “Jane Doe called about the prescription” does not. NER helps identify free-form references, while explicit rules address local MRN formats and field labels. Neither approach is perfect. Presidio can miss a name or misclassify medical terms, and numeric patterns may over-redact harmless values.</p>
      <p>The sample recognizers cover several common labeled fields—including medical record numbers, health-plan IDs, accounts, certificate/license identifiers, vehicle or device identifiers, ZIP codes, and age phrases—but are not a complete enumeration of every identifier or clinical narrative variation. Fax numbers, biometrics, full-face images, rare occupations and diagnoses, geographic detail, and organization-specific identifiers require additional handling.</p>

      <h2>Python implementation</h2>
      <p>Install the analyzer and an English language model in a controlled Python environment:</p>
      <pre><code>{'python -m pip install presidio-analyzer spacy\npython -m spacy download en_core_web_lg\npython -m unittest -v test_phi_proxy.py'}</code></pre>
      <p>The full sample keeps a per-request mapping in local memory, merges overlapping recognizer results, assigns tokens left to right, and rejects unknown placeholders during restoration. It deliberately does not issue an HTTP request to any LLM API.</p>
      <pre><code>{quickExample}</code></pre>
      <p><a href="https://github.com/NicholaiMadias/profile/tree/main/examples/phi-redaction-proxy">Read the complete Python source, synthetic tests, and limitations on GitHub</a>.</p>

      <h2>What HIPAA Safe Harbor actually requires</h2>
      <p>The HIPAA Privacy Rule identifies 18 categories of identifiers to address for Safe Harbor de-identification. These include names; specified geographic details; dates directly related to individuals except year (with special requirements for ages over 89); telephone and fax numbers; emails; SSNs; MRNs; health-plan and account numbers; license numbers; vehicle and device identifiers; URLs and IP addresses; biometrics; full-face imagery; and other unique identifying characteristics or codes.</p>
      <p>Removing recognized values does not by itself establish Safe Harbor compliance. A covered entity must also have no actual knowledge that the remaining information could identify the individual, alone or combined with other information. The regulation separately describes the Expert Determination approach. There is no blanket “HIPAA Safe Harbor certification” that can be conferred on this script.</p>
      <p>De-identified data and PHI are not the same category. If an external service will process PHI on behalf of a covered entity, a BAA and other applicable safeguards may be necessary; a BAA or a zero-retention setting does not repair a failed de-identification process.</p>

      <h2>Engineering controls before production</h2>
      <ul>
        <li>Use synthetic and authorized test corpora that reflect actual EHR templates and common dictation errors; measure missed identifiers, false positives, and model changes.</li>
        <li>Review date normalization, ZIP-code treatment, ages of 90 or older, and institution-specific identifier formats.</li>
        <li>Keep token mappings out of logs, tracing, telemetry, browser storage, crash dumps, queues, and external prompts; enforce request isolation, access controls, and retention limits.</li>
        <li>Validate output placeholders and prompt integrity before local re-identification. Do not interpret “vault.clear()” as guaranteed secure memory erasure.</li>
        <li>Apply vendor due diligence, encryption, access restrictions, audit controls, and an approved clinical and legal review process.</li>
      </ul>

      <h2>Testing scope and limitations</h2>
      <p>The repository includes five synthetic offline unit tests for repeated references, overlap resolution, unpredictable request tokens, unknown-token rejection, and invalid input. They test token handling; they do not measure sensitivity on real clinical records. Presidio language-model detection and any external API integration require separate end-to-end testing in the target environment.</p>
      <p><strong>Bottom line:</strong> a privacy-conscious proxy is a useful defense-in-depth pattern, not a substitute for a validated de-identification program or a security review.</p>

      <h2>References</h2>
      <ul>
        <li><a href="https://www.hhs.gov/hipaa/for-professionals/special-topics/de-identification/index.html">HHS guidance on de-identification of protected health information</a></li>
        <li><a href="https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.514">45 CFR § 164.514 — HIPAA Privacy Rule de-identification standard</a></li>
        <li><a href="https://microsoft.github.io/presidio/">Microsoft Presidio documentation</a></li>
      </ul>
    </article>
  );
}
