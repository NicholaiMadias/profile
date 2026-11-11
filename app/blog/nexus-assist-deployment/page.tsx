import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Deploy Nexus Assist 1.0 | Nicholai’s Blog',
  description: 'Install the Chrome side panel and local companion, then read, browse, edit and save your first draft.',
};

export default function NexusAssistDeployment() {
  return <article className="blog-shell blog-article">
    <header>
      <p className="blog-meta">Nexus Assist 1.0 · Deployment guide</p>
      <h1>Deploy Nexus Assist and save your first draft</h1>
      <p className="blog-deck">Run the agent on your computer, open it in Chrome, and decide where your drafts go.</p>
      <p><Link href="/tools#nexus-assistant">Download Nexus Assist from Tools</Link></p>
    </header>
    <h2>Install the extension and local model</h2>
    <ol>
      <li>Extract the release ZIP. Open <code>chrome://extensions</code>, enable Developer mode and load the extracted <code>extension</code> folder. Copy the extension ID.</li>
      <li>Install and start Ollama. Download the default Apache-licensed Qwen2.5 7B model with <code>ollama pull qwen2.5:7b</code>. The local model needs no API token.</li>
      <li>Use Node.js 22.9 or later. Open the extracted <code>companion</code> directory and start the bridge with your extension ID and a workspace you control.</li>
      <li>Open the Chrome side panel and paste the token printed by the companion into <strong>Bridge token</strong>. Choose <strong>Connect bridge</strong>.</li>
    </ol>
    <pre><code>{'npm ci\nnpm start -- --extension-id YOUR_EXTENSION_ID --cwd "PATH_TO_YOUR_WORKSPACE"'}</code></pre>
    <p>The companion listens on loopback. Keep the bridge token private and use an SSH tunnel if you need <Link href="/blog/ssh-extension-access">remote access</Link>.</p>

    <h2>Read, browse, edit and save</h2>
    <ol>
      <li><strong>Read.</strong> Open a text file in the draft editor or use <strong>Preview current page text</strong> to inspect an active tab before attaching it.</li>
      <li><strong>Browse.</strong> Use the browser agent for a specific task on the active tab. It can click and type for up to eight steps. Review the task and use a page where those actions are appropriate.</li>
      <li><strong>Edit.</strong> Add your draft to a chat request and describe the revision. Confirm your model, then copy the response into the draft editor and review it.</li>
      <li><strong>Save.</strong> Choose <strong>Save locally</strong> to keep the draft in this Chrome profile or <strong>Download file</strong> to keep a separate copy.</li>
    </ol>

    <h2>Set up optional provider tokens</h2>
    <p>For Gemini or DeepSeek, create a key with the provider, save that provider and its model ID in <strong>Project profiles</strong>, then enter the key in the sidebar’s <strong>Temporary API token</strong> box. The sidebar keeps these keys in extension session memory. Choose <strong>Lock</strong> to clear them.</p>
    <p>For OpenAI, the companion reads the key from its host environment or encrypted vault. The release README includes vault startup commands. Chat requests and attached text go to the provider you confirm.</p>
    <ul>
      <li><a href="https://aistudio.google.com/apikey">Gemini API keys</a></li>
      <li><a href="https://platform.deepseek.com/api_keys">DeepSeek API keys</a></li>
      <li><a href="https://ollama.com/library/qwen2.5:7b">Qwen2.5 7B for Ollama</a></li>
    </ul>

    <h2>Back up to Drive or Firebase</h2>
    <p>Open <strong>Back up to Drive or Firebase</strong> in the draft editor. For Drive, use a short-lived Google OAuth access token with the <code>drive.file</code> scope and retrieve the text file in Drive. For Firebase, enter your project ID and a Firebase Auth ID token. Your Firestore rules must authorize your account to create documents in <code>nexusDrafts</code>. Retrieve Firebase backups from that collection.</p>
    <p>Each backup sends the current draft and creates a separate copy. Use <strong>Save locally</strong> for drafts you want to keep on the device.</p>
  </article>;
}
