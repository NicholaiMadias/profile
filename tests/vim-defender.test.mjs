import test from "node:test";
import assert from "node:assert/strict";
import { overlaps, resolveShots, quizResult, QUIZ_STREAK_LIMIT, MAX_SUPPORT_DRONES } from "../lib/games/vim-defender.mjs";

const rect = (x, y) => ({ x, y, width: 10, height: 10 });

test("collision includes overlap but excludes edges merely touching", () => {
  assert.equal(overlaps(rect(0, 0), rect(9, 9)), true);
  assert.equal(overlaps(rect(0, 0), rect(10, 0)), false);
});

test("one projectile scores once even when two enemies overlap", () => {
  const result = resolveShots([rect(0, 0)], [rect(0, 0), rect(0, 0)]);
  assert.equal(result.hits, 1);
  assert.equal(result.score, 10);
  assert.equal(result.enemies.length, 1);
  assert.equal(result.bullets.length, 0);
});

test("multiple bullets clear adjacent enemies without skipping elements", () => {
  const result = resolveShots([rect(0, 0), rect(20, 0)], [rect(0, 0), rect(20, 0)]);
  assert.equal(result.hits, 2);
  assert.deepEqual(result.enemies, []);
});

test("a miss retains a bullet and does not score", () => {
  const bullet = rect(100, 100);
  const result = resolveShots([bullet], [rect(0, 0)]);
  assert.deepEqual(result.bullets, [bullet]);
  assert.equal(result.score, 0);
});

test("three correct answers move to next wave and cap support drones", () => {
  let state = { combo: 0, drones: MAX_SUPPORT_DRONES - 1, score: 0, wave: 2 };
  for (let i = 0; i < QUIZ_STREAK_LIMIT; i++) {
    const next = quizResult({ ...state, correct: true });
    state = next;
  }
  assert.equal(state.continueQuiz, false);
  assert.equal(state.drones, MAX_SUPPORT_DRONES);
  assert.equal(state.score, 50 + 100 + 150);
});

test("incorrect answer ends quiz and increments wave", () => {
  const result = quizResult({ correct: false, combo: 2, drones: 2, score: 150, wave: 4 });
  assert.deepEqual(result, { combo: 0, drones: 2, score: 150, wave: 5, continueQuiz: false });
});
