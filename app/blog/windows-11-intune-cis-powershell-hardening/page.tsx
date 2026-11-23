import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'From Manual Hardening to Automated Security: Windows 11, Intune, CIS & PowerShell';
const description = 'A practical, audit-first approach to Windows 11 endpoint hardening with Microsoft Intune, CIS Benchmarks, NIST RMF, PowerShell validation, drift detection and rollback.';
export const metadata: Metadata = { title, description };

const sections = [
  [
    "Why traditional hardening stops scaling",
    [
      "Manual Group Policy changes, registry edits, and one-off checklists have a place, but they struggle in environments with distributed devices and overlapping management systems. Remote endpoints, hybrid identities, multiple policy authorities, and frequent OS updates introduce drift and blind spots.",
      "Common failure modes include inconsistent settings, Intune/GPO conflicts, incomplete reporting, and security changes that interrupt applications without a recovery path. The solution is not to automate every switch indiscriminately; it is to define, test, observe, and govern the desired state."
    ]
  ],
  [
    "Start with an explicit baseline",
    [
      "Microsoft security baselines and CIS Benchmarks provide configuration guidance; NIST's Risk Management Framework provides a process for selecting, assessing, and monitoring controls as part of organizational risk management. These are related but distinct resources.",
      "Document each requirement's purpose, scope, target OS version, control owner, configuration source, verification method, approved exceptions, and rollback procedure. Do not copy all benchmark settings into production without testing application compatibility and operational impact."
    ]
  ],
  [
    "Roll out with Microsoft Intune",
    [
      "Inventory existing Intune policies and Group Policy Objects before adding a new security baseline. Identify overlapping settings and establish which platform has authority. Start with a representative pilot rather than all devices.",
      "Assign the pilot profile, monitor device and setting reports, validate the resulting configuration on the endpoint, investigate conflicts, and expand in stages. An assignment or successful policy-processing status is not the same as independent proof of compliance. Baseline versions also change as Windows evolves."
    ]
  ],
  [
    "Read-only PowerShell validation",
    [
      "Collect evidence before attempting remediation. The commands below inspect Microsoft Defender, Windows Firewall, and BitLocker without changing their configuration. Run them only on authorized Windows endpoints; permissions and endpoint protection products can affect the results."
    ]
  ],
  [
    "Configuration drift and controlled remediation",
    [
      "Configuration drift occurs when observed device settings diverge from the approved baseline. Collect actual values, compare them to documented requirements, record exceptions, classify conflicts, and send remediation proposals through an approved change process.",
      "Not every mismatch should trigger an automatic fix. A firewall exception may be intentionally required for a business application, while an endpoint management conflict may need policy ownership resolved rather than another script deployed."
    ]
  ],
  [
    "Connect findings to compliance evidence",
    [
      "Link each technical check to a specific, versioned requirement rather than treating a generic script as a compliance certification. CIS Benchmarks describe technical recommendations, CIS Controls organize safeguards, and NIST RMF supports risk-management activities.",
      "An auditable record should capture the device identifier, assessment timestamp, baseline version, expected and observed values, result, exception reference, and remediation status. Redact identifiers and sensitive configuration details before publishing examples."
    ]
  ],
  [
    "Rollback is part of the deployment",
    [
      "Security changes can break authentication, legacy applications, connectivity, or recovery access. Before rollout, record the prior known-good configuration, test on a pilot, define stop criteria, preserve emergency access, and confirm the reversal mechanism.",
      "Removing an Intune policy does not necessarily revert every setting to its former value. Some configurations persist until a replacement policy explicitly changes them. Test a setting-specific rollback and validate the resulting device state."
    ]
  ],
  [
    "An audit-ready engineering pipeline",
    [
      "Baseline definition → controlled policy deployment → device assessment → drift detection → risk review → approved remediation → reporting.",
      "Good operational dashboards answer which devices are in scope, which controls failed, how recent the evidence is, whether conflicts exist, and whether exceptions are approved. Useful measures include compliance rate, drift rate, mean time to remediation, policy conflict rate, evidence freshness, and rollback success."
    ]
  ],
  [
    "AI as an assistant, not an unrestricted administrator",
    [
      "AI can summarize drift reports, help draft read-only diagnostics, explain baseline differences, and organize audit evidence. Generated scripts still require review and controlled testing. Do not send credentials, sensitive endpoint inventories, or internal configurations to unapproved models.",
      "Keep authority for changes with administrators and change-control processes; use automation to accelerate investigation and repeatable evidence collection."
    ]
  ]
];
const commands = [
  {
    "heading": "Microsoft Defender status",
    "code": "Get-MpComputerStatus | Select-Object AMServiceEnabled, AntivirusEnabled, RealTimeProtectionEnabled, AntivirusSignatureLastUpdated"
  },
  {
    "heading": "Windows Firewall profiles",
    "code": "Get-NetFirewallProfile | Select-Object Name, Enabled, DefaultInboundAction, DefaultOutboundAction"
  },
  {
    "heading": "BitLocker protection",
    "code": "Get-BitLockerVolume | Select-Object MountPoint, VolumeStatus, ProtectionStatus, EncryptionPercentage"
  },
  {
    "heading": "Export a firewall snapshot",
    "code": "Get-NetFirewallProfile | Select-Object Name, Enabled, DefaultInboundAction, DefaultOutboundAction | Export-Csv -Path .\\FirewallAudit.csv -NoTypeInformation"
  }
];

