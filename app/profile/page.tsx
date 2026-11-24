import type { Metadata } from "next";
import Link from "next/link";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "Nicholai Maro Madias | Senior Platform Engineer",
  description: "Nicholai Maro Madias is a Senior Platform Engineer focused on Microsoft Intune, Workspace ONE UEM, Entra ID, enterprise endpoint security, and PowerShell/Python automation.",
};

const experience = [
  {
    company: "Amazing Grace Home Living",
    role: "Registered Agent and System Administrator",
    dates: "Apr 2026 – Present",
    summary: "Administer Active Directory, Windows Server, Group Policy, Google Workspace, Firebase, and Google Cloud. Lead RMF hardening and build Copilot workflows and administrative tools with PowerShell, Python, JavaScript, and REST APIs.",
  },
  {
    company: "HCLTech · Client: Verizon",
    role: "EDN Technical Support Engineer II",
    dates: "Jan 2025 – Apr 2026",
    summary: "Supported endpoint and identity platforms across 70,000+ users and devices with Intune, Workspace ONE UEM, and Entra ID. Integrated Copilot APIs into remote support workflows to automate diagnostics.",
  },
  {
    company: "Amazing Grace Home Living",
    role: "Registered Agent and System Administrator",
    dates: "Aug 2023 – Jan 2025",
    summary: "Started part-time in August 2023 and moved to full-time work in October. Managed Windows Server and Google Workspace and automated recurring administration with PowerShell and Python.",
  },
  {
    company: "Tandym Group LLC · Client: Pansophic Learning",
    role: "Technical Support Engineer",
    dates: "Aug 2022 – Oct 2023",
    summary: "Managed zero-touch provisioning with Windows Autopilot and Apple Business Manager. Automated repetitive tasks with PowerShell, reducing downtime by 42% and increasing productivity by 15%.",
  },
  {
    company: "Infosys Limited · Client: Google",
    role: "Technology Analyst",
    dates: "Feb 2021 – Jun 2022",
    summary: "Supported Google Workspace identity and access for over 350,000 users. Migrated more than 400,000 accounts from Microsoft 365 to Google Workspace and built a training portal that helped reduce the engineering backlog by 85%.",
  },
  {
    company: "Allied Universal",
    role: "Security Professional – Unarmed",
    dates: "Oct 2016 – Dec 2021",
    summary: "Managed Milestone CCTV and access control integrations, documented operating procedures, and supported identity administration, vulnerability monitoring, and endpoint remediation.",
  },
  {
    company: "Nielsen Media Research · Oldsmar, FL",
    role: "EVS Encoder Support Specialist",
    dates: "Mar 2011 – Oct 2016",
    summary: "Supported EVS infrastructure on Windows Server, Linux, UNIX, and VMware. Monitored network health and server availability with SolarWinds and documented troubleshooting procedures in BMC Remedy.",
  },
];

