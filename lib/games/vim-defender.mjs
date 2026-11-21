/** Pure gameplay rules shared by the React canvas and Node test suite. */
export const QUIZ_STREAK_LIMIT = 3;
export const MAX_SUPPORT_DRONES = 5;

export function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
    a.y < b.y + b.height && a.y + a.height > b.y;
}

/** Each bullet can destroy at most one enemy. No mutation during traversal. */
export function resolveShots(bullets, enemies) {
  const remainingEnemies = [...enemies];
  const remainingBullets = [];
  let hits = 0;
  for (const bullet of bullets) {
    const index = remainingEnemies.findIndex((enemy) => overlaps(bullet, enemy));
    if (index === -1) remainingBullets.push(bullet);
    else {
      remainingEnemies.splice(index, 1);
      hits++;
    }
  }
  return { bullets: remainingBullets, enemies: remainingEnemies, score: hits * 10, hits };
}

export function quizResult({ correct, combo, drones, score, wave }) {
  if (correct) {
    const nextCombo = Math.min(QUIZ_STREAK_LIMIT, combo + 1);
    return {
      combo: nextCombo,
      drones: Math.min(MAX_SUPPORT_DRONES, drones + 1),
      score: score + 50 * nextCombo,
      wave,
      continueQuiz: nextCombo < QUIZ_STREAK_LIMIT
    };
  }
  return { combo: 0, drones, score, wave: wave + 1, continueQuiz: false };
}
