import Link from "next/link";

export default function NexusAssistantPage() {
  return (
    <div className="container page narrow">
      <p className="eyebrow">NEXUS / EARLY PREVIEW</p>
      <h1>Your AI workspace, on your terms.</h1>
      <nav aria-label="Nexus navigation"><Link href="/">About Nicholai</Link><Link href="/tools">Tools and profiles</Link></nav>
      <p>Try a free, local-first Chrome sidebar for your own models, coding tools, and PDF signatures. Bring your own accounts and API keys; the companion runs on your computer. Cloud model providers may charge for their services.</p>
      <p><a className="button" href="/downloads/nexus-assistant-preview.zip" download>Download Nexus Assist 1.0 (.zip)</a></p>
      <h2>What works today</h2>
      <ul>
        <li>Chat using LM Studio, Ollama, OpenAI, Gemini, or DeepSeek through your own companion.</li>
        <li>Use your installed Codex or opt into Cline tasks. An experimental agent can click and type on the active site after you start a task.</li>
        <li>Draw a signature or choose a typed style and add it to a PDF locally, without uploading the document.</li>
      </ul>
      <h2>Before you install</h2>
      <p>Requires Chrome, Node.js 22.9 or later, and a computer that can run the companion. Extract the ZIP and use Chrome&apos;s Developer mode to load the extension folder. The ZIP includes setup and privacy notes.</p>
      <p>Cline can run commands and modify files with your account permissions when enabled. The browser agent sends page headings and control labels to your chosen model and can perform unintended actions; do not use it on sensitive accounts or pages. The visible PDF mark is not a cryptographic signature or identity verification; check the signed copy and applicable requirements.</p>
      <h2>Not in this preview</h2>
      <p>Google/Microsoft/password login, cloud sync, and sending signature requests are not implemented. This is not a Chrome Web Store release or a hosted signing service.</p>
      <p><Link href="/privacy">Read the site privacy notice</Link></p>
    </div>
  );
}
