import type { Metadata } from "next";
import Link from "next/link";
import { StudyWorkspace } from "../../components/StudyWorkspace";
import { TextStudyTool } from "../../components/TextStudyTool";

export const metadata: Metadata = {
  title: "Tools | Nicholai Maro Madias",
  description:
    "Nexus Assistant, a local-first Chrome side panel for AI chat, coding tasks, and PDF marks, plus a private study workspace.",
};

const capabilities = [
  ["Chat with your own models", "LM Studio, Ollama, OpenAI, Gemini, or DeepSeek, routed through a companion on your computer."],
  ["Coding tasks", "Use your installed Codex, or opt in to Cline. PowerShell stays off unless you start the companion with --terminal."],
  ["PDF marks", "Draw or type a visible mark and place it on a page. Works without the companion; the file never leaves your device."],
  ["Experimental browser agent", "Clicks and types in the active tab after you start a task, up to eight actions, stopping on cross-origin navigation."],
];

const steps = [
  ["Download and extract", "Extract the ZIP into a folder you control. You need Chrome and Node.js 22.9 or later."],
  ["Load the extension", "Open chrome://extensions, turn on Developer mode, choose Load unpacked, and select the extension folder. Copy its extension ID."],
  ["Start the companion", "In the companion folder run npm ci, then npm start with your extension ID and workspace path."],
  ["Connect", "Open the side panel and enter the temporary token shown in your terminal."],
];

export default function ToolsPage() {
  return (
    <div className="container page tools-page">
      <header className="tools-hero">
        <p className="eyebrow">TOOLS / LOCAL-FIRST</p>
        <h1>Tools that stay on your machine.</h1>
        <p className="lede">
          A Chrome side panel for your own AI models, coding agents, and PDFs, and a private place to keep study notes. No hosted accounts and no cloud sync.
        </p>
        <nav className="tools-jump" aria-label="On this page">
          <a href="#nexus-assistant">Nexus Assistant</a>
          <a href="#install">Install</a>
          <a href="#ssh">SSH access</a>
          <a href="#safety">Safety</a>
          <a href="#workspace">Study workspace</a>
        </nav>
      </header>

      <section id="nexus-assistant" className="tools-feature" aria-labelledby="nexus-title">
        <div>
          <p className="eyebrow">CHROME EXTENSION / EARLY PREVIEW v0.1.0</p>
          <h2 id="nexus-title">Nexus Assistant</h2>
          <p>
            Bring your own accounts and API keys. The companion runs on your computer, and cloud providers may charge for their own services.
          </p>
          <div className="tools-actions">
            <a className="tools-button" href="/downloads/nexus-assistant-preview.zip" download>
              Download preview (.zip)
            </a>
            <Link className="tools-button secondary" href="/nexus">
              Read the overview
            </Link>
          </div>
          <p className="tools-fineprint">Requires Chrome and Node.js 22.9+. Not a Chrome Web Store release.</p>
        </div>
        <ul className="tools-capabilities">
          {capabilities.map(([title, text]) => (
            <li key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="install" className="tools-section" aria-labelledby="install-title">
        <p className="eyebrow">SET UP IN FOUR STEPS</p>
        <h2 id="install-title">Install the preview</h2>
        <ol className="tools-steps">
          {steps.map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <p className="tools-fineprint">
          The ZIP includes a README with the exact commands, provider setup, and the encrypted key vault. Keep the token private: it grants access to your chosen workspace.
        </p>
      </section>

      <section id="ssh" className="tools-section" aria-labelledby="ssh-section-title">
        <p className="eyebrow">REMOTE ACCESS</p>
        <h2 id="ssh-section-title">Reach your companion over SSH</h2>
        <p>
          The companion listens only on your computer’s loopback address. To use it from another device, connect with an SSH key and forward a local port:
        </p>
        <pre className="tools-code"><code>{`ssh -N -L 8787:127.0.0.1:8787 nexus-host`}</code></pre>
        <p>
          Then open <code>http://127.0.0.1:8787/</code> on the device you connected from and enter the token shown in the companion terminal. A tunnel never replaces that token, and the port should never be opened on your router.
        </p>
        <div className="actions">
          <Link className="text-link" href="/blog/ssh-extension-access">Full SSH setup guide →</Link>
        </div>
      </section>

      <section id="safety" className="tools-section" aria-labelledby="safety-title">
        <p className="eyebrow">BEFORE YOU USE IT</p>
        <h2 id="safety-title">What to know</h2>
        <div className="card-grid two">
          <div className="feature-card">
            <h3>Privacy</h3>
            <p>
              Prompts and any page text you attach go to the provider you select, under that provider&apos;s retention policy. Never paste credentials into chat or a repository.
            </p>
          </div>
          <div className="feature-card">
            <h3>Agents can act</h3>
            <p>
              Cline can change files and run commands with your account permissions. The browser agent can misclick or be misled by page content; avoid sensitive accounts.
            </p>
          </div>
          <div className="feature-card">
            <h3>PDF marks</h3>
            <p>
              The mark is visible only. It is not a cryptographic signature or identity verification, and it may invalidate an existing digital signature. Check the output.
            </p>
          </div>
          <div className="feature-card">
            <h3>Not included</h3>
            <p>Sign-in, cloud sync, signing requests, rotated or cropped PDF pages, and hosted account management.</p>
          </div>
        </div>
        <p className="tools-fineprint">
          See the <Link href="/privacy">site privacy notice</Link>. The companion is loopback-only and should never be exposed publicly.
        </p>
      </section>

      <section id="workspace" className="tools-section" aria-labelledby="workspace-title">
        <p className="eyebrow">YOUR WORKSPACE</p>
        <h2 id="workspace-title">Make room for your ideas.</h2>
        <p>
          Reflect, prepare for Bible study, and keep what you discover. Notes are stored only in this browser; download a copy to keep them.
        </p>
        <StudyWorkspace />
      </section>

      <section className="tools-section" aria-labelledby="text-study-title">
        <p className="eyebrow">A SIMPLE WRITING TOOL</p>
        <h2 id="text-study-title">Text &amp; study analyzer</h2>
        <p>Check word and sentence counts, character length, and an estimated reading time. Analysis happens in your browser.</p>
        <TextStudyTool />
        <p className="quiet">For a command-line version, run <code>npm run text:stats -- path/to/file.txt</code> in the project.</p>
      </section>

      <section className="tools-section" aria-labelledby="games-title">
        <p className="eyebrow">TAKE A SHORT BREAK</p>
        <h2 id="games-title">Word Sprint</h2>
        <p>A private, 30-second typing challenge with an accuracy score.</p>
        <Link className="text-link" href="/arcade/word-sprint">Play Word Sprint →</Link>
      </section>

      <section className="tools-section" aria-label="More">
        <div className="actions">
          <a className="text-link" href="https://www.amazinggracehl.org/toolbox/" target="_blank" rel="noopener noreferrer">
            Amazing Grace Toolbox ↗
          </a>
          <Link className="text-link" href="/blog">Blog</Link>
          <Link className="text-link" href="/bible-study">Bible study</Link>
        </div>
      </section>
    </div>
  );
}
