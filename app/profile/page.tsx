import type { Metadata } from "next";
import Link from "next/link";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "Nicholai Madias | Senior Platform Engineer",
  description: "Nicholai Maro Madias is a Senior Platform Engineer focused on Microsoft Intune, Workspace ONE UEM, Entra ID, enterprise endpoint security, and PowerShell/Python automation.",
};

// Employment follows the owner-provided résumé, with HCLTech dates and
// employer-specific scale confirmed against Indeed by the owner.
const experience = [
  {
    company: "Amazing Grace Home Living",
    role: "Senior Platform Engineer",
    dates: "Apr 2026 – Present",
    summary: "Build cloud applications, workflow automation, API integrations, reporting dashboards, and administrative tools. Support Windows and Linux environments with attention to access controls, governance, and maintainability.",
  },
  {
    company: "HCLTech · Client: Verizon",
    role: "EDN Technical Support Engineer II",
    dates: "Jan 2025 – Apr 2026",
    summary: "Supported endpoint and mobility operations in an environment serving 70,000 employees and users. Administered Microsoft Intune, Workspace ONE UEM, Entra ID, Active Directory, and BeyondTrust; troubleshot networking, authentication, cloud services, and enterprise applications.",
  },
  {
    company: "IAGG Investments",
    role: "Software Developer · Freelance",
    dates: "Oct 2023 – Jan 2025",
    summary: "Developed applications, reporting tools, and business workflows with Python, JavaScript, SQL, and REST APIs. Connected cloud platforms, databases, and business applications, using Git for source control and release management.",
  },
  {
    company: "Tandym Group · Client: Pansophic Learning",
    role: "Technical Support Engineer II",
    dates: "Aug 2022 – Oct 2023",
    summary: "Administered Intune, Active Directory, Entra ID, Google Workspace, Windows Autopilot, and Apple Business Manager. Automated provisioning and deployment with PowerShell, supporting device compliance, patching, MFA, and Conditional Access.",
  },
  {
    company: "Infosys · Client: Google",
    role: "Technical Support Engineer II",
    dates: "Feb 2021 – Apr 2022",
    summary: "Supported identity and access operations and enterprise platform migrations in an environment serving 350,000 users. Worked with Google Workspace, GCP, Salesforce Vector, Python, SQL, and REST APIs; supported migration readiness, troubleshooting, user enablement, and technical runbooks.",
  },
  {
    company: "Allied Universal · Tampa, FL",
    role: "Network & Security Administrator",
    dates: "Sep 2016 – Feb 2021",
    summary: "Administered Windows infrastructure, Active Directory, MECM/SCCM, software deployment, and endpoint security. Coordinated vulnerability remediation with Qualys, Rapid7, Tenable, and Tanium, supported by operational dashboards and compliance reporting.",
  },
  {
    company: "Nielsen Media Research · Oldsmar, FL",
    role: "Network Administrator / EVS Encoder Support Specialist",
    dates: "Mar 2011 – Oct 2016",
    summary: "Supported Electronic Verification System infrastructure across Windows, Linux, UNIX, networking, servers, and endpoints. Performed upgrades, migrations, monitoring, and troubleshooting, working with engineering teams to resolve complex technical issues.",
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
          <p className={styles.intro}>I’m <strong>Nicholai Maro Madias</strong>, a platform engineer with 15+ years across enterprise endpoints, identity, cloud infrastructure, security, and systems operations. I turn complicated technical environments into systems teams can support with confidence.</p>
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
          <div><dt>HCLTech · Verizon</dt><dd>70,000-user environment</dd></div>
          <div><dt>Infosys · Google</dt><dd>350,000-user environment</dd></div>
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
        <div><p className={styles.eyebrow}>03 / Experience</p><h2 id="experience-heading">Built across the stack.</h2><p className={styles.careerIntro}>A career spanning platform operations, enterprise support, software development, network administration, and security.</p></div>
        <div className={styles.timeline}>{experience.map(job => <article className={styles.role} key={job.company}><p className={styles.dates}>{job.dates}</p><div><h3>{job.role}</h3><p className={styles.organization}>{job.company}</p><p>{job.summary}</p></div></article>)}</div>
      </section>

      <section className={`${styles.wrap} ${styles.credentials}`} aria-label="Education, certifications, and projects">
        <div><p className={styles.eyebrow}>Education</p><h3>B.S. Business Studies · Computer Information Technology</h3><p>Southern New Hampshire University · 2014</p><h3>A.S. Computer Information Technology</h3><p>Everest University</p></div>
        <div><p className={styles.eyebrow}>Certifications</p><ul><li>Microsoft Azure Solutions Architect Expert</li><li>Google Workspace Professional Administrator</li><li>CompTIA A+</li></ul></div>
        <div><p className={styles.eyebrow}>Selected engineering work</p><p>Inspect read-only endpoint automation examples, testable privacy engineering prototypes, and written security guidance. Portfolio reference projects are not claims of production deployment or compliance certification.</p><div className={styles.projectLinks}><Link href="/tools/enterprise-endpoint">Endpoint automation toolkit ↗</Link><Link href="/blog/windows-11-intune-cis-powershell-hardening">Windows 11 hardening guide ↗</Link><Link href="/blog/phi-redaction-proxy">PHI redaction reference ↗</Link><Link href="/blog/enterprise-endpoint-toolkit">Toolkit architecture case study ↗</Link></div></div>
      </section>

      <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
        <div className={`${styles.wrap} ${styles.contactInner}`}><p className={styles.eyebrow}>Let’s connect</p><h2 id="contact-heading">Make the next system stronger.</h2><p>For platform engineering, endpoint, infrastructure, or security operations opportunities, reach out by email or connect on LinkedIn.</p><div className={styles.actions}><a className={styles.primary} href="mailto:nicholaimadias@gmail.com">Email Nicholai <span aria-hidden="true">↗</span></a><a className={styles.secondary} href="https://www.linkedin.com/in/nicholaimadias/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a><a className={styles.secondary} href="tel:+17276213516">(727) 621-3516</a></div></div>
      </section>
    </div>
  );
}

export default ProfilePage;
