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
  ['Endpoint management', 'Workspace ONE · Intune · MECM/SCCM · Jamf · enterprise mobility · zero-touch deployment'],
  ['Identity & security', 'Active Directory · Entra ID · IAM · RBAC · Conditional Access · MFA · Zero Trust'],
  ['Automation & reporting', 'PowerShell · Python · JavaScript · SQL · REST APIs · dashboards · operational analytics'],
  ['Infrastructure', 'Windows Server · Microsoft 365 · Google Workspace · Windows · macOS · Linux · iOS · Android'],
];

export function ProfilePage() {
  return (
    <div className="container page professional-profile">
      <header className="profile-hero">
        <p className="eyebrow">ENDPOINTS · IDENTITY · AUTOMATION</p>
        <h1>Making endpoint platforms secure, scalable, and easier to operate.</h1>
        <p className="lede">
          I am a senior endpoint platform engineer with 15+ years of experience
          connecting device management, identity, security, and practical automation.
        </p>
        <p className="profile-summary">
          I help teams provision devices, deploy applications, improve compliance,
          remediate vulnerabilities, and turn operational signals into useful action.
        </p>
        <div className="profile-actions">
          <a className="button" href="#experience">View experience <span aria-hidden="true">↓</span></a>
          <a className="text-link" href="https://www.linkedin.com/in/nicholaimadias/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a>
          <a className="text-link" href="https://github.com/NicholaiMadias" target="_blank" rel="noopener noreferrer">View GitHub ↗</a>
        </div>
      </header>

      <section className="profile-stats" aria-label="Career highlights">
        <div><strong>15+</strong><span>years in enterprise IT</span></div>
        <div><strong>350K+</strong><span>users supported worldwide</span></div>
        <div><strong>400K+</strong><span>identity accounts migrated</span></div>
        <div><strong>70K+</strong><span>devices and users supported</span></div>
      </section>

      <section className="profile-section profile-intro" aria-labelledby="impact-title">
        <div>
          <p className="eyebrow">HOW I HELP</p>
          <h2 id="impact-title">Platform operations with a security and automation mindset.</h2>
        </div>
        <ul className="impact-list">
          <li>Modernized mobile and desktop endpoint programs with conditional access and automated provisioning.</li>
          <li>Built reporting that connects endpoint signals with operational and security teams.</li>
          <li>Designed automation for provisioning, remediation, software delivery, and recurring maintenance.</li>
        </ul>
      </section>

      <section className="profile-section" aria-labelledby="focus-title">
        <p className="eyebrow">FOCUS AREAS</p>
        <h2 id="focus-title">The work I enjoy solving.</h2>
        <div className="profile-focus-grid">
          <article>
            <span>01</span>
            <h3>Endpoint platforms</h3>
            <p>Reliable lifecycle management for the people, devices, and applications an organization depends on.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Identity &amp; access</h3>
            <p>Practical identity foundations that support secure access without making daily work harder.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Automation &amp; insight</h3>
            <p>Repeatable workflows and useful reporting that turn operational data into better decisions.</p>
          </article>
        </div>
      </section>

      <section id="experience" className="profile-section" aria-labelledby="experience-title">
        <p className="eyebrow">EXPERIENCE</p>
        <h2 id="experience-title">Enterprise engineering and operations.</h2>
        <div className="experience-list">
          {experience.map(([company, role, dates], index) => (
            <article key={`${company}-${role}`}>
              <header>
                <p>{dates}</p>
                <h3>{role}</h3>
                <strong>{company}</strong>
              </header>
              <ul>
                {responsibilities[index].map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section profile-skills" aria-labelledby="skills-title">
        <p className="eyebrow">TOOLKIT</p>
        <h2 id="skills-title">Technical foundation.</h2>
        <dl>
          {skills.map(([name, tools]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{tools}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="profile-section profile-links" aria-labelledby="work-title">
        <p className="eyebrow">WORK &amp; WRITING</p>
        <h2 id="work-title">Explore the rest of the site.</h2>
        <div>
          <Link href="/tools">Local-first tools <span aria-hidden="true">→</span></Link>
          <Link href="/blog">Engineering notes <span aria-hidden="true">→</span></Link>
          <Link href="/arcade">Learning arcade <span aria-hidden="true">→</span></Link>
          <Link href="/bible-study">Bible study <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="profile-section profile-education" aria-labelledby="education-title">
        <p className="eyebrow">EDUCATION</p>
        <h2 id="education-title">Education &amp; professional development.</h2>
        <p><strong>B.S., Business Studies — Computer Information Technology</strong><br />Southern New Hampshire University</p>
        <p><strong>A.S., Computer Information Technology</strong><br />Everest University</p>
        <p>CompTIA Network+ · G Suite Administration · AWS and Azure administration coursework</p>
      </section>
    </div>
  );
}

export default ProfilePage;
