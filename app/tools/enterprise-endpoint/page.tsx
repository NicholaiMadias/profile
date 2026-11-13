import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enterprise Endpoint Automation Toolkit | Nicholai Madias",
  description: "Reference PowerShell, Python, and AI automation examples for endpoint engineering.",
};

const modules = [
  ["Endpoint inventory", "Active Directory inventory and inactivity classification."],
  ["Workspace ONE", "Device inventory examples requiring authorized tenant credentials."],
  ["Entra ID", "Microsoft Graph user reporting with delegated permissions."],
  ["Monitoring", "Windows service status inspection."],
  ["Reporting", "CSV status summaries and Python dashboard examples."],
  ["AI prompt library", "Workspace ONE sensor and Intune migration planning templates."],
];

export default function EnterpriseEndpointPage() {
  return (
    <main className="container page tools-page">
      <header className="tools-hero">
        <p className="eyebrow">ENGINEERING PORTFOLIO / REFERENCE IMPLEMENTATION</p>
        <h1>Enterprise Endpoint Automation Toolkit</h1>
        <p className="lede">Reusable PowerShell and Python examples for endpoint inventory, reporting, monitoring, and engineering workflows.</p>
        <div className="actions">
          <a className="text-link" href="https://github.com/NicholaiMadias/profile/tree/main/enterprise-endpoint-toolkit">Explore source and examples</a>
          <Link className="text-link" href="/blog/enterprise-endpoint-toolkit">Read the engineering case study</Link>
        </div>
      </header>
      <section className="tools-section" aria-labelledby="command-center-title">
        <h2 id="command-center-title">Endpoint Toolkit Command Center</h2>
        <p>Track reusable scripts and prompts, GitHub Actions runs, test results, blockers, and release checks in the private workspace.</p>
        <div className="actions">
          <a className="text-link" href="https://endpoint-toolkit-command-center.gulfnexus.chatgpt.site">
            Open the command center
          </a>
        </div>
        <p className="tools-fineprint">An authorized ChatGPT account is required.</p>
      </section>
      <section className="tools-section">
        <h2>What is included</h2>
        <div className="card-grid two">
          {modules.map(([title, description]) => (
            <article className="feature-card" key={title}><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>
      <section className="tools-section">
        <h2>Validation and safety</h2>
        <p>These are portfolio reference implementations, not certified production integrations. Test against synthetic data and authorized environments before use. Never commit tokens, tenant secrets, device identifiers, or exported user data.</p>
        <p>Workspace ONE and Microsoft Graph examples require environment-specific permissions, authentication, and API validation. Review least-privilege scopes and operational impact before deployment.</p>
      </section>
    </main>
  );
}
