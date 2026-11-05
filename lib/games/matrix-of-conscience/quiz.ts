export const BONUS_QUIZ_LENGTH = 5;

export function selectQuizQuestions<T>(
  questions: readonly T[],
  limit = BONUS_QUIZ_LENGTH,
  random: () => number = Math.random,
): T[] {
  const pool = [...questions];

  // Fisher–Yates avoids the biased, engine-dependent ordering from sort(Math.random).
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const sample = Math.min(Math.max(random(), 0), 0.9999999999999999);
    const swapIndex = Math.floor(sample * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }

  const safeLimit = Number.isInteger(limit) ? Math.max(0, limit) : 0;
  return pool.slice(0, Math.min(safeLimit, pool.length));
}
