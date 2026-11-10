import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Using the Nexus Extension Over SSH | Nicholai’s Blog',
  description: 'Create an Ed25519 SSH key, connect to your own host, and reach the loopback-only Nexus companion through an SSH tunnel.',
};

const keygen = `ssh-keygen -t ed25519 -C "your-label"
# Accept the default path (~/.ssh/id_ed25519) and set a passphrase.`;

const copyKey = `ssh-copy-id -i ~/.ssh/id_ed25519.pub username@hostname`;

const copyKeyPort = `ssh-copy-id -p 2222 -i ~/.ssh/id_ed25519.pub username@hostname`;

const connect = `ssh username@hostname
# Explicit key file, if you have more than one:
ssh -i ~/.ssh/id_ed25519 username@hostname`;

const config = `Host nexus-host
    HostName hostname
    User username
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes`;

const tunnel = `# Forward your local port 8787 to the companion on the host.
ssh -N -L 8787:127.0.0.1:8787 nexus-host

# Then open http://127.0.0.1:8787/ on this computer.`;

const permissions = `# macOS / Linux
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub`;

export default function SshExtensionArticle() {
  return (
    <div className="blog-shell">
      <nav aria-label="Breadcrumb">
        <Link className="text-link" href="/blog">← Blog</Link>
      </nav>

      <article className="blog-article" aria-labelledby="ssh-title">
        <header>
          <p className="blog-meta"><time dateTime="2026-11-10">November 10, 2026</time> · Tooling &amp; Security</p>
          <h1 id="ssh-title">Using the Nexus Extension Over SSH</h1>
          <p className="blog-deck">
            The Nexus companion listens only on your computer’s loopback address. To reach it from another device, set up SSH key authentication and forward a local port through an encrypted tunnel.
          </p>
        </header>

        <h2>Why this setup</h2>
        <p>
          The companion is deliberately not exposed to your network. It binds to <code>127.0.0.1</code>, so a laptop, phone, or remote session can reach it only through a secure SSH connection you control. Never open port 8787 on a router or firewall for this purpose.
        </p>

        <h2>Before you start</h2>
        <ul>
          <li>An SSH server on the host you want to reach, with your user account on it.</li>
          <li>The host’s fully qualified domain name or IP address, such as <code>myserver.example.com</code> or <code>192.168.1.50</code>.</li>
          <li>The Nexus companion running on that host. See the Tools page for the setup steps.</li>
        </ul>

        <h2>1. Create an Ed25519 key</h2>
        <p>Run this on the device you will connect from. Ed25519 keys are short, fast, and recommended over older RSA keys.</p>
        <pre><code>{keygen}</code></pre>
        <p>
          A passphrase protects the private key if someone copies the file. Your private key is <code>~/.ssh/id_ed25519</code>; never share it. Only the <code>.pub</code> file goes to servers.
        </p>

        <h2>2. Install the public key on the host</h2>
        <pre><code>{copyKey}</code></pre>
        <p>
          Replace <code>username</code> and <code>hostname</code> with your values. Enter your account password once. When it finishes, you should see <code>Number of key(s) added: 1</code>.
        </p>
        <p>
          If the server uses a custom SSH port, add <code>-p</code>. Note that <code>ssh-copy-id</code> uses a lowercase <code>-p</code> for the port, just like <code>ssh</code>:
        </p>
        <pre><code>{copyKeyPort}</code></pre>

        <h2>3. Test the key-based login</h2>
        <pre><code>{connect}</code></pre>
        <p>
          You should now get a shell without entering your account password. If you are still prompted, check that the key was copied to the right user’s <code>~/.ssh/authorized_keys</code>, and that the server allows public-key authentication.
        </p>

        <h2>4. Save a host alias</h2>
        <p>Add this block to <code>~/.ssh/config</code> on your client so you do not retype the address:</p>
        <pre><code>{config}</code></pre>
        <p>Now <code>ssh nexus-host</code> is enough. <code>IdentitiesOnly yes</code> stops SSH from offering every key in your agent first.</p>

        <h2>5. Forward the companion to your device</h2>
        <p>
          With the alias in place, open a tunnel. The <code>-N</code> flag keeps the session for forwarding only, with no remote shell:
        </p>
        <pre><code>{tunnel}</code></pre>
        <p>
          Keep this terminal open while you use the extension. Closing it ends the tunnel. The token shown in the companion terminal is still required, so the tunnel alone does not grant access.
        </p>

        <h2>Check file permissions</h2>
        <p>OpenSSH refuses keys with overly open permissions. On macOS or Linux, run:</p>
        <pre><code>{permissions}</code></pre>
        <p>On Windows, keep the key in your user profile’s <code>.ssh</code> folder and make sure only your account has access.</p>

        <h2>Common problems</h2>
        <ul>
          <li><strong>Permission denied (publickey):</strong> the public key is not in the server user’s <code>authorized_keys</code>, or you connected as a different user.</li>
          <li><strong>Unprotected private key file:</strong> tighten permissions as shown above.</li>
          <li><strong>Port 8787 already in use:</strong> close the other process, or change the local port, for example <code>-L 9787:127.0.0.1:8787</code>, and open <code>http://127.0.0.1:9787/</code>.</li>
          <li><strong>Host key changed:</strong> stop and verify the server before removing the old entry from <code>~/.ssh/known_hosts</code>. This warning can mean someone is intercepting the connection.</li>
        </ul>

        <h2>Security habits</h2>
        <ul>
          <li>Never paste a private key, password, or token into chat, a repository, or a shared document.</li>
          <li>Prefer a dedicated, non-root account on the host with only the access it needs.</li>
          <li>Disable password logins on the server once key login works, and keep the server patched.</li>
          <li>Use a separate key for each device, and remove the public key from <code>authorized_keys</code> when a device is retired.</li>
        </ul>

        <p>
          Return to the <Link href="/tools#nexus-assistant">Tools page</Link> for the extension download and companion setup, or read the <Link href="/privacy">privacy notice</Link> for what the site stores.
        </p>
      </article>
    </div>
  );
}
