import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { zipSync } from 'fflate';

const root = resolve('nexus-public');
const files = [
  'README.md',
  ...['background.js', 'browser-agent.js', 'host-panel.css', 'host-panel.html', 'host-panel.js', 'manifest.json',
    'panel.css', 'panel.html', 'panel.js', 'profiles.js', 'signature.css', 'signature.html',
    'signature.js', 'signature-layout.js'].map(name => `extension/${name}`),
  ...['LICENSE', 'assistant.mjs', 'bridge.mjs', 'integrations.json', 'lmstudio.mjs',
    'package.json', 'package-lock.json', 'session-store.mjs', 'terminal.mjs', 'vault.mjs',
    'bridge/providers.mjs', 'bridge/cline.mjs', 'bridge/secret-manager.mjs',
    'public/index.html', 'public/app.js', 'public/style.css', 'public/nexus-mark.svg'].map(name => `companion/${name}`)
];
const entries = {};
for (const name of files) entries[name] = await readFile(resolve(root, name));
entries['LICENSE'] = await readFile('LICENSE');
entries['extension/vendor/pdf-lib.min.js'] = await readFile('node_modules/pdf-lib/dist/pdf-lib.min.js');
entries['extension/vendor/PDF-LIB-LICENSE.md'] = await readFile('node_modules/pdf-lib/LICENSE.md');
await mkdir('public/downloads', { recursive: true });
await writeFile('public/downloads/nexus-assistant-preview.zip', zipSync(entries, { level: 6 }));
console.log('Packaged Nexus Assistant preview.');
