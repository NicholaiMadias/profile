import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { collectNexusAssistFiles, NEXUS_ASSIST_FILES } from '../scripts/nexus-package-files.mjs';

test('Nexus package contains only explicitly selected files', async () => {
  const tempRoot = path.resolve(os.tmpdir());
  const fixture = await fs.mkdtemp(path.join(tempRoot, 'codex-nexus-package-'));
  try {
    for (const [source] of NEXUS_ASSIST_FILES) {
      const file = path.join(fixture, source);
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, `fixture:${source}`);
    }
    for (const source of [
      'nexus-public/companion/credentials.json',
      'nexus-public/companion/vault.json',
      'nexus-public/extension/private-key.pem',
      'nexus-public/extension/.env.local',
    ]) {
      await fs.writeFile(path.join(fixture, source), 'private fixture');
    }

    const entries = await collectNexusAssistFiles(fixture);
    const destinations = NEXUS_ASSIST_FILES.map(([, destination]) => destination);
    assert.equal(new Set(destinations).size, destinations.length, 'package paths must be unique');
    assert.deepEqual(Object.keys(entries).sort(), destinations.sort());
    assert.equal(Buffer.from(entries['companion/public/nexus-mark.svg']).toString(),
      'fixture:nexus-public/companion/public/nexus-mark.svg');
    for (const name of Object.keys(entries)) {
      assert.doesNotMatch(name, /credentials\.json|vault\.json|private-key\.pem|\.env/);
    }
  } finally {
    // mkdtemp creates this directory directly under the system temporary directory.
    if (path.dirname(path.resolve(fixture)) !== tempRoot || !path.basename(fixture).startsWith('codex-nexus-package-')) {
      throw new Error('Refusing to remove an unexpected fixture directory');
    }
    await fs.rm(fixture, { recursive: true, force: true });
  }
});

test('companion logo references the packaged asset', async () => {
  const html = await fs.readFile(new URL('../nexus-public/companion/public/index.html', import.meta.url), 'utf8');
  assert.match(html, /src="nexus-mark\.svg"/);
  assert.ok(NEXUS_ASSIST_FILES.some(([, destination]) => destination === 'companion/public/nexus-mark.svg'));
});
