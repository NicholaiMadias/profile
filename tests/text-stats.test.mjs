import test from "node:test";
import assert from "node:assert/strict";
import { analyzeText } from "../lib/tools/text-stats.js";

test("analyzes Unicode words, sentences, characters, and reading time", () => {
  assert.deepEqual(analyzeText("Hello, world! L’amour grows."), {
    wordCount: 4,
    characterCount: 28,
    sentenceCount: 2,
    readingMinutes: 1,
  });
});

test("returns zeroes for empty or whitespace-only text", () => {
  assert.deepEqual(analyzeText(" \n\t"), {
    wordCount: 0,
    characterCount: 3,
    sentenceCount: 0,
    readingMinutes: 0,
  });
});

test("rejects a non-positive reading speed", () => {
  assert.throws(() => analyzeText("hello", 0), RangeError);
});
