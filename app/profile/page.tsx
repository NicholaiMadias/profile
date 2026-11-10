import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicholai Maro Madias | Senior Engineer & Administrator",
  description: "Senior Endpoint Engineer and Systems Administrator with 15+ years of enterprise IT experience in endpoint management, identity, security, and automation.",
};

// Employment, qualifications, and summary follow the owner-provided résumé.
const experience = [
  {
    "company": "Amazing Grace Home Living",
    "location": "Remote",
    "role": "Senior Platform Engineer",
    "dates": "Oct 2023 – Present",
    "bullets": [
      "Administer Active Directory, Windows Server, Group Policy, and endpoint infrastructure supporting secure and compliant operations.",
      "Develop PowerShell and Python solutions that streamline provisioning, configuration management, and administrative workflows.",
      "Design API integrations and webhook-based processes that improve data synchronization across business systems.",
      "Implement security baselines, access controls, and compliance standards that strengthen operational governance.",
      "Create KPI dashboards and operational reporting that improve visibility into platform performance, endpoint health, and service delivery metrics."
    ]
  },
  {
    "company": "Tandym Group (Client: Pansophic Learning)",
    "location": "Tampa, FL",
    "role": "Technical Support Engineer",
    "dates": "Aug 2022 – Oct 2023",
    "bullets": [
      "Administered Microsoft Intune, Active Directory, Microsoft Entra ID, and Group Policy environments supporting enterprise endpoint management.",
      "Managed Windows Autopilot provisioning, compliance policies, application deployment, device enrollment, and endpoint lifecycle operations.",
      "Supported Apple Business Manager integration and mobile device management for macOS and iOS platforms.",
      "Developed PowerShell deployment solutions that accelerated device provisioning and reduced manual configuration effort.",
      "Improved endpoint compliance, software delivery consistency, and patch management effectiveness through standardized administration practices."
    ]
  },
  {
    "company": "Infosys (Client: Google)",
    "location": "Tampa, FL",
    "role": "Technical Support Engineer",
    "dates": "Feb 2021 – Apr 2022",
    "bullets": [
      "Supported identity and access management operations within an organization serving approximately 350,000 global users.",
      "Managed user provisioning, authentication support, access governance, and identity lifecycle administration.",
      "Supported enterprise migration initiatives while maintaining compliance, security, and access control requirements.",
      "Collaborated with engineering and security teams to resolve complex authentication and authorization issues.",
      "Improved identity management processes through workflow standardization, reporting, and operational improvements."
    ]
  },
  {
    "company": "Allied Universal",
    "location": "Tampa, FL",
    "role": "Network & Security Administrator",
    "dates": "Sep 2016 – Feb 2021",
    "bullets": [
      "Administered enterprise Windows infrastructure, Active Directory services, Group Policy, and endpoint security technologies.",
      "Managed vulnerability remediation initiatives utilizing Qualys, Rapid7, and Tenable security platforms.",
      "Supported SCCM/MECM software deployment, patch management, endpoint configuration, and operational maintenance activities.",
      "Utilized Tanium to improve endpoint visibility, compliance monitoring, software deployment, and asset management.",
      "Produced security KPI reporting that improved visibility into remediation progress, compliance status, and vulnerability trends."
    ]
  },
  {
    "company": "Nielsen Media Research",
    "location": "Oldsmar, FL",
    "role": "Systems Operations Lead / Network Administrator",
    "dates": "Mar 2011 – Oct 2016",
    "bullets": [
      "Administered Windows server infrastructure, endpoint systems, and enterprise applications supporting distributed business operations.",
      "Supported software deployment, infrastructure maintenance, and operational support activities across enterprise environments.",
      "Developed scripting solutions that reduced repetitive administrative tasks and improved operational efficiency.",
      "Troubleshot server, application, network, and infrastructure issues supporting Electronic Verification System operations.",
      "Participated in migration projects and service improvement initiatives that enhanced platform reliability and availability."
    ]
  }
];

