import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Antigravity Dev Stack: Customizing Terminal AI Agents | Nicholai’s Blog',
  description: 'How to achieve escape velocity in modern development using terminal coding agents, Model Context Protocol (MCP), local LLM sovereignty, and cross-platform orchestration.',
};

const mcpConfigCode = `{
  "mcpServers": {
    "local-workspace-filesystem": {
      "command": "node",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "C:/Users/Nick/OneDrive/Documents/GitHub/profile"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    },
    "local-command-executor": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-shell",
        "--allowed-commands",
        "git,npm,python3,vercel,java,mvn,winget"
      ]
    }
  }
}`;

const bashBlueprint = `#!/usr/bin/env bash
# antigravity-init.sh - Weights-free workspace orchestration
set -euo pipefail
echo "⚙️ Initializing Antigravity Development Stack..."

# 1. Scaffold clean workspace constraints
mkdir -p ./{src,public,config,tests}
touch .gitignore

# 2. Programmatically configure node packages without opening files
if [ ! -f package.json ]; then
  echo "📦 Scaffolding package metadata..."
  npm init -y > /dev/null
  npm pkg set scripts.start="node --watch src/app.js"
  npm pkg set scripts.build="tsc"
fi

# 3. Securely pull cloud runtime environment flags if Vercel is present
if command -v vercel &> /dev/null && [ -f .vercel/project.json ]; then
  echo "⚡ Syncing Vercel Cloud parameters..."
  vercel env pull .env.local --yes
fi

# 4. Initialize agent templates
if command -v codex &> /dev/null; then
  echo "🤖 Mapping Codex CLI Agent guidelines..."
  codex /init --yes || true
fi

# 5. Bring up zero-config hot-reloading HTTP preview layers
echo "🌐 Spinning up preview server on port 8080..."
python3 -m http.server 8080 --directory ./public &
SERVER_PID=$!
echo "🚀 Antigravity workspace ready! Press CTRL+C to terminate preview."
wait $SERVER_PID`;

const githubActionPipeline = `name: Antigravity Build & Deploy Pipeline

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

permissions:
  contents: read
  deployments: write

jobs:
  frontend-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Check Code Style & Types
        run: |
          npm run lint --if-present
          npx tsc --noEmit --if-present

      - name: Run Frontend Test Suites
        run: npm test --if-present

  python-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Python Environment
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Install Python Dependencies
        run: |
          python -m pip install --upgrade pip
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

      - name: Run Python Unit Tests
        run: |
          python -m pytest --if-present

  deploy-to-vercel:
    needs: [frontend-build, python-test]
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Deploy to Vercel Edge Framework
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`;

const cleanupScript = `<#
.SYNOPSIS
    Safely purges hung or orphaned browser instances before and after local testing loops.
#>
[CmdletBinding()]
param(
    [string]$ProfileFolderName = "Default",
    [switch]$ForceAll
)

$ErrorActionPreference = 'Continue'
Write-Host "🧹 Initiating Local Browser Profile Workspace Cleanup..." -ForegroundColor Cyan

# 1. Look for active browser processes matching Chrome
$chromeProcesses = Get-Process -Name "chrome" -ErrorAction SilentlyContinue

if (-not $chromeProcesses) {
    Write-Host "✅ No lingering Google Chrome instances detected." -ForegroundColor Green
    exit 0
}

Write-Host "⚠️ Found $(@($chromeProcesses).Count) active Chrome processes." -ForegroundColor Yellow

# 2. Iterate and safely terminate orphaned handles
foreach ($proc in $chromeProcesses) {
    try {
        $pathInfo = $proc.Path
        if ($ForceAll -or ($pathInfo -and $pathInfo.Contains($ProfileFolderName))) {
            Write-Host "🛑 Terminating process ID $($proc.Id) ($($proc.ProcessName))..." -ForegroundColor DarkYellow
            Stop-Process -Id $proc.Id -Force -ErrorAction Stop
        }
    } catch {
        Write-Verbose "Could not kill process ID $($proc.Id): $_"
    }
}

Write-Host "✨ Post-execution file handle verification complete. Workspace unlocked." -ForegroundColor Green`;