export default function WindowsHardeningArticle() {
  return (
    <article className="blog-shell blog-article">
      <header>
        <p className="blog-meta"><time dateTime="2026-11-22">November 22, 2026</time> · Endpoint Security · By Nicholai Madias</p>
        <h1>{title}</h1>
        <p className="blog-deck">Building repeatable, measurable, and audit-ready endpoint security across enterprise environments.</p>
        <p><Link href="/blog">← Back to Nicholai’s Blog</Link></p>
      </header>
      <p>Enterprise endpoint security has evolved beyond configuring a Group Policy setting and hoping every machine stays compliant. Modern fleets combine remote Windows devices, cloud management, hybrid identity, and security frameworks that demand evidence—not just configuration.</p>
      <p>After years working with enterprise endpoint management, Active Directory, Workspace ONE, Microsoft Intune, and PowerShell, I view hardening as a continuous engineering discipline: define the desired state, deploy it in a controlled way, independently validate it, and make recovery possible.</p>
      {sections.map(([heading, paragraphs], index) => (
        <section key={heading}>
          <h2>{index + 1}. {heading}</h2>
          {(paragraphs as string[]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {index === 3 && <>
            {commands.map(({heading: label, code}) => <div key={label}>
              <h3>{label}</h3>
              <pre tabIndex={0}><code>{code}</code></pre>
            </div>)}
            <p>These checks are illustrative snapshots, not a comprehensive CIS assessment. Interpret results alongside policy requirements, approved alternatives, and platform reporting. BitLocker status alone does not prove that recovery keys are escrowed correctly.</p>
          </>}
        </section>
      ))}
      <h2>Conclusion: engineer for repeatability</h2>
      <p>The objective is not to enable the most settings. It is to establish secure configurations that can be deployed consistently, assessed independently, monitored continuously, and recovered safely. Intune provides centralized management, PowerShell supports validation, CIS offers detailed benchmarks, and NIST RMF connects implementation to managed risk.</p>
      <p><strong>A secure endpoint is not a one-time achievement; it is the output of a repeatable engineering process.</strong></p>
      <h2>About the author</h2>
      <p>Nicholai Madias is a Senior Platform Engineer with over 15 years of experience spanning enterprise endpoint management, identity services, infrastructure administration, automation, and security operations. His work includes Microsoft Intune, Workspace ONE UEM, MECM/SCCM, Active Directory, Microsoft Entra ID, and PowerShell.</p>
      <h2>References</h2>
      <ul>
        <li><a href="https://learn.microsoft.com/en-us/intune/device-security/security-baselines/overview">Microsoft Intune security baselines</a></li>
        <li><a href="https://learn.microsoft.com/en-us/intune/device-security/security-baselines/monitor-baselines">Monitor security baselines in Intune</a></li>
        <li><a href="https://www.cisecurity.org/cis-benchmarks">CIS Benchmarks</a></li>
        <li><a href="https://csrc.nist.gov/projects/risk-management/about-rmf">NIST Risk Management Framework</a></li>
      </ul>
    </article>
  );
}
