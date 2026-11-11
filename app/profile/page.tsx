import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicholai Madias | Software Engineer",
  description: "Software engineer with 15+ years of enterprise technology experience and 5+ years of software development, automation, cloud platform, and systems integration experience.",
};

// Employment, qualifications, and summary follow the owner-provided résumé.
const experience = [
  {
    "company": "Amazing Grace Home Living",
    "role": "Senior Platform Engineer",
    "dates": "Apr 2026 – Present",
    "bullets": [
      "Develop backend automation and integration solutions utilizing Python, JavaScript, Kotlin, Golang, SQL, PowerShell, and REST APIs.",
      "Utilize Git and GitHub for source control, code management, and collaborative development.",
      "Design cloud-based business applications, AI-enabled solutions, and workflow automation platforms.",
      "Build integrations between LMS platforms, databases, cloud services, and third-party APIs.",
      "Develop KPI dashboards, analytics solutions, reporting systems, and administrative portals.",
      "Support Linux and Windows environments for application deployment and administration.",
      "Implement governance, security, compliance, and access-control standards."
    ]
  },
  {
    "company": "HCLTech (Verizon)",
    "role": "EDN Technical Support Engineer II",
    "dates": "Jan 2025 – Apr 2026",
    "bullets": [
      "Supported enterprise mobility, cloud, and endpoint environments serving more than 70,000 users and devices.",
      "Administered Microsoft Intune, Workspace ONE, Entra ID, Active Directory, BeyondTrust, and enterprise security platforms.",
      "Supported AWS, Azure, GCP, virtual machines, servers, workstations, and cloud-hosted infrastructure.",
      "Troubleshot networking, authentication, operating systems, cloud services, and enterprise applications across Windows, Linux, macOS, and UNIX.",
      "Created technical documentation and operational procedures improving support efficiency and service delivery."
    ]
  },
  {
    "company": "IAGG Investments",
    "role": "Software Developer (Freelance)",
    "dates": "Oct 2023 – Jan 2025",
    "bullets": [
      "Developed backend applications, workflow automation solutions, and API integrations utilizing Python, JavaScript, SQL, and REST technologies.",
      "Designed and implemented integrations between cloud platforms, databases, and business applications.",
      "Utilized Git for source control, testing, deployment, and release management.",
      "Built reporting platforms, administrative portals, and learning management solutions.",
      "Reduced manual effort through scalable business-process automation.",
      "Collaborated with stakeholders to gather requirements and deliver software solutions."
    ]
  },
  {
    "company": "Tandym Group",
    "role": "Technical Support Engineer II",
    "dates": "Aug 2022 – Oct 2023",
    "bullets": [
      "Administered Microsoft Intune, Active Directory, Entra ID, Google Workspace, Windows Autopilot, and Apple Business Manager.",
      "Managed provisioning, identity lifecycle operations, compliance, enrollment, and patching.",
      "Developed PowerShell automation improving deployment and support processes.",
      "Zero Trust initiatives through MFA, Conditional Access, least-privilege administration, and device compliance.",
      "Supported enterprise Windows, macOS, iOS, and Android environments."
    ]
  },
  {
    "company": "Infosys (Google)",
    "role": "Technical Support Engineer II",
    "dates": "Feb 2021 – Apr 2022",
    "bullets": [
      "Supported identity and access management operations for over 350,000 users globally.",
      "Developed automation solutions utilizing Java, Python, SQL, REST APIs, and Git.",
      "Utilized Google Cloud Platform (GCP) services to support engineering operational initiatives integrating Kubernetes, Docker, Gmail API, Google Drive API and Vector.",
      "Supported cloud-hosted applications and services running within Google App Engine.",
      "Served as Subject Matter Expert (SME) for Salesforce Vector during Google's enterprise migration from Salesforce Classic.",
      "Supported migration readiness, user enablement, adoption, troubleshooting, training, and post-migration operations for a global user community exceeding 350,000 users.",
      "Served as a migration escalation resource, partnering with engineering, operations, and business stakeholders to resolve platform issues and minimize business disruption.",
      "Assisted with integrations between Salesforce Vector, Google Workspace, internal applications, and API-driven business processes.",
      "Participated in troubleshooting and operational support of Docker and Kubernetes.",
      "Performed Linux administration and command-line troubleshooting.",
      "Supported migration initiatives impacting more than 400,000 user accounts across Google's productivity and identity platforms."
    ]
  },
  {
    "company": "Allied Universal",
    "role": "Network & Security Administrator",
    "dates": "Sep 2016 – Feb 2021",
    "bullets": [
      "Administered Active Directory, MECM/SCCM, endpoint security platforms, Windows infrastructure, and vulnerability-management initiatives.",
      "Led remediation efforts utilizing Qualys, Rapid7, Tenable, and Tanium.",
      "Managed software deployment, patch management, compliance initiatives, and lifecycle operations.",
      "Developed executive reporting, operational dashboards, and compliance solutions.",
      "Improved organizational security posture and operational effectiveness."
    ]
  },
  {
    "company": "Nielsen Media Research",
    "role": "Network Administrator / EVS Encoder Support Specialist",
    "dates": "Mar 2011 – Oct 2016",
    "bullets": [
      "Supported Electronic Verification System (EVS) infrastructure across Windows, Linux, UNIX, networking, server, and endpoint environments.",
      "Administered server infrastructure supporting media monitoring and validation systems.",
      "Performed upgrades, migrations, troubleshooting, monitoring, and system optimization.",
      "Collaborated with engineering teams to resolve complex technical issues.",
      "Increased Customer Effort Score (CES) by 21% through operational improvements."
    ]
  }
];

