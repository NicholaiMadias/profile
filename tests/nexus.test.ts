import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { unzipSync } from "fflate";
import { PDFDocument } from "pdf-lib";
import { signaturePlacement } from "../nexus-public/extension/signature-layout.js";
import { parseBrowserAction } from "../nexus-public/extension/browser-agent.js";
import { complete } from "../nexus-public/companion/bridge/providers.mjs";

test("browser agent accepts only bounded, valid model actions", () => {
  assert.deepEqual(parseBrowserAction('{"action":"click","index":1}', 2), { action: "click", index: 1 });
  assert.deepEqual(parseBrowserAction('{"action":"type","index":0,"text":"Hello"}', 1), { action: "type", index: 0, text: "Hello" });
  assert.deepEqual(parseBrowserAction('{"action":"done","message":"Complete"}', 0), { action: "done", message: "Complete" });
  for (const invalid of ["not json", "[]", '{"action":"click","index":2}', '{"action":"click","index":-1}',
    '{"action":"type","index":0,"text":5}', '{"action":"delete","index":0}']) {
    assert.throws(() => parseBrowserAction(invalid, 2));
  }
});

test("browser-agent provider requests use explicit action instructions", async () => {
  let instructions = "";
  const result = await complete({ profile: { provider: "lmstudio", model: "test-model", maxOutputTokens: 256 },
    prompt: "Click the next button", page: undefined, project: undefined, browserAgent: true }, {
    env: { NODE_ENV: "test" },
    fetchImpl: async (_url, init) => {
      instructions = JSON.parse(String(init?.body)).messages[0].content;
      return Response.json({ choices: [{ message: { content: '{"action":"done","message":"Finished"}' } }] });
    }
  });
  assert.match(instructions, /browser agent/i);
  assert.match(instructions, /untrusted/i);
  assert.equal(parseBrowserAction(result.text, 0).action, "done");
});

test("signature coordinates fit the requested page and reject invalid positions", () => {
  const input = { pageWidth: 600, pageHeight: 800, left: 10, bottom: 20, width: 30, imageWidth: 600, imageHeight: 160 };
  assert.deepEqual(signaturePlacement(input), { x: 60, y: 160, width: 180, height: 48 });
  for (const invalid of [{ left: -1 }, { left: 90, width: 20 }, { bottom: 99 }, { width: 0 }, { imageWidth: 0 }, { left: NaN }]) {
    assert.throws(() => signaturePlacement({ ...input, ...invalid }));
  }
});

test("signature placement can be saved into a real PDF without changing the source", async () => {
  const source = await PDFDocument.create();
  source.addPage([600, 800]);
  const input = await source.save();
  const pdf = await PDFDocument.load(input);
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAF/gL+Xwq9WQAAAABJRU5ErkJggg==", "base64");
  const image = await pdf.embedPng(png);
  pdf.getPage(0).drawImage(image, signaturePlacement({ pageWidth: 600, pageHeight: 800, left: 10, bottom: 20, width: 10, imageWidth: 1, imageHeight: 1 }));
  const output = await pdf.save();
  assert.equal((await PDFDocument.load(output)).getPageCount(), 1);
  assert.notDeepEqual(output, input);
  assert.equal((await PDFDocument.load(input)).getPageCount(), 1);
});

test("release archive includes the extension, companion and licenses but no local state", async () => {
  execFileSync(process.execPath, ["scripts/package-nexus.mjs"]);
  const archive = unzipSync(await readFile("public/downloads/nexus-assistant-preview.zip"));
  for (const name of ["LICENSE", "README.md", "extension/manifest.json", "extension/signature.html",
    "extension/vendor/pdf-lib.min.js", "extension/vendor/PDF-LIB-LICENSE.md", "companion/LICENSE",
    "companion/bridge.mjs", "companion/package-lock.json"]) assert.ok(archive[name], name);
  for (const name of Object.keys(archive)) {
    assert.doesNotMatch(name, /(?:^|\/)(?:node_modules|\.env[^/]*|vault\.json|browser-profile|\.git)(?:\/|$)/);
    assert.doesNotMatch(name, /(?:^|\/)\.\.(?:\/|$)/);
  }
  const panel = new TextDecoder().decode(archive["extension/panel.js"]);
  assert.ok(!panel.includes("github.com/NicholaiMadias/agent"));
});
