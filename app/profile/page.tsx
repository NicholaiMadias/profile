import type { Metadata } from "next";
import Link from "next/link";
import styles from "./profile.module.css";

const title = "Nicholai Maro Madias | Senior Platform Engineer";
const description = "Senior Platform Engineer with experience in Microsoft 365 to Google Workspace migration, Google Sheets, Apps Script, VBA conversion, and enterprise automation.";
const preview = {
  url: "/portfolio-preview.png",
  width: 1200,
  height: 630,
  alt: "Nicholai Maro Madias, Senior Platform Engineer",
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "Nicholai.online",
    images: [preview],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [preview],
  },
};

const selectedWork = [
  {
    href: "/tools/enterprise-endpoint",
    title: "Enterprise Endpoint Automation Toolkit",
    summary: "Read-only Intune and Workspace ONE inventory examples in PowerShell and Python.",
  },
  {
    href: "/blog/windows-11-intune-cis-powershell-hardening",
    title: "Windows 11 hardening with Intune",
    summary: "Audit-first baselines, drift checks, and rollback guidance.",
  },
  {
    href: "/blog/phi-redaction-proxy",
    title: "Python PHI redaction prototype",
    summary: "A reference design for removing patient identifiers before LLM API calls.",
  },
  {
    href: "/blog/enterprise-endpoint-toolkit",
    title: "Endpoint toolkit architecture",
    summary: "A case study on inventory collection, API pagination, and testing.",
  },
];

const experience = [
  {
    company: "Amazing Grace Home Living",
    role: "Registered Agent and System Administrator",
    dates: "Apr 2026 – Present",
    summary: "Support Microsoft 365 to Google Workspace migration and administer Active Directory, Windows Server, Group Policy, Google Workspace, Firebase, and Google Cloud. Lead RMF hardening and build Copilot workflows and administrative tools with PowerShell, Python, JavaScript, and REST APIs.",
  },
  {
    company: "HCLTech · Client: Verizon",
    role: "EDN Technical Support Engineer II",
    dates: "Jan 2025 – Apr 2026",
    summary: "Supported Microsoft 365 to Google Workspace migration and endpoint and identity platforms across 70,000+ users and devices with Intune, Workspace ONE UEM, and Entra ID. Integrated Copilot APIs into remote support workflows to automate diagnostics.",
  },
  {
    company: "Amazing Grace Home Living",
    role: "Registered Agent and System Administrator",
    dates: "Aug 2023 – Jan 2025",
    summary: "Managed permissions in Active Directory and Google Workspace, enforced Windows configuration standards through Group Policy, and automated recurring administration with PowerShell and Python.",
  },
  {
    company: "Tandym Group LLC · Client: Pansophic Learning",
    role: "Technical Support Engineer",
    dates: "Aug 2022 – Oct 2023",
    summary: "Managed zero-touch provisioning with Windows Autopilot and Apple Business Manager. Automated support tasks with PowerShell, reducing downtime by 42%.",
  },
  {
    company: "Infosys Limited · Client: Google",
    role: "Technology Analyst",
    dates: "Feb 2021 – Jun 2022",
    summary: "Configured mail routing and domains for a migration of more than 400,000 accounts from Microsoft 365 to Google Workspace. Built a training portal that helped reduce the engineering backlog by 85%.",
  },
  {
    company: "Allied Universal",
    role: "Security Professional",
    dates: "Oct 2016 – Dec 2021",
    summary: "Managed Milestone CCTV and access control integrations. Documented incidents and procedures, reviewed facility access, and coordinated maintenance with vendors.",
  },
  {
    company: "Nielsen Media Research · Oldsmar, FL",
    role: "EVS Encoder Support Specialist",
    dates: "Mar 2011 – Oct 2016",
    summary: "Supported EVS infrastructure on Windows Server, Linux, UNIX, and VMware. Managed network firewalls, monitored availability with SolarWinds, and documented troubleshooting procedures in BMC Remedy.",
  },
];

const capabilities = [
  { label: "WORKSPACE", title: "Google Workspace migration & automation", description: "Support migrations and spreadsheet automation with documented, maintainable solutions.", tools: "Google Sheets · Apps Script · Excel VBA · JavaScript · Workspace APIs" },
  { label: "PLATFORM", title: "Endpoint engineering", description: "Keep devices configured, compliant, and ready for the people who depend on them.", tools: "Intune · Workspace ONE UEM · MECM/SCCM · Autopilot · Patching" },
  { label: "IDENTITY", title: "Identity & access", description: "Connect directory services, authentication, and access policies across enterprise environments.", tools: "Active Directory · Entra ID · IAM · RBAC · Conditional Access" },
  { label: "CLOUD", title: "Cloud & infrastructure", description: "Support cloud services and operating systems with practical troubleshooting and platform administration.", tools: "Azure · Google Cloud · AWS · Windows Server · Linux" },
  { label: "SECURITY", title: "Vulnerability operations", description: "Turn findings into prioritized remediation, reliable patching, and clearer security follow-through.", tools: "Qualys · Rapid7 · Tenable · Tanium · Zero Trust" },
  { label: "AUTOMATION", title: "Repeatable workflows", description: "Reduce repetitive administration through scripts, API integrations, and usable runbooks.", tools: "PowerShell · Python · JavaScript · SQL · REST APIs" },
  { label: "OPERATIONS", title: "Find the signal", description: "Trace issues across endpoints, identity, networks, and applications to get teams unstuck.", tools: "DNS · DHCP · VPN · TCP/IP · Reporting · Documentation" },
];

