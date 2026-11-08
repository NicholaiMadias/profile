#!/usr/bin/env node

const fs = require("fs");
const cp = require("child_process");

const event = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH)
);

const reviewId = event.review.id;

console.log(`Processing review ${reviewId}`);

/*
Future enhancement:

1. Fetch review comments.
2. Parse ```suggestion blocks.
3. Apply patches.
4. Commit changes.
5. Push branch.

Current version protects against accidental writes until
explicitly approved.
*/

console.log("No auto-applied patches detected.");

fs.appendFileSync(
  process.env.GITHUB_OUTPUT,
  `result=skipped\n`
);

fs.appendFileSync(
  process.env.GITHUB_OUTPUT,
  `message=No approved review suggestions found.\n`
);

fs.appendFileSync(
  process.env.GITHUB_OUTPUT,
  `changed_files=[]\n`
);
