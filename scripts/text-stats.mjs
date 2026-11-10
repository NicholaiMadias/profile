#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { analyzeText } from "../lib/tools/text-stats.js";

const files = process.argv.slice(2);
if (files.length > 1) {
  console.error("Usage: npm run text:stats [file]");
  process.exitCode = 2;
} else {
  try {
    let text;
    if (files.length === 1) {
      text = await readFile(files[0], "utf8");
    } else {
      const chunks = [];
      for await (const chunk of process.stdin) chunks.push(chunk);
      text = Buffer.concat(chunks).toString("utf8");
    }

    const stats = analyzeText(text);
    console.log(`Words: ${stats.wordCount}`);
    console.log(`Characters: ${stats.characterCount}`);
    console.log(`Sentences: ${stats.sentenceCount}`);
    console.log(`Estimated reading time: ${stats.readingMinutes} minute(s)`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
