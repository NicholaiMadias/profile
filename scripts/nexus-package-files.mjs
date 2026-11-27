import { promises as fs } from 'node:fs';
import path from 'node:path';

// Only files deliberately listed here may be published in the Nexus Assist ZIP.
// Keep this list in sync with the extension and companion entry points.
const extension = [
  'background.js', 'browser-agent.js', 'host-panel.css', 'host-panel.html',
  'host-panel.js', 'manifest.json', 'panel.css', 'panel.html', 'panel.js',
  'profiles.js', 'signature-layout.js', 'signature.css', 'signature.html',
  'signature.js', 'workspace.js',
];
const companion = [
  'assistant.mjs', 'bridge.mjs', 'bridge/cline.mjs', 'bridge/providers.mjs',
  'bridge/secret-manager.mjs', 'integrations.json', 'LICENSE', 'lmstudio.mjs',
  'package-lock.json', 'package.json', 'public/app.js', 'public/index.html',
  'public/nexus-mark.svg', 'public/style.css', 'session-store.mjs',
  'terminal.mjs', 'vault.mjs',
];

export const NEXUS_ASSIST_FILES = [
  ['nexus-public/README.md', 'README.md'],
  ['nexus-public/REVIEW-STUDIO.md', 'REVIEW-STUDIO.md'],
  ['nexus-public/review-studio.mjs', 'review-studio.mjs'],
  ['LICENSE', 'LICENSE'],
  ['node_modules/pdf-lib/dist/pdf-lib.min.js', 'extension/vendor/pdf-lib.min.js'],
  ['node_modules/pdf-lib/LICENSE.md', 'extension/vendor/pdf-lib.LICENSE.md'],
  ...extension.map(file => [`nexus-public/extension/${file}`, `extension/${file}`]),
  ...companion.map(file => [`nexus-public/companion/${file}`, `companion/${file}`]),
];

export async function collectNexusAssistFiles(projectRoot) {
  const entries = {};
  for (const [source, destination] of NEXUS_ASSIST_FILES) {
    const file = path.join(projectRoot, source);
    const metadata = await fs.lstat(file);
    if (!metadata.isFile() || metadata.isSymbolicLink()) {
      throw new Error(`Nexus package source must be a regular file: ${source}`);
    }
    entries[destination] = new Uint8Array(await fs.readFile(file));
  }
  return entries;
}
