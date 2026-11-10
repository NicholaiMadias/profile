import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicholai Maro Madias | Senior Endpoint & Infrastructure Engineer",
  description: "Enterprise endpoint, identity, infrastructure, and automation engineering for global workforces.",
};

const experience = [
  { role: "Senior Platform Engineer", company: "Amazing Grace Home Living", location: "Remote", period: "Oct 2023 – Present", description: "Administer Active Directory, Windows Server, Group Policy, and endpoint infrastructure. Develop PowerShell/Python automation and API integrations." },
  { role: "Technical Support Engineer", company: "Tandym Group (Client: Pansophic Learning)", location: "Tampa, FL", period: "Aug 2022 – Oct 2023", description: "Administered Microsoft Intune, Windows Autopilot, Active Directory, Entra ID, and Apple Business Manager." },
  { role: "Technical Support Engineer", company: "Infosys (Client: Google)", location: "Tampa, FL", period: "Feb 2021 – Apr 2022", description: "Supported identity & access management (IAM) and user provisioning. Collaborated as a team to achieve an 85% support backlog reduction." },
  { role: "Network & Security Administrator", company: "Allied Universal", location: "Tampa, FL", period: "Sep 2016 – Feb 2021", description: "Managed Windows infrastructure, Active Directory, SCCM/MECM, Tanium, and vulnerability remediation across Qualys, Rapid7, and Tenable." },
  { role: "Systems Operations Lead / Network Administrator", company: "Nielsen Media Research", location: "Oldsmar, FL", period: "Mar 2011 – Oct 2016", description: "Managed Windows server infrastructure, endpoint systems, VMware virtualization, and scripting automation." }
];

const competencies = [
  ["Endpoint & Mobility Management", "Microsoft Intune, Workspace ONE UEM, MECM/SCCM, Windows Autopilot, Apple Business Manager, Device Compliance, Patch Management"],
  ["Identity & Access Management", "Active Directory, Microsoft Entra ID, Single Sign-On (SSO), Multi-Factor Authentication (MFA), RBAC, Conditional Access, Zero Trust Architecture"],
  ["Infrastructure & Networking", "Windows Server (2012–2025), IIS Web Hosting, MS SQL Server Always On / Clustered Environments, TCP/IP, DNS, HTTP/HTTPS, SSL/TLS, VPNs, Proxy Services, Virtualization (VMware clusters)"],
  ["Automation & Scripting", "PowerShell Scripting, Python, JavaScript, REST APIs, Git/GitHub/GitLab Automation, CI/CD Workflows"],
];

const achievements = [
  "Supported global identity governance and endpoint operations for enterprise environments serving 350,000+ users.",
  "Contributed to Microsoft-to-Google migrations impacting 400,000+ user accounts across productivity and identity systems.",
  "Promoted from specialized EVS Encoder technical support to a full-time Network Administrator role at Nielsen within 12 months.",
  "Spearheaded structured diagnostic standards and troubleshooting frameworks to achieve up to an 85% reduction in incident backlogs.",
  "Built modular custom administrative utilities and pipeline triggers utilizing PowerShell to replace manual operational tasks.",
];

export function ProfilePage() {
  return <div className="container page narrow professional-profile">
    <h1>Senior Endpoint &amp; Infrastructure Engineer</h1>
    <p className="lede">Palm Harbor, FL · 15+ years of enterprise experience designing, managing, and securing multi-tier IT environments for global workforces exceeding 350,000 users.</p>
    <p>Expert in modern endpoint architecture (Microsoft Intune, Workspace ONE, MECM), directory services (Active Directory, Entra ID), and identity governance. Strong background in Tier 3 systems troubleshooting, network protocol diagnosis, and workflow automation.</p>
    <section className="section" aria-labelledby="competencies-title"><h2 id="competencies-title">Core competencies</h2>{competencies.map(([name, tools])=><div key={name}><h3>{name}</h3><p>{tools}</p></div>)}</section>
    <section className="section" aria-labelledby="achievements-title"><h2 id="achievements-title">Selected achievements</h2><ul>{achievements.map(item=><li key={item}>{item}</li>)}</ul></section>
    <section id="experience" className="section" aria-labelledby="experience-title"><h2 id="experience-title">Professional experience</h2>{experience.map(job => <article className="feature-card" key={job.company + "-" + job.period}><h3>{job.role}</h3><p><strong>{job.company}</strong> · {job.location} · {job.period}</p><ul><li>{job.description}</li></ul></article>)}</section>
    <section className="section" aria-labelledby="education-title"><h2 id="education-title">Education &amp; certifications</h2><h3>Bachelor of Science, Business Studies — Computer Information Technology</h3><p>Southern New Hampshire University</p><h3>Associate of Science, Computer Information Technology</h3><p>Everest University</p><p>Google Workspace Professional Administrator · CompTIA A+ · Microsoft Azure Solutions Architect Expert (In Progress)</p></section>
    <section id="tools" className="section" aria-labelledby="tools-title"><h2 id="tools-title">Tools &amp; links</h2><p>Explore my projects, writing, and public code.</p><div className="actions"><Link href="/tools">All tools</Link><Link href="/nexus">Nexus Assistant</Link><Link href="/arcade">Arcade</Link><Link href="/toolbox">Amazing Grace Toolbox</Link><a href="https://www.linkedin.com/in/nicholaimadias/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/NicholaiMadias" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></section>
  </div>;
}

export default ProfilePage;
