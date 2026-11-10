# Three-domain site map

This document records the intended product relationship and what the checked-in deployment files prove. A shared navigation experience does not mean that the repositories or their deployments have already been merged.

| Domain | Repository | Role | Current evidence |
| --- | --- | --- | --- |
| `nicholai.online` | `NicholaiMadias/profile` | Profile, Nexus Assistant, LMS/Toolbox, and Arcade | `.firebaserc` selects project `amazing-grace-hl`; `firebase.json` exports the static site from `out`. |
| `amazinggracehl.org` | `NicholaiMadias/Amazing-Grace` | Home Living, rooms, and housing resources | `Domain.txt` documents GitHub Pages as the current production host. |
| `voiceofjesusministry.net` | `Voice-of-Jesus-Ministry/website` | Ministry, Bible study, and ministry arcade | This repository has a Next.js app and no Firebase Hosting config in its root. |

## Consolidation target

Use Firebase for all three public domains while keeping the three repositories and product boundaries clear. Register one Firebase Hosting site per static export and map each custom domain to its own site. The ministry app has server-side features (including optional Clerk accounts); decide whether it can be exported statically or needs Firebase App Hosting/another server runtime before assigning its domain.

Do not point production DNS at new hosting until the site IDs are registered, the domain ownership checks and SSL certificates are ready, and each production build has been verified. The profile project's current Firebase project is known from source; the site IDs for the other domains and deploy credentials are not present here. Never commit Firebase service-account JSON, API tokens, or other secrets. Use GitHub Actions secrets/OIDC or Google Secret Manager for deployment credentials.

## Nexus product map

- Profile links to the Nexus Assistant at `/nexus`, study/workbench tools at `/tools`, and practice games at `/arcade`.
- The Agent repository remains a local companion and browser extension. Its project map is metadata, not a remote GitHub, DNS, Firebase, or deployment connection.
- `NicholaiMadias/Code` contains small multilingual reference implementations for Toolbox and Arcade.

## Completion checklist

- [ ] Confirm the Firebase project and create/register the two additional Hosting site IDs.
- [ ] Choose static Hosting versus App Hosting for the ministry Next.js application.
- [ ] Add repository-scoped GitHub Actions deploy credentials without putting them in source.
- [ ] Build and preview all three sites, then verify custom-domain HTTPS.
- [ ] Update production DNS only after previews and certificates pass.
