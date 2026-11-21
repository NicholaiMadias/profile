import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const contents = readFileSync(new URL("../lib/md102-course.ts", import.meta.url), "utf8");
const page = readFileSync(new URL("../app/academy/md-102/page.tsx", import.meta.url), "utf8");
const widget = readFileSync(new URL("../components/MD102Course.tsx", import.meta.url), "utf8");

test("MD-102 course tracks all five published 2026 study-guide domains", () => {
  for (const domain of [
    "Prepare infrastructure for devices",
    "Manage and maintain devices",
    "Protect devices",
    "Manage and secure applications",
    "Optimize with automation, monitoring and reporting",
  ]) assert.ok(contents.includes(domain), domain);
});
test("course stays publicly reachable and permits guest use", () => {
  assert.ok(page.includes("MD102Course"));
  assert.ok(widget.includes("Guest mode"));
  assert.ok(widget.includes("Sign in with Google (optional)"));
  assert.ok(widget.includes("users"));
  assert.ok(widget.includes("lmsProgress"));
});
