# Nexus Review Studio — local review workflow

Review Studio adds a human approval step to Nexus Assist. The public download and private Agent Nexus use the same local CLI workflow.

## Open a document for review

From the directory containing the script (with Node.js 22.9+ installed):

```powershell
node review-studio.mjs open .\plugin-review.md .\plugin-review-feedback.md
```

The command starts the third-party `markdown-review@0.0.9` browser interface. Annotate sections, answer embedded `question:open`, `question:choice`, or `question:checkbox` prompts and submit/export feedback. If no output is specified, Markdown Review prints feedback to the terminal; use the explicit output argument to save it.

## Summarize exported feedback

```powershell
node review-studio.mjs summarize .\plugin-review-feedback.md .\review-summary.md
```

The summary preserves submitted headings and comments for inspection. It **does not** run an AI model, independently judge approval, apply patches, push code, publish releases or run shell commands from feedback. Give the summary to your configured AI agent for a proposed revision, then review the proposed changes before authorizing action.

## Safety and licensing

- The upstream Markdown Review repository is **archived and unmaintained**; we pin version `0.0.9` and do not silently upgrade.
- The upstream dependency is MIT licensed; see https://github.com/rwoll/markdown-review.
- `npx` downloads the review dependency on first use; internet access and npm are required. Only review material you are allowed to expose to locally installed software.
- Keep credentials out of review documents and feedback. Do not add arbitrary file execution, browser automation, or GitHub write permissions to the review process.
- Public Nexus Assist and private Agent Nexus are separate distributions and keep their existing authentication models.
