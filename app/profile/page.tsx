import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nicholai Madias | Platform Engineer & Systems Administrator",
  description: "Platform Engineer and Systems Administrator with 15+ years of experience in enterprise infrastructure, endpoint engineering, identity, automation, and technical operations.",
};

// Employment, qualifications, and summary follow the owner-provided résumé.
const experience = [
  {
    company: "Amazing Grace Home Living (Freelance)",
    location: "Palm Harbor, FL",
    role: "Platform Engineer",
    dates: "Apr 2026 – Present",
    bullets: [
      "Administer Active Directory, Windows Server, Group Policy, and endpoint infrastructure.",
      "Develop PowerShell, Python, JavaScript, and REST API automation supporting business operations.",
      "Implement governance, compliance, security, and access-control standards.",
      "Create KPI dashboards and operational reporting to improve decision making.",
      "Build custom integrations for learning platforms, web applications, and administrative systems.",
      "Reduce manual administrative workload through automation and workflow optimization."
    ]
  },
  {
    company: "HCLTech (Client: Verizon)",
    location: "Hybrid",
    role: "EDN Technical Support Engineer II",
    dates: "Nov 2025 – Nov 2026",
    bullets: [
      "Supported enterprise workstation and mobile-device provisioning using VZImage and PowerShell.",
      "Administered Workspace ONE UEM and Microsoft Intune for endpoint enrollment, compliance, and application deployment.",
      "Supported Lookout Mobile Security administration and troubleshooting.",
      "Resolved endpoint, authentication, mobility, and infrastructure incidents using ServiceNow and BeyondTrust.",
      "Created operational documentation and reporting to improve service delivery.",
      "Analyzed KPI trends and recurring incidents to identify process improvements."
    ]
  },
  {
    company: "Freelance",
    location: "Palm Harbor, FL",
    role: "Web Developer and Network Administrator",
    dates: "Nov 2023 – Jan 2025",
    bullets: [
      "Developed web applications and workflow automation tools using JavaScript and REST APIs.",
      "Built integrations between business systems and cloud services.",
      "Automated business processes to improve efficiency and reduce operational overhead.",
      "Managed deployments, source control, application support, and documentation.",
      "Improved reliability through process standardization and technical enhancements."
    ]
  },
  {
    company: "Tandym Group (Client: IAGG)",
    location: "Remote",
    role: "Technical Support Engineer II",
    dates: "Aug 2022 – Oct 2023",
    bullets: [
      "Supported identity and access management environments, including Active Directory and AWS.",
      "Developed PowerShell automation scripts to improve operational efficiency.",
      "Managed incidents, requests, and operational activities through ServiceNow and Microsoft Teams.",
      "Conducted support-metrics reviews and process-improvement initiatives.",
      "Assisted with authentication, account management, and infrastructure troubleshooting.",
      "Automated recurring administration tasks to reduce manual support effort and improve consistency."
    ]
  },
  {
    company: "Infosys (Client: Google)",
    location: "Hybrid",
    role: "Technical Support Engineer",
    dates: "Feb 2021 – Apr 2022",
    bullets: [
      "Supported Google Enterprise customers using Google Cloud Platform, Workspace Admin Console, Drive API, Kubernetes, Docker, Chromebooks, ChromeOS, and Google Classroom.",
      "Supported SLA compliance through training resources, effective triage, and issue resolution.",
      "Collaborated with engineering and customer-success teams on complex customer issues.",
      "Developed technical training programs covering Google Drive, Chrome, and troubleshooting.",
      "Improved team readiness with training and troubleshooting materials."
    ]
  },
  {
    company: "Allied Universal",
    location: "Tampa, FL",
    role: "Network Administrator",
    dates: "Oct 2016 – Feb 2021",
    bullets: [
      "Led migration strategy from legacy analog systems to Cisco Unified Communications Manager (CUCM).",
      "Designed network-security controls using Cisco ISE and Azure Active Directory.",
      "Supported enterprise endpoint security and infrastructure operations.",
      "Investigated network, server, and application issues through troubleshooting and log analysis.",
      "Created technical documentation and operating procedures for support teams.",
      "Modernized communications infrastructure through CUCM migration initiatives and strengthened access controls."
    ]
  },
  {
    company: "Nielsen",
    location: "Oldsmar, FL",
    role: "EVS Encoder Support Specialist",
    dates: "Mar 2011 – Oct 2016",
    bullets: [
      "Supported Electronic Verification System infrastructure across Windows, Linux, UNIX, server, endpoint, and network environments.",
      "Troubleshot encoder, application, server, and network incidents.",
      "Supported infrastructure upgrades, software deployments, and migration projects.",
      "Developed scripts and macros to reduce repetitive administrative work.",
      "Designed and maintained an internal training website and trained technical staff.",
      "Created onboarding resources and troubleshooting documentation to improve technician readiness and resolution times."
    ]
  }
];

const skills = [
  [
    "Endpoint & Device Management",
    "Workspace ONE UEM · Microsoft Intune · VZImage · Lookout Mobile Security · Mobile Device Management · Endpoint Enrollment · Compliance · Application Deployment · PowerShell"
  ],
  [
    "Identity, Infrastructure & Security",
    "Active Directory · Microsoft Entra ID / Azure Active Directory · Group Policy · Windows Server · AWS · Google Cloud Platform · Cisco ISE · Network Administration · ServiceNow · BeyondTrust"
  ],
  [
    "Development & Automation",
    "PowerShell · Python · JavaScript · REST APIs · SQL Reporting · KPI Dashboards · Workflow Automation · Google Drive API"
  ],
  [
    "Platforms & Operations",
    "Windows · Linux · UNIX · Google Workspace · Microsoft 365 · Kubernetes · Docker · ChromeOS · Chromebooks · Google Classroom · Jira"
  ]
];

export function ProfilePage() {
  return (
    <div className="container page narrow professional-profile">
      <h1>Nicholai Maro Madias</h1>
      <p className="lede">Platform Engineer &amp; Systems Administrator</p>
      <p>Palm Harbor, FL 34683 · <a href="tel:+17276213516">(727) 621-3516</a> · <a href="mailto:nicholaimadias@gmail.com">nicholaimadias@gmail.com</a></p>
      <div className="actions">
        <a href="https://www.linkedin.com/in/nicholaimadias/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href="https://github.com/NicholaiMadias" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </div>

      <section className="section" aria-labelledby="summary-title">
        <h2 id="summary-title">Professional summary</h2>
        <p>Platform Engineer and Systems Administrator with 15+ years of experience supporting enterprise infrastructure, endpoint engineering, identity and access management, mobile device management, automation, and technical operations. Experienced with Workspace ONE UEM, Microsoft Intune, Active Directory, Entra ID, Google Workspace, PowerShell, Python, and REST API integrations.</p>
        <p>Background includes endpoint compliance, administrative automation, operational reporting, enterprise migrations, identity management, and large-scale user support. Served Google users in environments supporting more than 350,000 people worldwide.</p>
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
        <h3>Information Technology</h3>
        <p>Southern New Hampshire University · 2014</p>
        <h3>Computer Networking</h3>
        <p>Everest University · 2009</p>
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
