# Nicholai.online — Platform Engineering Portfolio

[Live portfolio](https://nicholai.online) · [GitHub profile](https://github.com/NicholaiMadias) · [Security policy](SECURITY.md)

Nicholai Maro Madias is a senior platform engineer and infrastructure architect with 15+ years in enterprise IT. His work includes endpoint and identity administration for HCLTech’s Verizon assignment and Microsoft 365 migrations to Google Workspace for Infosys’s Google assignment. The portfolio’s [professional experience](https://nicholai.online/profile#experience) lists roles, clients, dates, and education.

This repository powers the portfolio, endpoint automation tools, public learning activities, and local-first Nexus browser companion.

## Explore the project

| Area | Live path | Scope |
| --- | --- | --- |
| Engineering profile | [Profile](https://nicholai.online/profile) | Experience, platform tooling, and selected case studies |
| Certification Academy | [Academy](https://nicholai.online/academy) | Unofficial A+, Network+, and Security+ practice; Microsoft Intune pathway |
| Endpoint Engineering | [Enterprise Endpoint Toolkit](https://nicholai.online/tools/enterprise-endpoint) | Reporting, deployment and automation reference |
| Public Agent Nexus | [Agent](https://nicholai.online/agent) | Guided learning and public agent overview |
| Nexus companion | [Nexus](https://nicholai.online/nexus) | Local-first extension and companion; see [privacy/limitations](nexus-public/README.md) |
| Interactive learning | [Arcade](https://nicholai.online/arcade) | Educational game experiences and demonstrations |

Some tools and features are experimental. A linked learning experience is not an official certification or an assertion of live cloud integration.

## Related public source

- [Enterprise Endpoint Automation Toolbox](https://github.com/Amazing-Grace-Home-Living/Toolbox) — standalone read-only Intune / Workspace ONE inventory tools in Python and PowerShell; includes tests and sample data.
- [Amazing Grace Home Living](https://github.com/Amazing-Grace-Home-Living/website) — separately managed housing site, arcade, LMS, and media resources.
- [Voice of Jesus Ministry](https://github.com/Voice-of-Jesus-Ministry/website) — separately managed nonprofit website and Bible study arcade.
- [GitHub profile README](https://github.com/NicholaiMadias/NicholaiMadias) — concise public introduction and curated links.

The websites and organizations have separate purposes and deployment ownership. Private experiments and historical forks are not presented as portfolio products.

## Run and verify

Requires Node.js **22.18+** and npm.

```bash
npm ci
npm run dev
npm run check
```

`npm run check` performs the TypeScript check, Node gameplay/tool tests, and Next.js build. `npm run build` also assembles the Nexus extension download using the explicit file list in `scripts/nexus-package-files.mjs`; review and update that list when adding distributable files. `npm run text:stats -- path/to/file.txt` runs the local text-analysis CLI. See [deployment information](docs/deployment.md) and [the curated three-domain map](docs/three-domain-map.md).

## Security and privacy

Never commit production device inventories, credentials, provider tokens, or personal data. Use least-privilege access and GitHub/Vercel secret storage for authorized integrations. Browser-local progress is not a verified account or server-issued credential. Follow [SECURITY.md](SECURITY.md) to report a vulnerability; do not open public issues containing secrets.

License and upstream attribution: [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
