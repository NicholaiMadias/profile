import { MD102_IDS } from "./md102-course";
export const MD102_STORAGE_KEY = "nicholai:lms:md102:v1:guest";
export type Md102Progress = { version: 1; completed: string[]; best: Record<string, number> };
export function emptyMd102Progress(): Md102Progress {
  return { version: 1, completed: [], best: {} };
}
export function parseMd102Progress(input: unknown): Md102Progress {
  const output = emptyMd102Progress();
  if (!input || typeof input !== "object" || Array.isArray(input)) return output;
  const value = input as Record<string, unknown>;
  if (value.version !== 1) return output;
  if (Array.isArray(value.completed)) {
    output.completed = [...new Set(value.completed.filter((id): id is string => typeof id === "string" && MD102_IDS.includes(id)))];
  }
  if (value.best && typeof value.best === "object" && !Array.isArray(value.best)) {
    for (const id of MD102_IDS) {
      const score = (value.best as Record<string, unknown>)[id];
      if (score === 0 || score === 1) output.best[id] = score;
    }
  }
  return output;
}
export function mergeMd102Progress(a: Md102Progress, b: Md102Progress): Md102Progress {
  const best: Record<string, number> = {};
  for (const id of MD102_IDS) {
    const x = a.best[id], y = b.best[id];
    if (x !== undefined || y !== undefined) best[id] = Math.max(x ?? 0, y ?? 0);
  }
  return {
    version: 1,
    completed: MD102_IDS.filter(id => a.completed.includes(id) || b.completed.includes(id)),
    best
  };
}
