# Nexus Assist 1.0

This is a local-first, experimental Chrome extension and companion. It is not a
hosted account service. The included PDF tool adds a visible mark locally; it
does not provide identity verification, cryptographic signatures, or signing
requests.

## Install

1. Extract this ZIP into a folder you control. Node.js 22.9+ and Chrome are
   required.
2. Open `chrome://extensions`, enable Developer mode, select **Load unpacked**,
   and choose the extracted `extension` folder. Copy its extension ID. A ZIP
   cannot be installed by clicking it; Chrome Web Store distribution is not
   included.
3. Open a terminal in the extracted `companion` folder and run `npm ci`.
   Start the companion with your own extension ID and workspace:

   ```powershell
   npm start -- --extension-id YOUR_EXTENSION_ID --cwd 'C:\path\to\your\workspace'
   ```

4. Open the extension and enter the temporary companion token shown in the
   terminal. The token grants access to your local workspace; keep it private.
   The companion binds to loopback and should not be exposed publicly.

The PDF tool works without the companion. Choose a PDF, draw or type a
signature, choose its page and placement, and download a copy. PDF contents,
signature and output remain on your device. Check the resulting file; rotated
or cropped pages are not supported. An existing digital signature may be
invalidated.

## Models and coding tasks

The default profile uses Qwen2.5 7B with Ollama. Run `ollama pull qwen2.5:7b` on the companion host and keep Ollama running. Confirm Ollama when sending a request. LM Studio and Ollama require a
running local server and a model ID; OpenAI, Gemini and DeepSeek require your
own API keys. For example, to put your own key in the local encrypted vault:

```powershell
node vault.mjs set openai
npm start -- --extension-id YOUR_EXTENSION_ID --cwd 'C:\path\to\your\workspace' --integrations openai
```

Use `gemini` or `deepseek` for those providers. Do not paste credentials into
chat, the browser page, or a repository. The companion forwards prompts and
explicitly attached page text to the provider you select. Provider data
retention policies apply.

The host controls use your own installed and authenticated Codex. PowerShell
is disabled unless you start the companion with `--terminal`. Cline support is
disabled by default; enable it with `--enable-cline --cline-bin
C:\absolute\path\to\cline.exe`, and configure a provider and model in Cline
separately. Cline runs with auto-approval and can change files and run commands
using your account's permissions. Stopping it may not stop its child processes.
Its history and your local agent's own data-retention policies are separate
from this extension.

The experimental browser agent can click and type in the active tab after you
start a task and explicitly select its provider. It sends page headings and
control labels to that provider and performs up to eight actions without
further confirmation. It stops on cross-origin navigation and blocks common
password, payment, and secret fields, but these checks are not complete. Page
content can mislead a model into unintended actions, including form submissions.
Do not use it with accounts, pages, or data where a mistake would be harmful.
Stop cannot undo actions already performed.

Open a text file in the side panel and attach it to a chat request when you want
AI assistance. Copy the answer into the editor, review it and choose Save locally
or Download file. A local save keeps one draft in the current Chrome profile.
Drive and Firebase are optional manual backups. Use a short-lived Google OAuth
access token with the Drive `drive.file` scope or a Firebase Auth ID token from
your own project. Firebase rules must permit creating documents in
`nexusDrafts`. Backups are write-only from the sidebar. Retrieve them through
Drive or your Firebase project.

For Gemini or DeepSeek, you can also set a temporary API token in the sidebar
after saving the provider profile. Lock clears that token. OpenAI continues to
use the host vault or environment.
Do not treat this experimental build as a substitute for a reviewed production
signing or automation service.

The package license is included in `LICENSE`. The companion includes
BSD-3-Clause-licensed source; see `companion/LICENSE`. The PDF library's license
is included in `extension/vendor`.