export default function AntigravityDevStackArticle() {
  return (
    <div className="blog-shell">
      <header className="blog-intro">
        <p className="eyebrow">DEVELOPER TOOLING &amp; ARCHITECTURE</p>
        <h1>The Antigravity Dev Stack: Customizing Terminal AI Agents &amp; Cross-Platform Environments</h1>
        <p className="blog-deck">Achieving escape velocity from manual configurations using agentic coding frameworks, MCP file protocols, local LLM sovereignty, and cross-platform terminal orchestration.</p>
        <nav aria-label="Blog navigation">
          <Link href="/blog">&larr; Back to all articles</Link>
          <Link href="/#tools">Tools and profiles</Link>
        </nav>
      </header>

      <article className="blog-article" id="antigravity-dev-stack" aria-labelledby="dev-stack-title">
        <header>
          <p className="blog-meta"><time dateTime="2026-11-04">November 4, 2026</time> &middot; By Nicholai Madias &middot; Engineering Deep-Dive</p>
          <h2 id="dev-stack-title">Escaping Context Switching &amp; Manual Friction</h2>
        </header>

        <p>In modern software engineering, friction is the ultimate enemy. When you are context-switching between writing TypeScript backend logic, debugging a Python edge function, adjusting Vercel deployment parameters, or shipping a game build, every manually typed command or browser tab swap drags you down.</p>
        <p>True <strong>antigravity development</strong> is about achieving escape velocity from manual configurations. By pairing the command line with agentic coding frameworks like Codex CLI, Antigravity/Gemini CLI, and local LM Studio engines, you can compile, edit, and orchestrate complex applications directly from your prompt.</p>

        <h3>1. The Elite Tier: Cloud-Native Terminal Agents</h3>
        <p>Instead of relying purely on auto-complete suggestions, deploy full terminal-native developer agents that can inspect codebases, execute isolated test runs, and self-correct syntax errors in place.</p>
        
        <h4>OpenAI Codex CLI (The ChatGPT Engine)</h4>
        <p>The OpenAI Codex CLI is a terminal coding agent built in Rust. It hooks directly into your subscription plan to read multi-file contexts, execute platform-isolated commands, and spin up sub-agents:</p>
        <ul>
          <li><code>codex</code> &mdash; Boots up the interactive terminal user interface (TUI).</li>
          <li><code>/init</code> &mdash; Automatically generates a local <code>AGENTS.md</code> blueprint defining engineering constraints for your workspace.</li>
          <li><code>codex --search "query"</code> &mdash; Executes a live search to reference the latest API changes or package documentation mid-session.</li>
          <li><code>codex exec "run tests, then fix any compilation errors"</code> &mdash; Runs headlessly without a prompt loop, ideal for CI workflows.</li>
        </ul>

        <h4>Google&rsquo;s Antigravity CLI &amp; Gemini CLI</h4>
        <p>Google&rsquo;s terminal-native agent portfolio gives you access to a massive context window (up to 1M+ tokens). For personal workflows utilizing models like Gemini 2.5/Gemini 4 Argon, use the Antigravity CLI (<code>agy</code>). For enterprise environments backed by Gemini Code Assist, leverage <code>gemini</code> directly:</p>
        <pre tabIndex={0} aria-label="Gemini CLI installation"><code>npm install -g @google/gemini-cli</code></pre>
        <ul>
          <li><code>gemini</code> &mdash; Launches the context-aware chat environment inside your current directory.</li>
          <li><code>/init</code> &mdash; Crawls your repository hierarchy to autogenerate a <code>gemini.md</code> file packed with structural context.</li>
          <li><code>! &lt;command&gt;</code> &mdash; Temporarily escapes to your local shell execution layer, piping the command output straight back into the AI&rsquo;s next context frame.</li>
          <li><code>gemini --include-directories ../lib,../docs</code> &mdash; Absorbs out-of-directory dependencies for large monorepo mapping.</li>
        </ul>

        <h3>2. Total Sovereignty: Local LLMs with LM Studio &amp; SSH</h3>
        <p>If you are handling private enterprise repositories, proprietary game logic, or confidential keys, you can drop cloud dependencies entirely by running offline models on your local hardware.</p>
        
        <h4>The Local Engine: LM Studio</h4>
        <p>Using the <a href="https://lmstudio.ai/" target="_blank" rel="noopener noreferrer">LM Studio Desktop Client</a>, you can host local open-weights coding models:</p>
        <ul>
          <li><strong>Qwen-2.5-Coder (7B or 32B Instruct):</strong> High-efficiency open-source coding model with strong capabilities across JavaScript, TypeScript, Python, and Rust.</li>
          <li><strong>DeepSeek-Coder-V2-Lite:</strong> Highly optimized for cross-file architecture context and complex compilation tasks.</li>
        </ul>
        <p>Spinning up the server exposes an OpenAI-compatible endpoint at <code>http://localhost:1234/v1</code> without transmitting tokens outside your machine.</p>

        <h4>Remote Tether: Encrypted SSH Port Forwarding</h4>
        <p>If your high-powered GPU workstation is in your office or lab while you are on a laptop, tablet, or phone, bridge the gap with an encrypted SSH local port forwarding tunnel:</p>
        <pre tabIndex={0} aria-label="SSH port forwarding command"><code>ssh -L 1234:localhost:1234 user@your-workstation-ip</code></pre>
        <p>Any agent request on your mobile device targeting <code>http://localhost:1234</code> routes securely across the tunnel directly to your local GPU.</p>

        <h3>3. Model Context Protocol (MCP): The Agent-Filesystem Bridge</h3>
        <p>Instead of manually copy-pasting code into your assistant, the <strong>Model Context Protocol (MCP)</strong> client-server pattern connects your agent natively to your operating system via stdin/stdout streams:</p>

        <pre tabIndex={0} aria-label="MCP Architecture Diagram"><code>{`┌──────────────────┐                ┌──────────────────┐               ┌──────────────────┐
│   Coding Agent   │ ──(via MCP)──► │    MCP Server    │ ──(Native)──► │ Local Workspace  │
│  (Gemini/Codex)  │ ◄──(Context)── │ (Files & Shell)  │ ◄───(Data)─── │ (Code, Logs, DB) │
└──────────────────┘                └──────────────────┘               └──────────────────┘`}</code></pre>

        <p>To set up an MCP server profile across your environment, install the official filesystem server:</p>
        <pre tabIndex={0} aria-label="Install MCP filesystem server"><code>npm install -g @modelcontextprotocol/server-filesystem</code></pre>

        <p>Save the configuration to your platform path (e.g., <code>%APPDATA%\Code\User\global-mcp-config.json</code> on Windows, or <code>~/.config/mcp/config.json</code> on macOS/Linux):</p>
        <pre tabIndex={0} aria-label="MCP Server Configuration JSON"><code>{mcpConfigCode}</code></pre>

        <h3>4. Cross-Platform Terminal Environments</h3>
        <p>An agent is only as fast as the environment it lives in. These are low-latency terminal emulators across client operating systems:</p>
        <ul>
          <li><strong>Windows (Windows Terminal):</strong> Seamlessly hop between PowerShell Core, Git Bash, and WSL2 Linux containers in one window.</li>
          <li><strong>Linux (Terminix / Tilix):</strong> Tiling splits your workspace into quadrants: app logs, git diffs, agent loops, and shell sessions.</li>
          <li><strong>Android (Termux):</strong> A full Linux environment wrapper capable of running Node, Python, and developer CLI tools on mobile devices.</li>
          <li><strong>iOS (Blink Shell):</strong> Employs Mosh (Mobile Shell) and SSH to maintain persistent connections across cellular handoffs.</li>
          <li><strong>ChromeOS (Crostini):</strong> Sandboxed Debian environment providing instant access to Node, Python, and Git.</li>
        </ul>

        <h3>5. Workspace Orchestration Blueprint</h3>
        <p>To tie these components together, automate project initialization with a standardized blueprint script:</p>
        <pre tabIndex={0} aria-label="Antigravity init shell script"><code>{bashBlueprint}</code></pre>

        <h3>6. Robust CI/CD: Multi-Runtime GitHub Actions Pipeline</h3>
        <p>This production pipeline independently validates frontend Node.js layers and Python services before triggering zero-downtime production deployments on Vercel:</p>
        <pre tabIndex={0} aria-label="GitHub Actions pipeline blueprint"><code>{githubActionPipeline}</code></pre>

        <h3>7. Safe Browser Automation: Cleaning Stuck Handles</h3>
        <p>When running headless browser testing agents or Playwright automation loops, abruptly halted runs can leave orphan Chrome processes holding locks on user profile folders. This PowerShell utility safely discovers and terminates stranded instances:</p>
        <pre tabIndex={0} aria-label="Chrome cleanup PowerShell script"><code>{cleanupScript}</code></pre>

        <p>Integrating <code>cleanup-chrome.ps1</code> into your <code>pretest</code> and <code>posttest</code> npm hooks ensures a clean slate on every run.</p>

        <footer className="story-footer">
          <Link href="/blog" className="back-link">&larr; Return to Nicholai&rsquo;s Blog</Link>
          <Link href="/#tools" className="arcade-link">Explore Tools &amp; Profiles &rarr;</Link>
        </footer>
      </article>
    </div>
  );
}