const skills = [
  [
    "Programming Languages",
    "Java, Python, Kotlin, Golang, JavaScript, SQL, PowerShell"
  ],
  [
    "Software Engineering",
    "Git, GitHub, Object-Oriented Programming, Backend Development, REST APIs, API Integrations, SDLC, Agile, CI/CD, Workflow Automation, System Integration, Application Support"
  ],
  [
    "Cloud & DevOps",
    "Google Cloud Platform (GCP), Google App Engine, AWS, Azure, Docker, Kubernetes, Cloud Infrastructure, Virtual Machines"
  ],
  [
    "Operating Systems",
    "Linux, UNIX, Windows Server, Windows 11, macOS"
  ],
  [
    "Enterprise Platforms",
    "Salesforce Vector, Salesforce Classic, Google Workspace, Microsoft 365, Microsoft Intune, Workspace ONE UEM, MECM/SCCM"
  ],
  [
    "Identity & Security",
    "Active Directory, Microsoft Entra ID, IAM, RBAC, MFA, SSO, Conditional Access, Zero Trust"
  ],
  [
    "Automation & Reporting",
    "Python, PowerShell, SQL, Dashboard Development, KPI Reporting, Process Automation"
  ]
];

export function ProfilePage() {
  return (
    <div className="container page narrow professional-profile">
      <h1>Nicholai Maro Madias</h1>
      <p className="lede">Software Engineer</p>
      <p>Palm Harbor, FL 34683 · <a href="tel:+17276213516">(727) 621-3516</a> · <a href="mailto:nicholaimadias@gmail.com">nicholaimadias@gmail.com</a></p>
      <div className="actions">
        <a href="https://www.linkedin.com/in/nicholaimadias/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href="https://github.com/NicholaiMadias" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </div>

      <section className="section" aria-labelledby="summary-title">
        <h2 id="summary-title">Professional summary</h2>
        <p>Software Engineer with 15+ years of enterprise technology experience and 5+ years of software development, automation, cloud platform, and systems integration experience. Developed backend applications, workflow automation, API integrations, and cloud-hosted services for enterprise environments supporting more than 350,000 users.</p>
        <p>Experienced with Java, Python, Kotlin, Go, Linux, Google Cloud Platform, App Engine, Docker, Kubernetes, REST APIs, Salesforce, SQL, and enterprise identity platforms.</p>
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
            <p><strong>{job.company}</strong> · {job.dates}</p>
            <ul>{job.bullets.map(item => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </section>

      <section className="section" aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        <h3>Bachelor of Science, Business Studies — Computer Information Technology</h3>
        <p>Southern New Hampshire University · 2014</p>
        <h3>Associate of Science, Computer Information Technology</h3>
        <p>Everest University · 2009</p>
      </section>

      <section className="section" aria-labelledby="certifications-title">
        <h2 id="certifications-title">Certifications</h2>
        <ul>
          <li>Microsoft Azure Solutions Architect Expert</li>
          <li>Google Workspace Professional Administrator</li>
          <li>CompTIA A+</li>
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
