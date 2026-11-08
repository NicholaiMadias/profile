import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:net';
import { createBridge } from '../nexus-public/companion/bridge.mjs';

test('browser agent route requires authentication and uses the selected provider', async t => {
  const reservation = createServer();
  await new Promise(resolve => reservation.listen(0, '127.0.0.1', resolve));
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  const extensionId = 'a'.repeat(32);
  let instructions;
  const app = await createBridge({
    cwd: process.cwd(), port, token: 'test-token', extensionIds: [extensionId],
    profileFetch: async (url, init) => {
      assert.equal(url, 'http://127.0.0.1:1234/v1/chat/completions');
      instructions = JSON.parse(init.body).messages[0].content;
      return Response.json({ choices: [{ message: { content: '{"action":"done","message":"Ready"}' } }] });
    }
  });
  await new Promise(resolve => app.server.listen(port, '127.0.0.1', resolve));
  t.after(() => app.close());
  const url = `http://127.0.0.1:${port}/api/profile/browser-step`;
  const headers = { Authorization: 'Bearer test-token', Origin: `chrome-extension://${extensionId}`,
    'X-Grace-Extension-Id': extensionId, 'Content-Type': 'application/json' };
  const body = JSON.stringify({ profile: { provider: 'lmstudio', model: 'test', maxOutputTokens: 256 }, prompt: 'Test' });
  assert.equal((await fetch(url, { method: 'POST', headers: { ...headers, Authorization: 'Bearer wrong' }, body })).status, 401);
  assert.equal((await fetch(url, { method: 'POST', headers: { ...headers, Origin: 'https://evil.example' }, body })).status, 403);
  assert.equal((await fetch(url, { method: 'POST', headers, body })).status, 200);
  assert.match(instructions, /browser agent/i);
  const image = await fetch(`http://127.0.0.1:${port}/nexus-infinity.jpg`);
  assert.equal(image.status, 200);
  assert.match(image.headers.get('content-type'), /image\/svg\+xml/);
});
