import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Parse the TypeScript module with Node's built-in type stripping (Node >= 22.18).
// Regression tests exercise the real source, not a duplicate algorithm.
const code = readFileSync(new URL("../lib/games/matrix-of-conscience/progress.ts", import.meta.url), "utf8");
const { parseMatrixProgress, serializeMatrixProgress } = await import("../lib/games/matrix-of-conscience/progress.ts");

test("new and corrupt progress start at level one", () => {
  assert.equal(parseMatrixProgress(null, 10).unlockedLevel, 1);
  assert.equal(parseMatrixProgress("{oops", 10).unlockedLevel, 1);
  assert.equal(parseMatrixProgress('{"version":1,"unlockedLevel":999}', 10).unlockedLevel, 1);
});

test("legacy numeric saves migrate without unlocking out-of-range sectors", () => {
  assert.equal(parseMatrixProgress("5", 10).unlockedLevel, 5);
  assert.equal(parseMatrixProgress("999", 10).unlockedLevel, 1);
});

test("versioned progress persists after round trip", () => {
  const saved = serializeMatrixProgress(7);
  assert.equal(parseMatrixProgress(saved, 10).unlockedLevel, 7);
});