const skills = [
  [
    "Unified Endpoint Management",
    "Omnissa Workspace ONE UEM · Microsoft Intune · SCCM/MECM · Windows Autopilot · Apple Business Manager · Mobile Device Management (MDM) · Unified Endpoint Management (UEM) · Application Deployment · Software Packaging · Device Enrollment · Configuration Profiles · Compliance Policies · Patch Management · OS Deployment · Co-Management and Compliance"
  ],
  [
    "Identity, Security and Access Management",
    "Active Directory · Microsoft Entra ID · Group Policy (GPO) · Conditional Access · RBAC · Identity Governance · Zero Trust · Lookout Mobile Security · Endpoint Security · Vulnerability Management · Patch Management · Compliance Enforcement · Qualys · Rapid7 · Tenable"
  ],
  [
    "Automation & Reporting",
    "PowerShell · Python · Bash · REST APIs · SQL · KPI Dashboards · Firebase · Provisioning"
  ],
  [
    "Service Management",
    "ServiceNow · BeyondTrust · Jira · Agile/Scrum · Root Cause Analysis · Change Management"
  ],
  [
    "Platforms",
    "Linux · Windows 10/11 · Windows Server · Microsoft 365 · Apple · macOS · iOS · Android · UNIX · GCP"
  ]
];

export function ProfilePage() {
  return (
    <div className="container page narrow professional-profile">
      <h1>Nicholai Maro Madias</h1>
      <p className="lede">Senior Engineer | Administrator</p>
      <p>Palm Harbor, FL 34683 · <a href="tel:+17276213516">(727) 621-3516</a> · <a href="mailto:nicholaimadias@gmail.com">nicholaimadias@gmail.com</a></p>
      <div className="actions">
        <a href="https://www.linkedin.com/in/nicholaimadias/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href="https://github.com/NicholaiMadias" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </div>

      <section className="section" aria-labelledby="summary-title">
        <h2 id="summary-title">Professional summary</h2>
        <p>Senior Endpoint Engineer and Systems Administrator with 15+ years of enterprise IT experience supporting endpoint management, unified endpoint management (UEM), identity services, endpoint security, and infrastructure operations. Expertise in Omnissa Workspace ONE UEM, Microsoft Intune, SCCM/MECM, Active Directory, Microsoft Entra ID, PowerShell automation, SQL reporting, and mobile device management.</p>
        <p>Proven success supporting enterprise environments ranging from departmental organizations to global enterprises serving more than 350,000 users. Experienced driving endpoint compliance, device lifecycle management, platform migrations, mobile security, KPI reporting, process automation, and continuous improvement initiatives across Windows, macOS, and iOS environments.</p>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <h2 id="skills-title">Technical skills</h2>
        {skills.map(([name, tools]) => <div key={name}><h3>{name}</h3><p>{tools}</p></div>)}
      </section>

      <section id="experience" className="section" aria-labelledby="experience-title">
        <h2 id="experience-title">Professional experience</h2>
        {experience.map(job => (
          <article className="feature-card" key={`${job.company}-${job.dates}`}>
            <h3>{job.role}</h3>
            <p><strong>{job.company}</strong>{job.location && ` · ${job.location}`} · {job.dates}</p>
            <ul>{job.bullets.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="section" aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        <h3>Bachelor of Science, Business Studies — Computer Information Technology</h3>
        <p>Southern New Hampshire University · 2014</p>
        <h3>Associate of Science, Computer Information Technology</h3>
        <p>Everest University · 2008</p>
      </section>

      <section className="section" aria-labelledby="certifications-title">
        <h2 id="certifications-title">Certifications</h2>
        <ul>
          <li>CompTIA A+</li>
          <li>Google Workspace Professional Administrator</li>
          <li>Microsoft Azure Solutions Architect Expert</li>
        </ul>
      </section>

      <section id="tools" className="section" aria-labelledby="tools-title">
        <h2 id="tools-title">Tools &amp; links</h2>
        <p>Explore my projects, writing, and public code.</p>
        <div className="actions">
          <Link href="/tools">All tools</Link>
          <Link href="/nexus">Nexus Assistant</Link>
          <Link href="/arcade">Arcade</Link>
          <Link href="/toolbox">Amazing Grace Toolbox</Link>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
