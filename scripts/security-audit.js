#!/usr/bin/env node

const { execSync } = require("child_process");

try {
  execSync(
    "npm audit --audit-level=moderate",
    { stdio: "inherit" }
  );
} catch (e) {
  console.log("Security findings detected. Continuing workflow.");
}
