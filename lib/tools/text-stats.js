const WORD_PATTERN = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
const SENTENCE_END_PATTERN = /[.!?](?=\s|$)/g;

export function analyzeText(text, wordsPerMinute = 220) {
  if (typeof text !== "string") {
    throw new TypeError("Text must be a string.");
  }
  if (!Number.isFinite(wordsPerMinute) || wordsPerMinute <= 0) {
    throw new RangeError("Words per minute must be a positive number.");
  }

  const words = text.match(WORD_PATTERN) ?? [];
  const wordCount = words.length;
  const sentenceCount =
    wordCount === 0
      ? 0
      : Math.max(1, text.match(SENTENCE_END_PATTERN)?.length ?? 0);

  return {
    wordCount,
    characterCount: text.length,
    sentenceCount,
    readingMinutes: wordCount === 0 ? 0 : Math.ceil(wordCount / wordsPerMinute),
  };
}
