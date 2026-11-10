import test from "node:test";
import assert from "node:assert/strict";
import { accuracyPercent, nextWord, WORD_BANK } from "../lib/games/word-sprint.js";

test("picks a word from the bank and avoids an immediate repeat", () => {
  assert.equal(nextWord("", () => 0), WORD_BANK[0]);
  assert.equal(nextWord(WORD_BANK[0], () => 0), WORD_BANK[1]);
});

test("calculates accuracy for empty, perfect, and mixed rounds", () => {
  assert.equal(accuracyPercent(0, 0), 0);
  assert.equal(accuracyPercent(4, 4), 100);
  assert.equal(accuracyPercent(2, 3), 67);
});

test("rejects invalid random values and score counts", () => {
  assert.throws(() => nextWord("", () => 1), RangeError);
  assert.throws(() => accuracyPercent(3, 2), RangeError);
});
