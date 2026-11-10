export const WORD_BANK = [
  "anchor",
  "bright",
  "calm",
  "discover",
  "focus",
  "gentle",
  "harbor",
  "imagine",
  "journey",
  "kindness",
  "listen",
  "moment",
  "notice",
  "patient",
  "quiet",
  "reflect",
  "steady",
  "thought",
  "wonder",
  "worthy",
];

export function nextWord(previousWord, random = Math.random) {
  const choices = WORD_BANK.filter((word) => word !== previousWord);
  const value = random();
  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RangeError("Random value must be in the range [0, 1).");
  }
  return choices[Math.floor(value * choices.length)];
}

export function accuracyPercent(correct, attempted) {
  if (
    !Number.isInteger(correct) ||
    !Number.isInteger(attempted) ||
    correct < 0 ||
    attempted < 0 ||
    correct > attempted
  ) {
    throw new RangeError("Correct and attempted counts must be valid integers.");
  }
  return attempted === 0 ? 0 : Math.round((correct / attempted) * 100);
}
