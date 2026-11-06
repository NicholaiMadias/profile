# Nicholai Madias — Profile

Personal site and experimental portfolio for [nicholai.online](https://nicholai.online).

## Repository map

- `NicholaiMadias/profile` — personal profile, portfolio tools, and selected educational games.
- `Amazing-Grace-Home-Living/website` — housing and Amazing Grace Home Living.
- `Voice-of-Jesus-Ministry/website` — nonprofit Bible study and ministry resources.
- `Gamified-Learning-Matrix/Nexus` — reusable educational-gaming platform and community work.

The personal site may link to the other projects, but their content and deployment ownership remain separate.

## Available in this branch

| Route | Function |
| --- | --- |
| `/` | Ministry introduction, games, and Bible study/recording links |
| `/arcade` | Shared guest practice dashboard |
| `/arcade/bible-quiz` | Ten questions with answer explanations and Scripture references |
| `/arcade/quick-click` | Twenty-second star-catching challenge with pointer and keyboard modes |
| `/tools` | Browser-saved study notes and text download |
| `/account` | Guest progress summary and reset |
| Blog navigation | Links directly to https://voiceofjesusnet.blogspot.com/ |
| `/privacy` | Storage, privacy, and external-link disclosure |

The best result in each game contributes up to 100 practice XP (200 total). 

## Run and verify

The `/nexus` page offers an experimental local-first Chrome extension and
companion. `npm run package:nexus` generates the download in `public/downloads`;
the production build runs it automatically. The package is built from the
explicit allowlist in `scripts/package-nexus.mjs`, never from local vaults,
environment files, or browser profiles. See `nexus-public/README.md` for setup,
privacy details, and features not yet implemented.

Legacy `/Apps/academy` pages that depended on missing assets redirect to current
tools, arcade, and study routes. These destinations are alternatives, not
equivalent versions of every retired game; legacy game progress is not migrated.
The older `/Apps/tools/index.html` page is retained separately pending review.

Requires Node 22.18 or newer. CI uses Node 22.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production verification:

```sh
npm run check
npm start
```

`check` runs TypeScript, gameplay/progress regression tests, and the production build. The GitHub quality workflow also runs `npm audit --omit=dev --audit-level=high`. Dependabot proposes weekly package and GitHub Actions updates.

## Deployment

See [deployment instructions](docs/deployment.md). This branch is ready for a Next.js hosting preview after the hosting account/project is connected. This README does not assert that the branch has been deployed or that a domain is configured.

No environment variables, paid API services, auth backend, or payment provider are needed for this guest release. Before enabling real integrations, add authenticated server endpoints, encrypted token storage, revocable authorization, provider allowlists, usage controls, and server-owned scores/rewards. Never collect provider keys in browser storage.

## Audit and next steps

- [Migration decision and source findings](docs/migration-audit.md)
- [Source file and exact-duplicate inventory](docs/source-inventory.json)
- [License and source attribution](THIRD_PARTY_NOTICES.md)

Next: a canonical, corrected Star Match engine; real accounts and verified rewards; one secure cloud-storage connection; one server-backed AI provider. Payments remain deferred.

## Ministry links

- Intended ministry domain: https://voiceofjesusministry.net
- Recordings: https://youtube.com/@voiceofjesusnetwork
- Bible study: Thursdays at 8 pm Eastern
- Community: https://m.me/j/AbbK3MZd144YgdvI/

Application source is GPL-3.0; see `LICENSE` and `THIRD_PARTY_NOTICES.md`. Ministry branding and separately authored content retain their existing ownership.
