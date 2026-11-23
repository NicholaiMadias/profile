import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import vm from "node:vm";

const source = readFileSync(new URL("../public/Apps/pushToGitHUB.js", import.meta.url), "utf8");

function dispatcher(secret = "") {
  let privilegedReads = 0;
  const context = {
    PropertiesService: { getScriptProperties: () => ({
      getProperty: (name) => name === "MISSION_KEY" ? secret : null,
    }) },
    ContentService: {
      MimeType: { JSON: "json" },
      createTextOutput: (value) => ({ setMimeType: () => JSON.parse(value) }),
    },
    Utilities: {
      DigestAlgorithm: { SHA_256: "sha256" },
      computeDigest: (_algorithm, value) => [...createHash("sha256").update(value).digest()],
    },
    SpreadsheetApp: {
      openById: () => {
        privilegedReads++;
        return { getSheets: () => [{ getDataRange: () => ({ getValues: () => [["sensitive"]] }) }] };
      },
    },
  };
  vm.runInNewContext(source, context, { filename: "pushToGitHUB.js" });
  const post = (payload) => context.doPost({ postData: { contents: JSON.stringify(payload) } });
  return { post, readCount: () => privilegedReads };
}

test("unconfigured dispatcher is fail-closed, including for PING", () => {
  const api = dispatcher();
  assert.equal(api.post({ action: "PING" }).error, "SERVICE_NOT_CONFIGURED");
  assert.equal(api.post({ action: "readSheet", spreadsheetId: "anything" }).error, "SERVICE_NOT_CONFIGURED");
  assert.equal(api.readCount(), 0);
});

test("missing, short, and incorrect keys cannot run privileged actions", () => {
  const secret = "a".repeat(48);
  const api = dispatcher(secret);
  for (const key of [undefined, "", "short", "b".repeat(48)]) {
    const response = api.post({ action: "readSheet", spreadsheetId: "anything", missionKey: key });
    assert.equal(response.error, "UNAUTHORIZED_NODE");
  }
  assert.equal(api.readCount(), 0);
});

test("a correctly configured key authorizes expected actions only", () => {
  const secret = "c".repeat(48);
  const api = dispatcher(secret);
  assert.equal(api.post({ action: "PING", missionKey: secret }).status, "ONLINE");
  assert.equal(api.post({ action: "readSheet", spreadsheetId: "test", missionKey: secret }).status, "SUCCESS");
  assert.equal(api.readCount(), 1);
  assert.equal(api.post({ action: "__unknown__", missionKey: secret }).error, "INVALID_ACTION");
});

test("oversized body and malformed payloads are rejected", () => {
  const api = dispatcher("z".repeat(48));
  assert.equal(api.post("not-an-object").error, "INVALID_REQUEST");
  assert.equal(api.post({ missionKey: "z".repeat(48), action: "PING", junk: "x".repeat(40000) }).error, "INVALID_REQUEST");
});
