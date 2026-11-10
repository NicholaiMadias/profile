import type { Metadata } from 'next';
import Link from 'next/link';
import { FeaturedArticles } from '../../components/FeaturedArticles';

export const metadata: Metadata = {
  title: 'Nicholai’s Blog | Technology, tools & practical engineering',
  description: 'Personal notes on software, AI, privacy and building a more useful development workflow.',
};

const audit = String.raw`# Read-only Windows audit. Nothing is removed or disabled.
# Working set is a snapshot, not a measurement of total system impact.
Get-Process |
  Sort-Object WorkingSet64 -Descending |
  Select-Object -First 20 Name, Id, @{
    Name = 'WorkingSetGB'
    Expression = { [math]::Round($_.WorkingSet64 / 1GB, 2) }
  }

# Review startup entries and both ready and running tasks.
Get-CimInstance Win32_StartupCommand |
  Select-Object Name, Command, Location, User

Get-ScheduledTask |
  Where-Object { $_.State -in 'Ready', 'Running' } |
  Select-Object TaskPath, TaskName, State

# OwningProcess lets you correlate connections with process IDs.
Get-NetTCPConnection |
  Select-Object LocalAddress, LocalPort, RemoteAddress,
    RemotePort, State, OwningProcess

# Review signature status; unsigned does not automatically mean unsafe.
Get-Process | ForEach-Object {
  $process = $_
  try {
    $path = $process.Path
    if (-not $path) { throw 'Executable path unavailable' }
    $signature = Get-AuthenticodeSignature -LiteralPath $path -ErrorAction Stop
    if ($signature.Status -ne 'Valid') {
      [PSCustomObject]@{
        Process = $process.ProcessName
        Id = $process.Id
        Status = $signature.Status
        Path = $path
      }
    }
  } catch {
    Write-Warning ("Could not inspect {0} ({1}): {2}" -f
      $process.ProcessName, $process.Id, $_.Exception.Message)
  }
}`;

