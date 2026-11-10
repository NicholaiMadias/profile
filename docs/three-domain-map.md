# Three-domain site map

This document records the intended product relationship and what the checked-in deployment files prove. A shared navigation experience does not mean that the repositories or their deployments have already been merged.

| Domain | Repository | Role | Current evidence |
| --- | --- | --- | --- |
| `nicholai.online` | `NicholaiMadias/profile` | Profile, Nexus Assistant, LMS/Toolbox, and Arcade | `.firebaserc` selects project `amazing-grace-hl`; `firebase.json` exports the static site from `out`. |
| `amazinggracehl.org` | `NicholaiMadias/Amazing-Grace` | Home Living, rooms, and housing resources | `Domain.txt` documents GitHub Pages as the current production host. |
| `voiceofjesusministry.net` | `Voice-of-Jesus-Ministry/website` | Ministry, Bible study, and ministry arcade | This repository has a Next.js app and no Firebase Hosting config in its root. |

## Consolidation target

Use Firebase for all three public domains while keeping the three repositories and product boundaries clear. Firebase Hosting can map separate sites to separate custom domains. Because these are distinct products, prefer separate Firebase projects unless they are intentionally meant to share Firebase Authentication, databases, or other backend resources; Firebase's best-practices guide cautions against putting logically independent apps in one project. If one shared project is chosen, create a Hosting site ID per domain and use explicit deploy targets. The ministry app is a Next.js application with optional Clerk accounts; assess Firebase App Hosting for its server-side routes before assigning the ministry domain.

Do not point production DNS at new hosting until the site IDs are registered, the domain ownership checks and SSL certificates are ready, and each production build has been verified. The profile project's current Firebase project is `amazing-grace-hl` according to `.firebaserc`; confirm that it is intentionally the profile's project, since the ID name suggests Home Living. The site IDs for the other domains and deploy credentials are not present here. Never commit Firebase service-account JSON, API tokens, or other secrets. Use GitHub Actions secrets/OIDC or Google Secret Manager for deployment credentials.

References: [Firebase Hosting multisite](https://firebase.google.com/docs/hosting/multisites), [Firebase project best practices](https://firebase.google.com/docs/projects/dev-workflows/general-best-practices), and [Firebase App Hosting framework support](https://firebase.google.com/docs/app-hosting/frameworks-tooling).

## Nexus product map

- Profile links to the Nexus Assistant at `/nexus`, study/workbench tools at `/tools`, and practice games at `/arcade`.
- The Agent repository remains a local companion and browser extension. Its project map is metadata, not a remote GitHub, DNS, Firebase, or deployment connection.
- `NicholaiMadias/Code` contains small multilingual reference implementations for Toolbox and Arcade.

## Completion checklist

- [ ] Confirm whether to use three Firebase projects or one shared project; create/register the appropriate Hosting site IDs.
- [ ] Choose static Hosting versus App Hosting for the ministry Next.js application.
- [ ] Add repository-scoped GitHub Actions deploy credentials without putting them in source.
- [ ] Build and preview all three sites, then verify custom-domain HTTPS.
- [ ] Update production DNS only after previews and certificates pass.
