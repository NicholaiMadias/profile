#!/usr/bin/env node
// Explicit audit task for maintainers. The repository uses ESM, not require().
import { spawnSync } from "node:child_process";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const result = spawnSync(npm, ["audit", "--omit=dev", "--audit-level=high"], {
  stdio: "inherit",
  shell: false,
});
if (result.error) {
  console.error("Security audit could not run:", result.error.message);
  process.exitCode = 1;
} else {
  // Fail closed: an audit failure must not be reported as a passing check.
  process.exitCode = result.status === 0 ? 0 : 1;
}
