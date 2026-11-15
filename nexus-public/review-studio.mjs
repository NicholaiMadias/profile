#!/usr/bin/env node
// Nexus Review Studio: local Markdown review and feedback summarization.
// Third-party UI: markdown-review@0.0.9 (MIT, archived).
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';

const [action, input, output] = process.argv.slice(2);
const usage = 'Usage: node review-studio.mjs open <document.md> [feedback.md]\n       node review-studio.mjs summarize <feedback.md> [summary.md]';
if (!['open', 'summarize'].includes(action) || !input || !input.endsWith('.md')) {
  console.error(usage);
  process.exit(2);
}
const file = resolve(input);
try { readFileSync(file, 'utf8'); } catch (error) {
  console.error('Cannot read Markdown file:', error.message);
  process.exit(1);
}
if (action === 'open') {
  // npx starts an HTTP server bound locally by the upstream package.
  // Never pass passwords, tokens, or untrusted private documents.
  const args = ['--yes', '--package', 'markdown-review@0.0.9', 'markdown-review', file];
  if (output) args.push('-o', resolve(output));
  console.log('Opening Markdown Review 0.0.9. Review the document and submit feedback in your browser.');
  const run = spawnSync('npx', args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (run.error) { console.error(run.error.message); process.exit(1); }
  process.exit(run.status ?? 1);
}
const feedback = readFileSync(file, 'utf8').trim();
if (!feedback) { console.error('Feedback file is empty.'); process.exit(1); }
const lines = feedback.split(/\r?\n/);
const sections = [];
let current = { heading: 'General feedback', lines: [] };
for (const line of lines) {
  if (/^#{1,4}\s+/.test(line)) {
    if (current.lines.some(s => s.trim())) sections.push(current);
    current = { heading: line.replace(/^#{1,4}\s+/, ''), lines: [] };
  } else if (line.trim()) current.lines.push(line);
}
if (current.lines.some(s => s.trim())) sections.push(current);
const summary = [
  '# Nexus Review Studio — feedback summary',
  '',
  'Source: ' + basename(file),
  '',
  '> Generated from the review export; inspect all items before authorizing implementation.',
  '',
  ...sections.flatMap(({ heading, lines }) => ['## ' + heading, '', ...lines, '']),
  '## Decision', '', 'Pending explicit approval. No source code or deployments were changed by this review.', ''
].join('\n');
const destination = resolve(output || file.replace(/\.md$/i, '-summary.md'));
writeFileSync(destination, summary);
console.log('Feedback summary saved: ' + destination);