const capabilities = [
  { label: "01 — PLATFORM", title: "Endpoint engineering", description: "Keep devices configured, compliant, and ready for the people who depend on them.", tools: "Intune · Workspace ONE UEM · MECM/SCCM · Autopilot · Patching" },
  { label: "02 — IDENTITY", title: "Identity & access", description: "Connect directory services, authentication, and access policies across enterprise environments.", tools: "Active Directory · Entra ID · IAM · RBAC · Conditional Access" },
  { label: "03 — CLOUD", title: "Cloud & infrastructure", description: "Support cloud services and operating systems with practical troubleshooting and platform administration.", tools: "Azure · Google Cloud · AWS · Windows Server · Linux" },
  { label: "04 — SECURITY", title: "Vulnerability operations", description: "Turn findings into prioritized remediation, reliable patching, and clearer security follow-through.", tools: "Qualys · Rapid7 · Tenable · Tanium · Zero Trust" },
  { label: "05 — AUTOMATION", title: "Repeatable workflows", description: "Reduce repetitive administration through scripts, API integrations, and usable runbooks.", tools: "PowerShell · Python · JavaScript · SQL · REST APIs" },
  { label: "06 — OPERATIONS", title: "Find the signal", description: "Trace issues across endpoints, identity, networks, and applications to get teams unstuck.", tools: "DNS · DHCP · VPN · TCP/IP · Reporting · Documentation" },
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
          <p className={styles.eyebrow}>Senior Platform Engineer</p>
          <h1 id="profile-heading">Make complex systems <em>work better.</em></h1>
          <p className={styles.intro}>I’m <strong>Nicholai Maro Madias</strong>, a platform engineer with 15+ years across enterprise endpoints, identity, cloud infrastructure, security, and systems operations. I build endpoint automation and lead Microsoft 365 migrations to Google Workspace.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#experience">Explore my work <span aria-hidden="true">↓</span></a>
            <a className={styles.secondary} href="https://github.com/NicholaiMadias" target="_blank" rel="noreferrer">GitHub profile <span aria-hidden="true">↗</span></a>
            <Link className={styles.secondary} href="/tools/enterprise-endpoint">Endpoint toolkit <span aria-hidden="true">↗</span></Link>
          </div>
          <p className={styles.availability}><span aria-hidden="true" />Palm Harbor, Florida · Open to opportunities</p>
          <nav className={styles.sectionNav} aria-label="Profile sections">
            <a href="#expertise">Expertise</a><a href="#approach">Approach</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
          </nav>
        </div>
        <div className={styles.diagram} role="img" aria-label="Enterprise IT connects identity, endpoints, cloud, security, automation, and operations.">
          <div className={styles.diagramLabel}>Operating model<small>Connected by clear controls</small></div>
          <div className={styles.core}>SECURE<br />BY DESIGN<strong>Enterprise IT</strong></div>
          {["Identity", "Endpoints", "Cloud", "Security", "Automation", "Operations"].map((name, i) => <div className={`${styles.node} ${styles[`node${i + 1}`]}`} key={name}><b>0{i + 1}</b> {name}</div>)}
          <div className={styles.diagramFoot}><span>Identity → device → access</span><span>Policy · visibility · response</span></div>
        </div>
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
        <div className={styles.sectionHead}><p className={styles.eyebrow}>01 / What I work on</p><div><h2 id="expertise-heading">Security and operations, connected.</h2><p>My work sits where endpoints, identity, cloud platforms, and security controls meet. I bring hands-on troubleshooting together with practical automation and documentation.</p></div></div>
        <div className={styles.capabilities}>
          {capabilities.map(cap => <article className={styles.capability} key={cap.label}><div className={styles.capNumber}>{cap.label}</div><h3>{cap.title}</h3><p>{cap.description}</p><div className={styles.tags}>{cap.tools}</div></article>)}
        </div>
      </section>

      <section className={styles.approach} id="approach" aria-labelledby="approach-heading">
        <div className={`${styles.wrap} ${styles.approachGrid}`}>
          <div><p className={styles.eyebrow}>02 / How I approach the work</p><h2 id="approach-heading">Reliable systems start with useful detail.</h2><p>Good infrastructure work makes the next action clear: what changed, where to look, and how to verify that it worked. I bring that discipline to security, support, and automation.</p></div>
          <ol className={styles.principles}>{principles.map(([title, description], i) => <li key={title}><span aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.section} ${styles.career}`} id="experience" aria-labelledby="experience-heading">
        <div><p className={styles.eyebrow}>03 / Experience</p><h2 id="experience-heading">Professional experience</h2><p className={styles.careerIntro}>A career spanning platform operations, enterprise support, software development, network administration, and security.</p></div>
        <div className={styles.timeline}>{experience.map(job => <article className={styles.role} key={job.company + job.dates}><p className={styles.dates}>{job.dates}</p><div><h3>{job.role}</h3><p className={styles.organization}>{job.company}</p><p>{job.summary}</p></div></article>)}</div>
      </section>

      <section className={`${styles.wrap} ${styles.credentials}`} aria-label="Education, engineering focus, and projects">
        <div><p className={styles.eyebrow}>Education</p><h3>B.S. Business Studies · Computer Information Technology</h3><p>Southern New Hampshire University · Aug 2011 – Dec 2013 · Degree conferred Jan 2014</p><h3>A.S. Computer Information Sciences and Support Services</h3><p>Everest University · Apr 2006 – Apr 2008</p></div>
        <div><p className={styles.eyebrow}>Engineering focus</p><ul><li>Enterprise endpoint engineering</li><li>Identity and access management</li><li>PowerShell and Python automation</li></ul></div>
        <div><p className={styles.eyebrow}>Selected engineering work</p><p>Inspect read-only endpoint automation examples, testable privacy engineering prototypes, and written security guidance. Portfolio reference projects are not claims of production deployment or compliance certification.</p><div className={styles.projectLinks}><Link href="/tools/enterprise-endpoint">Endpoint automation toolkit ↗</Link><Link href="/blog/windows-11-intune-cis-powershell-hardening">Windows 11 hardening guide ↗</Link><Link href="/blog/phi-redaction-proxy">PHI redaction reference ↗</Link><Link href="/blog/enterprise-endpoint-toolkit">Toolkit architecture case study ↗</Link></div></div>
      </section>

      <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
        <div className={`${styles.wrap} ${styles.contactInner}`}><p className={styles.eyebrow}>Let’s connect</p><h2 id="contact-heading">Make the next system stronger.</h2><p>For platform engineering, endpoint, infrastructure, or security operations opportunities, reach out by email or connect on LinkedIn.</p><div className={styles.actions}><a className={styles.primary} href="mailto:nicholaimadias@gmail.com">Email Nicholai <span aria-hidden="true">↗</span></a><a className={styles.secondary} href="https://www.linkedin.com/in/nicholaimadias/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a className={styles.secondary} href="tel:+17276213516">(727) 621-3516</a></div></div>
      </section>
    </div>
  );
}

export default ProfilePage;
