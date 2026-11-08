#!/usr/bin/env node

const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(token);

  const { owner, repo } = github.context.repo;
  const prNumber = github.context.payload.pull_request.number;

  const files = await octokit.paginate(
    octokit.rest.pulls.listFiles,
    {
      owner,
      repo,
      pull_number: prNumber,
      per_page: 100
    }
  );

  const filenames = files.map(f => f.filename);

  const labels = [];

  if (filenames.some(f => f.startsWith(".github/"))) labels.push("workflow");
  if (filenames.some(f => /\.(md|txt)$/i.test(f))) labels.push("docs");
  if (filenames.some(f => f.startsWith("tests/"))) labels.push("tests");
  if (filenames.some(f => f.includes("properties"))) labels.push("content");

  if (labels.length) {
    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: prNumber,
      labels
    });
  }

  const body = `## ✨ Electra Review

### Changed Files
${filenames.map(f => `- \`${f}\``).join("\n")}

### Checklist
- [ ] Build passes
- [ ] Tests pass
- [ ] No secrets committed
- [ ] Documentation updated
- [ ] Property data verified
`;

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body
  });
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
