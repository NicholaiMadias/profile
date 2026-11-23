import test from "node:test";
import assert from "node:assert/strict";
import { certificationMissions } from "../lib/certification-quests.ts";
import { selectQuizQuestions, BONUS_QUIZ_LENGTH } from "../lib/games/matrix-of-conscience/quiz.ts";

test("academy has distinct missions with valid four-choice answers and explanations", () => {
  assert.ok(certificationMissions.length >= 6);
  const ids = certificationMissions.map(m => m.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const mission of certificationMissions) {
    assert.ok(mission.questions.length > 0, mission.id);
    const prompts = mission.questions.map(q => q.prompt);
    assert.equal(new Set(prompts).size, prompts.length, mission.id);
    for (const question of mission.questions) {
      assert.equal(question.answers.length, 4, question.prompt);
      assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 4);
      assert.ok(question.why.trim().length > 10, question.prompt);
      assert.ok(question.source.trim(), question.prompt);
    }
  }
});

test("matrix quiz draws the correct count without mutating its source or repeating questions", () => {
  const input = Array.from({ length: 12 }, (_, index) => ({ id: index }));
  const result = selectQuizQuestions(input, BONUS_QUIZ_LENGTH, () => 0.5);
  assert.equal(result.length, BONUS_QUIZ_LENGTH);
  assert.equal(new Set(result.map(x => x.id)).size, result.length);
  assert.deepEqual(input.map(x => x.id), Array.from({ length: 12 }, (_, i) => i));
});

test("matrix quiz respects empty pools, zero limits and oversized limits", () => {
  assert.deepEqual(selectQuizQuestions([], 5), []);
  assert.deepEqual(selectQuizQuestions([1,2,3], 0), []);
  assert.equal(selectQuizQuestions([1,2,3], 100).length, 3);
});
