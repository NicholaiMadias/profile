import { promises as fs } from 'node:fs';
import path from 'node:path';
import { zipSync } from 'fflate';

const projectRoot = path.resolve(import.meta.dirname, '..');
const outputZip = path.join(
  projectRoot,
  'public',
  'downloads',
  'nexus-assistant-preview.zip'
);

const INCLUDE_FILES = [
  ['nexus-public/README.md', 'README.md'],
  ['LICENSE', 'LICENSE'],
  ['node_modules/pdf-lib/dist/pdf-lib.min.js', 'extension/vendor/pdf-lib.min.js'],
  ['node_modules/pdf-lib/LICENSE.md', 'extension/vendor/pdf-lib.LICENSE.md'],
];

const INCLUDE_DIRS = [
  ['nexus-public/extension', 'extension'],
  ['nexus-public/companion', 'companion'],
];

function shouldSkip(name) {
  return (
    name === 'node_modules' ||
    name === '.git' ||
    name === '.DS_Store' ||
    name === 'Thumbs.db' ||
    name.startsWith('.env')
  );
}

async function addFile(zipEntries, sourcePath, zipPath) {
  const content = await fs.readFile(sourcePath);
  zipEntries[zipPath.replaceAll('\\', '/')] = new Uint8Array(content);
}

async function addDirectoryRecursive(zipEntries, sourceDir, zipPrefix) {
  const queue = [{ abs: sourceDir, rel: zipPrefix }];
  while (queue.length > 0) {
    const current = queue.pop();
    const entries = await fs.readdir(current.abs, { withFileTypes: true });
    for (const entry of entries) {
      if (shouldSkip(entry.name)) {
        continue;
      }

      const absPath = path.join(current.abs, entry.name);
      const relPath = path.join(current.rel, entry.name);
      if (entry.isDirectory()) {
        queue.push({ abs: absPath, rel: relPath });
      } else if (entry.isFile()) {
        await addFile(zipEntries, absPath, relPath);
      }
    }
  }
}

async function packageNexusOs() {
  const source = path.join(projectRoot, 'nexus-os');
  const entries = {};
  const files = [
    'README.md',
    'backend/agent_server.py', 'backend/Dockerfile',
    'extension/manifest.json', 'extension/content.js',
    'extension/index.html', 'extension/client.js', 'extension/style.css',
  ];
  for (const file of files) {
    await addFile(entries, path.join(source, file), file);
  }
  await fs.writeFile(
    path.join(path.dirname(outputZip), 'nexus-os-preview.zip'),
    Buffer.from(zipSync(entries, { level: 9 }))
  );

  const publicTools = path.join(projectRoot, 'public', 'tools');
  const assets = path.join(publicTools, 'nexus-os-assets');
  await fs.mkdir(assets, { recursive: true });
  const html = await fs.readFile(path.join(source, 'extension', 'index.html'), 'utf8');
  await fs.writeFile(
    path.join(publicTools, 'nexus-os.html'),
    html.replace('href="style.css"', 'href="/tools/nexus-os-assets/style.css"')
      .replace('src="client.js"', 'src="/tools/nexus-os-assets/client.js"')
  );
  for (const file of ['style.css', 'client.js']) {
    await fs.copyFile(path.join(source, 'extension', file), path.join(assets, file));
  }
}

async function run() {
  const zipEntries = {};

  for (const [src, dest] of INCLUDE_FILES) {
    const abs = path.join(projectRoot, src);
    await addFile(zipEntries, abs, dest);
  }

  for (const [src, dest] of INCLUDE_DIRS) {
    const abs = path.join(projectRoot, src);
    await addDirectoryRecursive(zipEntries, abs, dest);
  }

  const zipped = zipSync(zipEntries, { level: 9 });
  await fs.mkdir(path.dirname(outputZip), { recursive: true });
  await fs.writeFile(outputZip, Buffer.from(zipped));
  await packageNexusOs();
  console.log(`Created ${outputZip} and Nexus OS preview`);
}

run().catch((error) => {
  console.error('Failed to package Nexus preview:', error);
  process.exitCode = 1;
});
