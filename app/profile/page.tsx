import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicholai Maro Madias | Senior Endpoint & Infrastructure Engineer",
  description: "Enterprise endpoint, identity, infrastructure, and automation engineering for global workforces.",
};

const experience = [
  {
    company: "Amazing Grace Home Living",
    location: "Remote",
    role: "Senior Platform & Systems Engineer",
    dates: "Mar 2024 – Present",
    bullets: [
      "Administer enterprise-wide identity, access controls, and endpoint infrastructure utilizing Active Directory, Windows Server, and Group Policy.",
      "Architect modern automation upgrade orchestration flows following the MCM → CI/CD pipeline → runner execution sequence to deploy server infrastructure updates.",
      "Build pre-upgrade validation utilities using PowerShell to audit operating system metrics, version compatibility configurations, and storage backup consistency states.",
      "Coordinate rolling high-availability clusters, database failovers, policy governance, security patching, and compliance frameworks across core business systems.",
    ],
  },
  {
    company: "HCLTech (Client: Verizon)",
    location: "Tampa, FL",
    role: "EDN Technical Support Engineer II",
    dates: "Jan 2025 – Apr 2026",
    bullets: [
      "Provided Tier 3 technical support and infrastructure administration for endpoint and mobility ecosystems serving 70,000+ active users.",
      "Managed modern device enrollment, policy configurations, app deployments, and conditional access criteria via Microsoft Intune and Workspace ONE.",
      "Diagnosed and resolved critical networking, authentication, application launch, and endpoint connectivity defects.",
      "Utilized identity tools including Active Directory and Microsoft Entra ID alongside security tools like BeyondTrust and Lookout Mobile Security.",
    ],
  },
  {
    company: "Independent Contracting / Freelance",
    location: "Remote",
    role: "Technical Project & Systems Automation Lead",
    dates: "Oct 2023 – Jan 2025",
    bullets: [
      "Developed robust backend integrations and automated scripts linking external endpoints with business-critical database architectures via REST APIs.",
      "Structured programmatic pipeline setups using GitHub Actions and GitLab Runners to automate site deployments and track configuration patterns.",
      "Conducted advanced environment validation scripts and custom data diagnostic queries.",
    ],
  },
  {
    company: "Tandym (Client: Pansophic Learning)",
    location: "Tampa, FL",
    role: "Operations Program Lead / Systems & Support Engineer",
    dates: "Aug 2022 – Oct 2023",
    bullets: [
      "Headed deep-dive Tier 3 operational troubleshooting and environment pre-checks across complex architectures involving Windows Server, MS SQL Server Always On Availability Groups, VMware, and cloud services.",
      "Led technical triage actions for critical system incidents (P1/P2 bridges), debugging complex network-layer routing anomalies (DNS, TCP/IP, HTTPS).",
      "Managed integration points with third-party vendors, enforcing strict service SLA baselines and defining operational system runbooks.",
    ],
  },
  {
    company: "Infosys (Client: Google)",
    location: "Remote",
    role: "IAM Support Engineer / Technical Support Engineer II",
    dates: "Feb 2021 – Apr 2022",
    bullets: [
      "Handled high-priority globally escalated technical issues across identity management, identity federation (SAML, OIDC), provisioning, RBAC, and boundary control structures.",
      "Contributed core technical execution support during a massive enterprise identity system migration targeting 400,000+ accounts.",
      "Authored and maintained comprehensive structural runbooks and technical training modules for production alignment.",
    ],
  },
  {
    company: "Allied Universal",
    location: "Tampa, FL",
    role: "Network & Security Administrator",
    dates: "Sep 2016 – Feb 2021",
    bullets: [
      "Maintained day-to-day operations of multi-site Active Directory domain controllers, IIS web hosts, and database clusters.",
      "Automated server update sequences, vulnerability remediation targets, and configuration state updates using PowerShell and C#.",
    ],
  },
  {
    company: "Nielsen Media Research",
    location: "Oldsmar, FL",
    role: "Network Administrator / Systems Operations Support Lead",
    dates: "Mar 2011 – Oct 2016",
    bullets: [
      "Selected for full-time Network Administration conversion within 12 months due to technical diagnostic performance across specialized hardware and data logging architectures.",
      "Managed VMware virtualization spaces and core Windows Server infrastructure hosts supporting regional high-availability operations and media logging platforms.",
      "Administered media streaming configurations, specialized EVS Encoder diagnostic logging protocols, and network-layer connectivity patterns across distributed endpoints.",
      "Enforced standard ITIL incident and change control patterns during rolling upgrades and critical system maintenance windows.",
    ],
  },
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

    <section id="experience" className="section" aria-labelledby="experience-title"><h2 id="experience-title">Professional experience</h2>{experience.map(job => <article className="feature-card" key={`${job.company}-${job.dates}`}><h3>{job.role}</h3><p><strong>{job.company}</strong> · {job.location} · {job.dates}</p><ul>{job.bullets.map(item=><li key={item}>{item}</li>)}</ul></article>)}</section>

    <section className="section" aria-labelledby="education-title"><h2 id="education-title">Education &amp; certifications</h2><h3>Bachelor of Science, Business Studies — Computer Information Technology</h3><p>Southern New Hampshire University</p><h3>Associate of Science, Computer Information Technology</h3><p>Everest University</p><p>Google Workspace Professional Administrator · CompTIA A+ · Microsoft Azure Solutions Architect Expert (In Progress)</p></section>

    <section id="tools" className="section" aria-labelledby="tools-title"><h2 id="tools-title">Tools &amp; links</h2><p>Explore my projects, writing, and public code.</p><div className="actions"><Link href="/tools">All tools</Link><Link href="/nexus">Nexus Assistant</Link><Link href="/arcade">Arcade</Link><Link href="/toolbox">Amazing Grace Toolbox</Link><a href="https://www.linkedin.com/in/nicholaimadias/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/NicholaiMadias" target="_blank" rel="noopener noreferrer">GitHub ↗</a></div></section>
  </div>;
}

export default ProfilePage;
