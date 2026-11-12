import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building an Enterprise Endpoint Automation Toolkit | Nicholai Madias",
  description: "Architecture and lessons from a reusable endpoint engineering portfolio project.",
};

export default function ToolkitArticle() {
  return (
    <main className="container page">
      <article className="blog-article">
        <p className="eyebrow">ENGINEERING NOTES / ENDPOINT AUTOMATION</p>
        <h1>Building a Reusable Enterprise Endpoint Automation Toolkit</h1>
        <p className="lede">Endpoint engineering spans identity, device management, monitoring, and reporting. A modular toolkit makes those boundaries explicit while keeping each example independently useful.</p>
        <h2>Architecture</h2>
        <p>PowerShell modules cover Active Directory inventory, Workspace ONE API inventory, Entra ID reporting, Windows service health, and CSV summaries. Python examples provide a reporting dashboard and a paginated Microsoft Graph client. Prompt templates support sensor authoring and migration planning.</p>
        <h2>Engineering decisions</h2>
        <p>Inventory records with missing logon dates should be classified as unknown rather than assumed inactive. API clients should handle pagination, timeouts, and HTTP errors. Dashboards should label inventory status accurately instead of equating it with formal compliance.</p>
        <h2>Security and testing</h2>
        <p>Credentials belong in secret stores or short-lived environment configuration, never in source control. Run unit tests using mocks, and validate tenant-specific integrations only in authorized test environments. Reference code is not a claim of production deployment.</p>
        <h2>Next steps</h2>
        <p>Expand Pester coverage, add contract tests for Workspace ONE responses, and validate role-based Graph permissions before using these modules operationally.</p>
        <p><Link className="text-link" href="/tools/enterprise-endpoint">Explore the toolkit and source</Link></p>
      </article>
    </main>
  );
}
