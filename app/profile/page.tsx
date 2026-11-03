import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nicholai Maro Madias | Platform Engineer",
  description: "Platform engineering, system architecture, endpoint and identity automation.",
};

const experience = [
  ["Amazing Grace Home Living", "Senior Platform Engineer", "Apr 2026 – Present"],
  ["HCLTech · client: Verizon", "EDN Technical Support Engineer II", "Nov 2025 – Nov 2026"],
  ["Freelance", "Web Developer and Network Administrator", "Nov 2023 – Jan 2025"],
  ["Tandym Group", "Technical Support Engineer II", "Aug 2022 – Oct 2023"],
  ["Infosys · client: Google", "Technical Support Engineer", "Feb 2021 – Apr 2022"],
  ["Allied Universal", "Network & Security Administrator", "Sep 2016 – Feb 2021"],
  ["Nielsen Media Research", "Network Administrator & EVS Support Specialist", "Mar 2011 – Oct 2016"],
];

const responsibilities = [
  ['Administer Active Directory, Windows Server, Group Policy, and endpoint infrastructure.', 'Build PowerShell, Python, JavaScript, and API integrations for learning platforms and operational systems.', 'Develop security, governance, compliance, and reporting solutions.'],
  ['Supported endpoint and mobility services for 70,000+ users and devices.', 'Worked with Workspace ONE UEM, Intune, Entra ID, Active Directory, BeyondTrust, and Lookout Mobile Security.', 'Supported enrollment, authentication, compliance, application deployment, and operational reporting.'],
  ['Developed workflow automation with PowerShell, Python, JavaScript, SQL, and REST APIs.', 'Integrated internal systems with third-party platforms.', 'Built learning management applications and administrative portals.'],
  ['Administered Intune, Google Workspace, Active Directory, Entra ID, Windows Autopilot, and Apple Business Manager.', 'Supported Windows, macOS, iOS, and Android provisioning, compliance, patching, and identity workflows.', 'Created PowerShell automation for deployment and administration.'],
  ['Supported identity and access operations in environments serving 350,000+ users worldwide.', 'Contributed to Microsoft-to-Google migration initiatives affecting 400,000+ accounts.', 'Supported provisioning, authentication, authorization, and identity governance, with expertise in Google Workspace / G Suite Administration, Sites, Apps Script, and Drive API.'],
  ['Administered Active Directory, MECM/SCCM, Windows infrastructure, and endpoint security.', 'Supported vulnerability remediation using Qualys, Rapid7, Tenable, and Tanium.', 'Developed KPI dashboards and reporting for patching, compliance, and endpoint operations.'],
  ['Supported EVS infrastructure across Windows, Linux, UNIX, server, endpoint, and network environments.', 'Troubleshot incidents and supported migrations, infrastructure upgrades, and service improvements.', 'Increased Customer Effort Score by 21% through process optimization and support improvements.'],
];
const skills = [
  ['Endpoint management', 'Workspace ONE UEM · Microsoft Intune · MECM/SCCM · Windows Autopilot · Apple Business Manager · MDM/MAM · Application deployment · Patch management'],
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
    <div className="actions"><a href="https://www.linkedin.com/in/nicholaimadias/">LinkedIn ↗</a><a href="https://github.com/NicholaiMadias">GitHub ↗</a></div>
    <section className="section"><p className="eyebrow">FOCUS AREAS</p><div className="card-grid two"><div className="feature-card"><h2>Platform & identity</h2><p>Workspace ONE, Intune, MECM/SCCM, Active Directory, Entra ID, Google Workspace, IAM, Zero Trust, and endpoint security.</p></div><div className="feature-card"><h2>Automation & systems</h2><p>PowerShell, Python, JavaScript, SQL, REST APIs, dashboards, workflow design, documentation, and local-first web applications.</p></div></div></section>
    <section className="section" aria-labelledby="skills-title"><h2 id="skills-title">Technical skills</h2>{skills.map(([name, tools])=><div key={name}><h3>{name}</h3><p>{tools}</p></div>)}</section>
    <section id="experience" className="section"><p className="eyebrow">EXPERIENCE</p>{experience.map(([company, role, dates], index) => <article className="feature-card" key={company}><h2>{role}</h2><p><strong>{company}</strong> · {dates}</p><ul>{responsibilities[index].map(item=><li key={item}>{item}</li>)}</ul></article>)}</section>
    <section className="section"><h2>Education & professional development</h2><h3>Bachelor of Science, Business Studies — Computer Information Technology</h3><p>Southern New Hampshire University</p><h3>Associate of Science, Computer Information Technology</h3><p>Everest University</p><p>CompTIA Network+ · LinkedIn Learning coursework in AWS and Azure administration.</p><p>G Suite Administration — Infosys course completion, March 31, 2022.</p></section>
  </div>;
}

export default ProfilePage;
