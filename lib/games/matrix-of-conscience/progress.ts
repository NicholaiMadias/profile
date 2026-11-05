export const MATRIX_PROGRESS_VERSION = 1;

export type MatrixCampaignProgress = {
  version: typeof MATRIX_PROGRESS_VERSION;
  unlockedLevel: number;
};

const defaultProgress = (): MatrixCampaignProgress => ({
  version: MATRIX_PROGRESS_VERSION,
  unlockedLevel: 1,
});

function validLevel(value: unknown, maxLevel: number): value is number {
  return Number.isInteger(value) && Number(value) >= 1 && Number(value) <= maxLevel;
}

export function parseMatrixProgress(
  raw: string | null,
  maxLevel: number,
): MatrixCampaignProgress {
  if (!raw || !Number.isInteger(maxLevel) || maxLevel < 1) return defaultProgress();

  // Migrate the original localStorage format, which stored only a number.
  if (/^\d+$/.test(raw)) {
    const unlockedLevel = Number(raw);
    return validLevel(unlockedLevel, maxLevel)
      ? { version: MATRIX_PROGRESS_VERSION, unlockedLevel }
      : defaultProgress();
  }

  try {
    const value: unknown = JSON.parse(raw);
    if (
      typeof value === 'object' &&
      value !== null &&
      'version' in value &&
      value.version === MATRIX_PROGRESS_VERSION &&
      'unlockedLevel' in value &&
      validLevel(value.unlockedLevel, maxLevel)
    ) {
      return { version: MATRIX_PROGRESS_VERSION, unlockedLevel: value.unlockedLevel };
    }
  } catch {
    // Corrupt or unrelated storage is treated as a fresh campaign.
  }

  return defaultProgress();
}

export function serializeMatrixProgress(unlockedLevel: number): string {
  return JSON.stringify({ version: MATRIX_PROGRESS_VERSION, unlockedLevel });
}