const principles = [
  ["Trace before changing", "Use logs, evidence, and operational context to narrow the problem before adjusting controls."],
  ["Make the secure path supportable", "Build policy and configuration with maintainability and user impact in view."],
  ["Automate the repeatable", "Turn recurring steps into scripts and runbooks that another operator can follow."],
  ["Close the loop", "Document outcomes and confirm the fix across the relevant systems and teams."],
];

export function ProfilePage() {
  return (
    <div className={styles.portfolio}>
      <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="profile-heading">
        <div>
          <p className={styles.eyebrow}>Nicholai Maro Madias</p>
          <h1 id="profile-heading">Senior Platform <em>Engineer</em></h1>
          <p className={styles.intro}>I support Microsoft 365 to Google Workspace migrations and build automation across enterprise platforms. At Infosys, I configured mail routing and domains for a migration spanning more than 400,000 accounts. My skills include Google Sheets, Apps Script, Excel VBA conversion, JavaScript, and Workspace APIs.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#experience">View experience</a>
            <a className={styles.secondary} href="#contact">Contact Nicholai</a>
            <a className={styles.secondary} href="https://github.com/NicholaiMadias">GitHub profile</a>
          </div>
          <p className={styles.availability}><span aria-hidden="true" />Palm Harbor, Florida · Open to opportunities</p>
          <nav className={styles.sectionNav} aria-label="Profile sections">
            <a href="#expertise">Expertise</a>
            <a href="#approach">Approach</a>
            <a href="#education">Education</a>
          </nav>
        </div>
        <section className={styles.work} id="work" aria-labelledby="work-heading">
          <h2 id="work-heading">Selected engineering work</h2>
          <ul>
            {selectedWork.map(project => (
              <li key={project.href}>
                <h3><Link href={project.href} prefetch={false}>{project.title}</Link></h3>
                <p>{project.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      </section>

      <div className={styles.strip}>
        <dl className={`${styles.wrap} ${styles.metrics}`}>
          <div><dt>Experience</dt><dd>15+ years in enterprise IT</dd></div>
          <div><dt>HCLTech · Verizon</dt><dd>70,000+ users and devices</dd></div>
          <div><dt>Infosys · Google</dt><dd>350,000+ users supported</dd></div>
          <div><dt>Automation</dt><dd>PowerShell · Python · APIs</dd></div>
        </dl>
      </div>

      <section className={`${styles.wrap} ${styles.section}`} id="expertise" aria-labelledby="expertise-heading">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>Expertise</p><div><h2 id="expertise-heading">Security and operations, connected.</h2><p>My work sits where endpoints, identity, cloud platforms, and security controls meet. I bring hands-on troubleshooting together with practical automation and documentation.</p></div></div>
        <div className={styles.capabilities}>
          {capabilities.map(cap => <article className={styles.capability} key={cap.label}><div className={styles.capNumber}>{cap.label}</div><h3>{cap.title}</h3><p>{cap.description}</p><div className={styles.tags}>{cap.tools}</div></article>)}
        </div>
      </section>

      <section className={styles.approach} id="approach" aria-labelledby="approach-heading">
        <div className={`${styles.wrap} ${styles.approachGrid}`}>
          <div><p className={styles.eyebrow}>Approach</p><h2 id="approach-heading">Reliable systems start with useful detail.</h2><p>Good infrastructure work makes the next action clear: what changed, where to look, and how to verify that it worked. I bring that discipline to security, support, and automation.</p></div>
          <ol className={styles.principles}>{principles.map(([title, description], i) => <li key={title}><span aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.section} ${styles.career}`} id="experience" aria-labelledby="experience-heading">
        <div><p className={styles.eyebrow}>Experience</p><h2 id="experience-heading">Professional experience</h2><p className={styles.careerIntro}>A career spanning platform operations, enterprise support, software development, network administration, and security.</p></div>
        <div className={styles.timeline}>{experience.map(job => <article className={styles.role} key={job.company + job.dates}><p className={styles.dates}>{job.dates}</p><div><h3>{job.role}</h3><p className={styles.organization}>{job.company}</p><p>{job.summary}</p></div></article>)}</div>
      </section>

      <section className={`${styles.wrap} ${styles.credentials}`} id="education" aria-labelledby="education-heading">
        <h2 id="education-heading">Education</h2>
        <div>
          <h3>B.S. Business Studies · Computer Information Technology</h3>
          <p>Southern New Hampshire University · January 2014</p>
        </div>
        <div>
          <h3>A.S. Computer Information Sciences and Support Services</h3>
          <p>Everest University · April 2008</p>
        </div>
      </section>

      <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
        <div className={`${styles.wrap} ${styles.contactInner}`}><p className={styles.eyebrow}>Let’s connect</p><h2 id="contact-heading">Contact Nicholai</h2><p>For platform engineering, endpoint, infrastructure, or security operations opportunities, reach out by email or connect on LinkedIn.</p><div className={styles.actions}><a className={styles.primary} href="mailto:nicholaimadias@gmail.com">Email Nicholai</a><a className={styles.secondary} href="https://www.linkedin.com/in/nicholaimadias/" target="_blank" rel="noreferrer">LinkedIn</a><a className={styles.secondary} href="tel:+17276213516">(727) 621-3516</a></div></div>
      </section>
    </div>
  );
}

export default ProfilePage;
