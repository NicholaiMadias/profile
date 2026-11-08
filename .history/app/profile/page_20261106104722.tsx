import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicholai Maro Madias | Platform Engineer",
  description: "Enterprise endpoints, identity, automation, tools, and local-first software design.",
};

const experience = [
  ["Charter Communications", "Lead / Senior Unified Endpoint Management Engineer", "Nov 2024 – Present"],
  ["Charter Communications", "System Administrator (Senior / Lead UEM)", "Feb 2022 – Nov 2024"],
  ["Infosys Limited", "Technology Lead (Enterprise Endpoint Engineering)", "Apr 2021 – Feb 2022"],
  ["Cognizant Technology Solutions", "Senior Systems Administrator", "Oct 2017 – Apr 2021"],
  ["Adecco at Google", "Technical Specialist (G Suite Operations)", "Mar 2016 – Jul 2017"],
  ["Tribridge", "Technical Support Consultant", "Oct 2014 – Jan 2016"],
];

const responsibilities = [
  ["Led modernization across mobile and desktop endpoints; delivered conditional access and automated provisioning.", "Engineered zero-touch deployment pipelines for enterprise devices.", "Built compliance and vulnerability reporting connecting endpoint signals with operational teams."],
  ["Administered Workspace ONE and Intune environments supporting 70,000+ users and devices.", "Authored PowerShell automation to streamline provisioning, policy remediation, and routine system maintenance.", "Partnered with security teams to validate configuration baselines and eliminate operational drift."],
  ["Delivered endpoint architecture and deployment guidance across global client fleets.", "Managed enterprise identity integrations spanning Active Directory, Azure AD / Entra ID, and Google Workspace.", "Automated enterprise software packaging, distribution, and validation."],
  ["Administered enterprise directory services, group policy, and unified endpoint infrastructure.", "Built operational dashboards to surface patch compliance, software inventory, and identity health.", "Supported tier-three escalation and incident root-cause analysis."],
  ["Supported enterprise customers through large-scale migrations from Microsoft to Google Workspace.", "Engineered directory synchronization and single-sign-on workflows for 400,000+ accounts.", "Documented identity federation patterns and operational runbooks."],
  ["Provided technical consulting for cloud infrastructure, directory services, and desktop platforms.", "Resolved complex escalations across identity, connectivity, and enterprise software.", "Improved Customer Effort Score by 21% through process improvements."],
];

const skills = [
  ['Endpoints & management', 'VMware Workspace ONE (AirWatch) · Microsoft Intune · MECM / SCCM · Jamf · Enterprise mobility · Zero-touch deployment · Automated provisioning · Vulnerability remediation'],
  ['Identity & security', 'Active Directory · Microsoft Entra ID · IAM · RBAC · Conditional Access · MFA · Group Policy · Zero Trust · Qualys · Rapid7 · Tenable · Tanium'],
  ['Automation & reporting', 'PowerShell · Python · JavaScript · SQL · REST APIs · Reporting · Analytics · KPI dashboards'],
  ['Infrastructure', 'Windows Server · Microsoft 365 · Google Workspace / G Suite Administration · Windows · macOS · Linux · iOS · Android'],
];

export function ProfilePage() {
  return <div className="container page narrow professional-profile">
    <h1>Senior Endpoint Platform Engineer</h1>
    <p className="lede">I bring 15+ years of experience supporting enterprise endpoints, identity and access, security, automation, and infrastructure operations across telecommunications, technology, media, healthcare, and enterprise environments.</p>
    <p>My work connects device lifecycle management with secure identity and practical automation. I help teams provision devices, deploy applications, improve compliance, remediate vulnerabilities, and turn operational data into useful reporting.</p>
    <section className="section" aria-labelledby="impact-title"><h2 id="impact-title">Selected impact</h2><ul><li>Supported endpoint and identity environments serving 350,000+ users worldwide.</li><li>Contributed to Microsoft-to-Google migrations affecting 400,000+ accounts.</li><li>Supported mobility and endpoint operations for 70,000+ users and devices.</li><li>Automated provisioning, deployment, and reporting with PowerShell, Python, SQL, and REST APIs.</li><li>Improved Customer Effort Score by 21% through service and process improvements.</li></ul></section>
    <section id="tools" className="section" aria-labelledby="tools-title"><h2 id="tools-title">Tools</h2><p>Explore my projects, writing, professional profile, and public code.</p><div className="actions"><Link href="/tools">All tools</Link><Link href="/nexus">Nexus Assistant</Link><Link href="/blog">Ni</Link><Link href="/toolbox">Amazing Grace Toolbox</Link><a href="https://www.linkedin.com/in/nicholaimadias/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/NicholaiMadias" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></section>
    <section className="section"><p className="eyebrow">FOCUS AREAS</p><div className="card-grid two"><div className="feature-card"><h2>Platform & identity</h2><p>Workspace ONE, Intune, MECM/SCCM, Active Directory, Entra ID, Google Workspace, IAM, Zero Trust, and endpoint security.</p></div><div className="feature-card"><h2>Automation & systems</h2><p>PowerShell, Python, JavaScript, SQL, REST APIs, dashboards, workflow design, documentation, and local-first web applications.</p></div></div></section>
    <section className="section" aria-labelledby="skills-title"><h2 id="skills-title">Technical skills</h2>{skills.map(([name, tools])=><div key={name}><h3>{name}</h3><p>{tools}</p></div>)}</section>
    <section id="experience" className="section"><p className="eyebrow">EXPERIENCE</p>{experience.map(([company, role, dates], index) => <article className="feature-card" key={company}><h2>{role}</h2><p><strong>{company}</strong> · {dates}</p><ul>{responsibilities[index].map(item=><li key={item}>{item}</li>)}</ul></article>)}</section>
    <section className="section"><h2>Education & professional development</h2><h3>Bachelor of Science, Business Studies — Computer Information Technology</h3><p>Southern New Hampshire University</p><h3>Associate of Science, Computer Information Technology</h3><p>Everest University</p><p>CompTIA Network+ · LinkedIn Learning coursework in AWS and Azure administration.</p><p>G Suite Administration — Infosys course completion, March 31, 2022.</p></section>
  </div>;
}

export default ProfilePage;