export default function BlogPage() {
  return <div className="blog-shell">
    <header className="blog-intro">
      <p className="eyebrow">NOTES FROM THE WORKBENCH</p>
      <h1>Nicholai’s Blog</h1>
      <p>Technology, practical engineering, fiction lore, and tools that earn their place.</p>
      <nav aria-label="Blog navigation">
        <Link href="/">About Nicholai</Link>
        <Link href="#antigravity-dev-stack">Antigravity Dev Stack</Link>
        <Link href="#featured-story">Featured Novelette</Link>
        <Link href="#why-i-replaced-chrome-and-edge">Workflow Notes</Link>
        <Link href="/blog/ssh-extension-access">SSH Access Guide</Link>
        <Link href="/#tools">Tools and profiles</Link>
      </nav>
    </header>
      <FeaturedArticles />
      <input type="text" placeholder="Search articles…" className="blog-search" />

    <article className="blog-article blog-featured-card" id="antigravity-dev-stack" aria-labelledby="antigravity-feature-title">
      <header>
        <p className="blog-meta"><time dateTime="2026-11-04">November 4, 2026</time> · Tooling &amp; Architecture</p>
        <h2 id="antigravity-feature-title">The Antigravity Dev Stack: Customizing Terminal AI Agents</h2>
        <p className="blog-deck">Achieve escape velocity from manual configurations using agentic coding frameworks (Codex CLI, Antigravity/Gemini CLI), local LM Studio engines, Model Context Protocol (MCP), and cross-platform terminal orchestration.</p>
      </header>
      <p>Explore an in-depth blueprint covering cloud-native terminal agents, local LLM sovereignty via encrypted SSH tunnels, MCP filesystem integration, and robust CI/CD pipelines.</p>
      <p><Link className="button-link" href="/blog/antigravity-dev-stack">Read the Architecture Guide &rarr;</Link></p>
    </article>

    <article className="blog-article blog-featured-card" id="featured-story" aria-labelledby="story-feature-title">
      <header>
        <p className="blog-meta"><time dateTime="2026-11-04">November 4, 2026</time> · Cyberpunk Novelette &amp; World Lore</p>
        <h2 id="story-feature-title">Matrix of Conscience</h2>
        <p className="blog-deck">Nexus Prime, 2087 — &ldquo;In the space between signal and noise, we find what makes us human.&rdquo;</p>
      </header>
      <p>A full 7-chapter cyberpunk novelette exploring neural architects, synthetic conscience modules, state-level empathy harvesting, and the courage required to choose feeling over managed compliance.</p>
      <p><Link className="button-link" href="/blog/matrix-of-conscience">Read the Full Novelette (Chapters 1–7 + Epilogue) &rarr;</Link></p>
    </article>
    <article className="blog-article" id="why-i-replaced-chrome-and-edge" aria-labelledby="article-title">
      <header>
        <p className="blog-meta"><time dateTime="2026-11-03">November 3, 2026</time> · By Nicholai Madias · Personal perspective</p>
        <h2 id="article-title">Why I Replaced Chrome and Edge in My Daily Workflow</h2>
        <p className="blog-deck">A developer’s perspective on AI, privacy, performance, and choosing tools by the work they actually help complete.</p>
      </header>
      <p>For years, I kept both Google Chrome and Microsoft Edge in my workflow. Chrome fit naturally with my Google services, while Edge offered Microsoft integrations. Over time, the benefits I actually used stopped justifying the complexity of keeping both as daily browsers.</p>
      <p>This is a personal workflow decision, not a benchmark or a claim that either browser is bad. Both remain useful products. My priorities have shifted toward predictable tools, fewer distractions, and an environment I can understand and maintain.</p>

      <h3>When the integration stopped earning its place</h3>
      <p>One attraction of Google’s AI ecosystem was the possibility of moving between documents, spreadsheets, and practical automation without constantly rebuilding context. I wanted help that could carry a task through to a verifiable result.</p>
      <p>In one session lasting more than an hour, the assistant reported no tool calls and no successful actions. I came away without the work I had expected. That experience mattered to my decision, but it does not establish that Google removed those capabilities for everyone.</p>
      <p>Chrome, the Gemini app, Gemini CLI, and Workspace integrations should not be treated as one product. Availability and behavior can differ by product, account, permissions, and configuration. A failed assistant session is a reason to inspect that setup—not proof that the browser itself caused the failure.</p>
      <p>For automation, I also draw a firm boundary between ordinary configuration and secrets. A spreadsheet may be useful for non-sensitive settings, but I would not use it as a staging area for passwords or production API keys. Credentials belong in a dedicated secret manager with controlled access.</p>

      <h3>Why I stopped choosing a browser for its AI sidebar</h3>
      <p>Chrome’s compatibility and extensions still have value. Edge’s integrations may be valuable to someone who uses them every day. In my case, an integrated assistant only earns its space when it reliably reduces the steps between a request and a finished task.</p>
      <p>I now choose my everyday browser separately from my AI tools. An assistant’s name in a sidebar is less important to me than whether it can access the right tools, explain its limits, and show what it changed.</p>

      <h3>Where Brave and Opera fit</h3>
      <p>Brave has become my preferred everyday browser. I like its approach to blocking unwanted content through <a href="https://brave.com/shields/">Brave Shields</a> and the way it fits my browsing habits. Opera remains an option I value for its <a href="https://help.opera.com/en/latest/browser-window/">sidebar and workspaces</a>.</p>
      <p>These are preferences, not evidence that either browser is universally faster or more private. Extensions, settings, open tabs, hardware, and the sites being visited all affect the result. I would compare the same workload before claiming a measurable improvement.</p>
      <p>Changing browser brands also does not necessarily mean changing the underlying engine. For example, <a href="https://support.brave.app/hc/en-us/articles/10742158329613-What-does-Brave-remove-from-the-Chromium-engine">Brave’s desktop browser is built on Chromium</a>, and <a href="https://support.microsoft.com/en-us/edge/microsoft-edge-chromium">Edge shares that foundation with Chrome</a>. Product features and defaults can differ even when browsers share a substantial technical foundation.</p>

      <h3>My AI tools have different jobs</h3>
      <p>I get more value from choosing a tool for a specific task than from expecting one assistant to do everything:</p>
      <ul>
        <li><strong>Copilot:</strong> I turn to it for design discussion, feature brainstorming, planning, and refining documentation.</li>
        <li><strong>ChatGPT and Codex:</strong> I use them for code review, debugging, refactoring, and automation. Repository, deployment, or infrastructure work still depends on the tools and permissions available in that session.</li>
        <li><strong>Meta AI:</strong> I use it for another perspective and quick idea generation.</li>
      </ul>
      <p>Those roles describe my habits, not a ranking of which product is objectively best. For any assistant, I care about observable results: a reviewed diff, a passing test, a deployment I can open, or an explanation of what remains blocked.</p>

      <h3>Measure system health before blaming the browser</h3>
      <p>A slow machine can have several contributing factors: too many startup applications, unnecessary extensions, background work, or a process whose memory use keeps growing. High memory use in one snapshot does not, by itself, prove a leak. A scheduled task or network connection is not automatically suspicious either.</p>
      <p>My starting point is a read-only inventory. The following PowerShell commands inspect Windows processes, startup entries, scheduled tasks, connections, and executable signatures. Some information may be inaccessible without additional permissions; the script reports signature-inspection failures instead of silently hiding them.</p>
      <pre tabIndex={0} aria-label="Read-only PowerShell system audit"><code>{audit}</code></pre>
      <p>Review the results in context. A valid signature is not a guarantee that software is harmless, and an unsigned file is not proof of malware. The command reports signature information, as described in <a href="https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.security/get-authenticodesignature">Microsoft’s Get-AuthenticodeSignature documentation</a>. Keep paths, account names, and connection details private when sharing audit output.</p>

      <h3>Remove software deliberately</h3>
      <p>Before removing a browser, check that bookmarks, passwords, and any profiles you need are backed up or available elsewhere. Google documents uninstalling Chrome through the operating system’s application settings in its <a href="https://support.google.com/chrome/answer/95319">Chrome removal guide</a>.</p>
      <p>On Windows, identify the installed package before asking WinGet to remove it. The second command below performs an uninstall; it is separate from the read-only audit.</p>
      <pre tabIndex={0} aria-label="Optional Chrome removal commands"><code>{'winget list --id Google.Chrome --exact\nwinget uninstall --id Google.Chrome --exact'}</code></pre>
      <p>The explicit ID and exact-match flag help select the intended package. See the <a href="https://learn.microsoft.com/en-us/windows/package-manager/winget/uninstall">WinGet uninstall reference</a>. I would use supported removal options for Edge where available, rather than scripts that force-delete browser components.</p>
      <p>For an npm-installed Gemini CLI, first check the global packages in the environment where you installed it:</p>
      <pre tabIndex={0} aria-label="Optional npm-installed Gemini CLI removal"><code>{'npm list -g --depth=0\n# Only if @google/gemini-cli is installed globally with npm:\nnpm uninstall -g @google/gemini-cli'}</code></pre>
      <p>Use the matching package manager for other installation methods; the <a href="https://geminicli.com/docs/get-started/installation/">official installation guide</a> describes the supported approaches. Uninstalling a CLI is a separate decision from deleting its settings. I would inspect and back up the <code>~/.gemini</code> directory before removing any data; <a href="https://geminicli.com/docs/cli/settings/">Gemini’s settings documentation</a> identifies the configuration stored there.</p>

      <h3>A simpler workflow, on my terms</h3>
      <p>I am not declaring the browser wars over. Browsers still differ in accessibility, enterprise management, privacy settings, compatibility, and everyday usability. Those differences deserve evaluation against real needs.</p>
      <p>For me, keeping fewer daily browsers and choosing AI tools independently makes the workflow easier to manage. I am aiming for less clutter and more completed work. If another tool becomes useful again, I can reconsider it. Software should earn its place through what it helps me do.</p>
    </article>
  </div>;
}
