export type Rectangle = { x: number; y: number; width: number; height: number };
export type QuizResult = { combo: number; drones: number; score: number; wave: number; continueQuiz: boolean };
export const QUIZ_STREAK_LIMIT: number;
export const MAX_SUPPORT_DRONES: number;
export function overlaps(a: Rectangle, b: Rectangle): boolean;
export function resolveShots<T extends Rectangle, U extends Rectangle>(bullets: T[], enemies: U[]): {
  bullets: T[]; enemies: U[]; score: number; hits: number;
};
export function quizResult(input: { correct: boolean; combo: number; drones: number; score: number; wave: number }): QuizResult;
