# Nexus OS: Independent Domain Health and Deployment

## Primary production target

- Intended primary: https://nicholai.online
- Independent ministry deployment: https://voiceofjesusministry.net
- This repository is a Next.js 16 static-export project (`next.config.ts` sets `output: "export"`), **not a Vite project**. Build output is `out/`, not `dist/`.
- The existing Firebase Hosting workflow deploys a project named `amazing-grace-hl`; that alone does **not** prove the domain `nicholai.online` points there. Verify Firebase/Vercel/GitHub Pages ownership, DNS, certificates, canonical redirects and current live provider before changing or publishing.
- The ministry site has its own repository. Do not reuse a site's deployment token, Firebase project, GitHub Pages CNAME, or storage keys in the other site's pipeline.

## What the workflow does

- On pushes and pull requests, validates typecheck, tests and the existing Next.js static build.
- On an hourly schedule or manual dispatch, checks each **live domain independently** with HTTPS and a final HTTP 200 requirement.
- A failed check fails the GitHub Actions job, surfacing the outage in Actions and native GitHub notifications. It does **not** claim repair or automatic failover.
- It performs **no deployment**. Existing publisher workflows remain unmodified.

## Before enabling automatic deployment or external alerts

1. Confirm the correct DNS target/provider and domain ownership on **each domain**, and make sure only one workflow owns the production deployment.
2. Audit existing Firebase actions to avoid double writes or competing deploys; do not add a second GitHub Pages deployment that overwrites the production CNAME.
3. For fallback hosting, validate the Next.js `out/` export, test deep links and static asset paths on the target provider, then define an explicit DNS or edge failover runbook.
4. For game-state isolation, namespace `localStorage` keys per application and major schema version (for example `celestial-match:v1:...`), and use distinct DOM mount IDs and one initialization lifecycle per page. Different domains already provide different browser origins; separate repositories alone do not prevent duplicate mounts in one page.
5. Test Celestial Match scene initialization, audio unlock/user gesture, SFX loading, current store-economy persistence, refresh and version migration using a browser on the **actual deployed site**. No engine verification is implied by a passing homepage health check.
6. Do not transmit `Agent.Instructions.pdf` or any private agent instructions to an unverified API. Implement governance sync only after confirming the receiving service, identity, scope, retention policy and authorization. Prefer GitHub’s existing repository access controls.
7. A GitHub Actions failure is an alert signal, not a self-healing action. Configure explicit notifications or a verified notification service if needed.

## Routing notes

Do **not** apply a Vite SPA catch-all rewrite to this Next.js project. Next.js static-export routes must resolve to generated files under `out/`, using provider-specific clean URL/redirect handling. The current `firebase.json` handles some redirects. Review each deployment provider's support for exported route paths before relying on deep-link availability.

The source document titled *AI-Powered Gamified Learning and Academic Research Development* was referenced in discussion but was not available in the accessible file library. No claims are made here about its exact implementation.
