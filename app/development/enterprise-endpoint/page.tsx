import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Development: Enterprise Endpoint Automation Toolkit",
  description: "Work-in-progress endpoint engineering reference examples.",
  robots: { index: false, follow: false },
};

export default function DevelopmentToolkit() {
  return (
    <main className="container page tools-page">
      <header className="tools-hero">
        <p className="eyebrow">DEVELOPMENT / NOT PRODUCTION READY</p>
        <h1>Enterprise Endpoint Automation Toolkit</h1>
        <p className="lede">PowerShell, Python, Workspace ONE and Microsoft Graph reference implementations undergoing validation.</p>
        <p>These examples have not been certified for production use. Do not run them against real tenants or fleets without authorization, review, and controlled testing.</p>
        <div className="actions">
          <a className="text-link" href="https://github.com/NicholaiMadias/profile/tree/main/enterprise-endpoint-toolkit">Review development source</a>
          <Link className="text-link" href="/blog/enterprise-endpoint-toolkit">Read the technical case study</Link>
        </div>
      </header>
      <section className="tools-section">
        <h2>Validation backlog</h2>
        <p>Tenant-specific Workspace ONE authentication and pagination, Microsoft Graph delegated permissions and throttling, Windows PowerShell module behavior, and production-scale reporting all require further verification.</p>
        <p>This development page is intentionally omitted from the site's navigation and search indexing.</p>
      </section>
    </main>
  );
}
