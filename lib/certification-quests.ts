export type RoleQuestion = {
  prompt: string;
  answers: [string, string, string, string];
  correct: number;
  why: string;
  source: string;
};

export type RoleMission = {
  id: string;
  track: "A+" | "Network+" | "Security+";
  role: string;
  title: string;
  description: string;
  incident?: string;
  questions: RoleQuestion[];
};

export const certificationMissions: RoleMission[] = [
  {
    id: "aplus",
    track: "A+",
    role: "Hardware Technician",
    title: "CompTIA A+ Foundations",
    description:
      "Diagnose memory, storage, display, and operating system problems.",
    questions: [
      {
        prompt: "Which component stores data only while power is supplied?",
        answers: ["SSD", "RAM", "Blu-ray disc", "ROM firmware"],
        correct: 1,
        why: "RAM is volatile memory. It normally loses its contents when power is removed.",
        source: "Volatile memory",
      },
      {
        prompt:
          "A desktop stops displaying video immediately after a RAM upgrade. What should you check first?",
        answers: [
          "Replace the motherboard",
          "Verify RAM seating and compatibility",
          "Reinstall applications",
          "Format the SSD",
        ],
        correct: 1,
        why: "With the system powered down, check the components that just changed before replacing unrelated parts.",
        source: "Hardware troubleshooting",
      },
      {
        prompt:
          "Which device can hold the installed operating system after the PC shuts down?",
        answers: ["CPU cache", "GPU registers", "SSD", "RAM"],
        correct: 2,
        why: "An SSD uses nonvolatile storage and retains its data when the device has no power.",
        source: "Persistent storage",
      },
      {
        prompt:
          "A Windows PC crashes right after a graphics driver update. It still boots into Safe Mode. What should you try first?",
        answers: [
          "Roll back the graphics driver",
          "Clear the firmware settings",
          "Replace the SSD",
          "Remove the network adapter",
        ],
        correct: 0,
        why: "The driver update is the most recent relevant change. Safe Mode lets you reach Device Manager and try a rollback if the previous driver is available.",
        source: "Operating system recovery",
      },
      {
        prompt:
          "A workstation overheats under load. Its temperature rises quickly and the CPU fan stays still. What is the best first action?",
        answers: [
          "Run a longer stress test",
          "Add more RAM",
          "Disable temperature alerts",
          "Shut down and inspect the cooling assembly",
        ],
        correct: 3,
        why: "Power down before checking the fan connection, cooler mounting, and airflow. Continued load can cause thermal shutdown.",
        source: "Cooling and airflow",
      },
      {
        prompt:
          "An SSD reports a critical health warning, but the PC still starts. The user has no recent backup. What comes first?",
        answers: [
          "Benchmark the drive",
          "Back up critical data to approved storage",
          "Reinstall Windows onto the SSD",
          "Clear the warning in firmware",
        ],
        correct: 1,
        why: "Preserve data while the drive is readable. Then plan a replacement and confirm the backup can be restored.",
        source: "Storage and backup",
      },
    ],
  },
  {
    id: "network",
    track: "Network+",
    role: "Network Investigator",
    title: "CompTIA Network+ Foundations",
    description:
      "Trace addressing, name resolution, switching, and connectivity faults.",
    questions: [
      {
        prompt:
          "Which service ordinarily resolves domain names into IP addresses?",
        answers: ["DNS", "DHCP", "NTP", "SMTP"],
        correct: 0,
        why: "DNS resolves names using records such as A for IPv4 and AAAA for IPv6.",
        source: "Name resolution",
      },
      {
        prompt: "Which command can test basic IP reachability with ICMP echo?",
        answers: ["nslookup", "arp", "netstat", "ping"],
        correct: 3,
        why: "Ping sends echo requests. A timeout alone does not prove a device is offline because ICMP can be filtered.",
        source: "Connectivity tools",
      },
      {
        prompt:
          "A Windows PC configured for DHCP assigns itself 169.254.20.30. What should you investigate first?",
        answers: [
          "Whether its DNS record expired",
          "Whether it can obtain a DHCP lease",
          "Whether HTTPS is enabled",
          "Whether the clock is synchronized",
        ],
        correct: 1,
        why: "Windows can assign an IPv4 link-local address when it cannot get a DHCP lease. Check the client path to DHCP.",
        source: "IPv4 link-local addressing",
      },
      {
        prompt:
          "Two devices are connected to different access VLANs. What allows them to exchange traffic across VLANs?",
        answers: [
          "Putting both devices in promiscuous mode",
          "Adding another access switch with default settings",
          "Routing between the networks with the appropriate rules",
          "Assigning both devices the same IP address",
        ],
        correct: 2,
        why: "A router or Layer 3 switch routes traffic across the VLANs' IP networks. Policy can permit or block that traffic.",
        source: "VLANs and routing",
      },
      {
        prompt:
          "A browser reaches an internal application by IP address, but the hostname does not resolve. Which test best isolates the problem?",
        answers: [
          "Query the hostname using the client's configured DNS resolver",
          "Run a cable test on every printer",
          "Change the default gateway",
          "Measure wireless signal strength",
        ],
        correct: 0,
        why: "The working IP connection points toward name resolution. Query the configured resolver and compare the response with the expected record.",
        source: "DNS troubleshooting",
      },
      {
        prompt: "What is the usable host range of 192.168.10.64/26?",
        answers: [
          "192.168.10.64–192.168.10.127",
          "192.168.10.1–192.168.10.62",
          "192.168.10.65–192.168.10.126",
          "192.168.10.129–192.168.10.190",
        ],
        correct: 2,
        why: "A /26 has 64 addresses. .64 is the network address and .127 is the broadcast address, leaving .65 through .126 for hosts.",
        source: "IPv4 subnetting",
      },
    ],
  },
  {
    id: "security",
    track: "Security+",
    role: "Security Analyst",
    title: "CompTIA Security+ Foundations",
    description:
      "Practice access decisions, identity protection, and incident triage.",
    questions: [
      {
        prompt: "What does the principle of least privilege mean?",
        answers: [
          "Give everyone admin access",
          "Grant only access needed for duties",
          "Remove all passwords",
          "Share an administrator account",
        ],
        correct: 1,
        why: "Keep access limited to the actions required for a role. Removing excess access reduces exposure if an account is compromised.",
        source: "Identity and access management",
      },
      {
        prompt: "What helps protect an account after its password is stolen?",
        answers: [
          "Password reuse",
          "Disabling login alerts",
          "Multi-factor authentication",
          "Sharing recovery codes with the team",
        ],
        correct: 2,
        why: "An additional authentication factor makes the password alone insufficient for a normal sign-in.",
        source: "Authentication factors",
      },
      {
        prompt:
          "An unexpected email urges you to enter credentials through a link. What should you do?",
        answers: [
          "Follow the link before it expires",
          "Verify through a known official channel",
          "Forward the link to coworkers",
          "Disable browser protections",
        ],
        correct: 1,
        why: "Use an independently known website or contact to verify the request. Report suspicious email through the approved channel.",
        source: "Social engineering",
      },
      {
        prompt:
          "A team must verify who signed a software package and whether the file changed after signing. Which control supports both checks?",
        answers: [
          "A file size limit",
          "A shared password",
          "Transport encryption alone",
          "A valid digital signature from a trusted signer",
        ],
        correct: 3,
        why: "Signature verification detects modification and ties the signature to the signing key. Trusting the identity requires validating the signer and key.",
        source: "Integrity and authenticity",
      },
      {
        prompt:
          "Which control directly limits what a thief can read from a powered-off laptop's drive?",
        answers: [
          "Full-disk encryption",
          "A screen lock timeout",
          "A perimeter firewall",
          "Browser pop-up blocking",
        ],
        correct: 0,
        why: "Full-disk encryption protects data at rest when the drive is locked and the attacker lacks the key.",
        source: "Data at rest",
      },
      {
        prompt:
          "A vendor needs a week of read-only access to one project. Which access plan best fits?",
        answers: [
          "Share an existing employee's password",
          "Provide permanent admin access",
          "Grant a named, project-scoped read-only role that expires",
          "Publish the project anonymously",
        ],
        correct: 2,
        why: "Limit permissions, duration, and scope. A named identity makes activity attributable and access easier to revoke.",
        source: "Access lifecycle",
      },
    ],
  },
  {
    id: "aplus-helpdesk",
    track: "A+",
    role: "Help Desk Escalation",
    title: "Workstation Down",
    description: "Restore a workstation before its afternoon training session.",
    incident:
      "A trainer's managed desktop began failing after a hardware upgrade. You have an approved spare, a maintenance window, and an internal service ticket.",
    questions: [
      {
        prompt:
          "The ticket says “black screen.” What should you establish before opening the computer?",
        answers: [
          "Whether the display shows no signal and when the symptom began",
          "Whether the employee can remember their account password",
          "Whether a reimage is already scheduled",
          "Whether the old computer can be discarded",
        ],
        correct: 0,
        why: "Pin down the symptom, timing, and recent changes. A monitor with no input is different from a black screen after Windows starts.",
        source: "Problem identification",
      },
      {
        prompt:
          "The monitor is set to the correct input, a known-good cable fails, and the board's DRAM indicator stays lit. What should you do next?",
        answers: [
          "Reset the employee account",
          "Restore Windows from an image",
          "Power off, unplug, and test with the original supported RAM",
          "Swap the keyboard and mouse",
        ],
        correct: 2,
        why: "The indicator and timing point toward the memory change. Testing the original supported RAM helps isolate the hardware fault.",
        source: "POST and hardware isolation",
      },
      {
        prompt:
          "The original RAM restores video, but firmware lists no boot drive. What is the next useful check?",
        answers: [
          "Clear Windows event logs",
          "Power down and inspect the drive seating or connections",
          "Set a new Windows PIN",
          "Reconfigure wireless roaming",
        ],
        correct: 1,
        why: "Confirm the firmware can detect the drive before attempting operating system recovery. A connector could have shifted during the upgrade.",
        source: "Firmware storage detection",
      },
      {
        prompt:
          "After reconnecting the drive, Windows prompts for a BitLocker recovery key. Which action fits a managed workstation?",
        answers: [
          "Post the prompt to a public forum",
          "Clear the TPM immediately",
          "Format the drive and start over",
          "Verify the device and follow the company's approved recovery-key procedure",
        ],
        correct: 3,
        why: "Authorized recovery avoids unnecessary data loss and protects the key. Follow the organization's identity and device verification process.",
        source: "Managed Windows recovery",
      },
      {
        prompt:
          "Windows starts. What should you verify before handing back the workstation?",
        answers: [
          "Only that the power light is on",
          "Login, required training software, and the display used in the session",
          "Only the SSD model",
          "Only the BIOS date",
        ],
        correct: 1,
        why: "Verify the user's real workflow, including the repaired path and relevant peripherals.",
        source: "Functional verification",
      },
      {
        prompt:
          "The workstation is stable with the original RAM. What belongs in the ticket?",
        answers: [
          "Symptoms, tests performed, validated fix, and any follow-up",
          "The employee's recovery key",
          "A statement that all upgraded systems are affected",
          "Only the final time stamp",
        ],
        correct: 0,
        why: "Document evidence and the verified outcome so future technicians can reproduce the work. Keep credentials and recovery keys out of the ticket.",
        source: "Change and ticket documentation",
      },
    ],
  },
  {
    id: "network-outage",
    track: "Network+",
    role: "Network Operations",
    title: "Branch Network Outage",
    description:
      "Trace an outage through switch ports, DHCP, and internal DNS.",
    incident:
      "A branch office replaced one access switch. Employees on one floor lost internal access. Other floors are operating normally.",
    questions: [
      {
        prompt: "Where should you start looking?",
        answers: [
          "Change the public DNS zone",
          "Inspect a known affected port and compare the new switch configuration to the approved baseline",
          "Replace the branch internet circuit",
          "Reboot the data center edge router",
        ],
        correct: 1,
        why: "The scope and timing point toward the recently replaced access switch. Start there with a comparison that avoids unnecessary disruption.",
        source: "Change-based troubleshooting",
      },
      {
        prompt:
          "Endpoints show link lights but have 169.254.x.x addresses. Their ports are in the default VLAN. What should you verify?",
        answers: [
          "The switch's time zone",
          "Whether the users' browsers allow cookies",
          "The intended access VLAN and whether the uplink carries it",
          "Whether a public web certificate is expired",
        ],
        correct: 2,
        why: "Physical link does not establish correct VLAN membership. Check where DHCP traffic enters the network and whether the uplink carries that VLAN.",
        source: "Access ports and trunks",
      },
      {
        prompt:
          "You correct the access ports. The user VLAN is allowed upstream, but DHCP still fails. The DHCP server lives on another subnet. What should you check?",
        answers: [
          "The DHCP relay configuration at the user VLAN gateway",
          "The DNS search suffix",
          "The switch banner",
          "The switch's power budget for desk phones",
        ],
        correct: 0,
        why: "Initial DHCP discovery is a local broadcast. A relay can forward requests between the client network and a server on another subnet.",
        source: "DHCP relay",
      },
      {
        prompt:
          "Clients now receive the expected IP and gateway. An internal server opens by IP, but its FQDN fails. What should you check next?",
        answers: [
          "Change every port to trunk mode",
          "Recover each employee's browser history",
          "Delete the default gateway",
          "Query the internal name using the DNS server assigned by DHCP",
        ],
        correct: 3,
        why: "Test the name-resolution path the clients actually use. Confirm both the resolver address and its response.",
        source: "DNS diagnostics",
      },
      {
        prompt:
          "After restoring internal DNS, one workstation still drops traffic and its port's CRC error count rises. What is a sensible targeted test?",
        answers: [
          "Flush the entire site's DNS cache",
          "Swap its patch cable with a known-good one and check whether errors continue",
          "Widen the DHCP range",
          "Change the wireless network name",
        ],
        correct: 1,
        why: "Rising CRC errors can indicate physical link trouble. A known-good cable is a low-impact way to isolate one likely cause.",
        source: "Ethernet physical-layer faults",
      },
      {
        prompt: "What would show that the floor is ready for service again?",
        answers: [
          "A sample of affected clients gets the expected lease, resolves internal names, and reaches required applications",
          "One unused switch port lights up",
          "The uplink has a new description",
          "An external status page loads on your phone",
        ],
        correct: 0,
        why: "Test the path that failed from affected clients, including addressing, name resolution, and the users' application workflow.",
        source: "End-to-end verification",
      },
    ],
  },
  {
    id: "security-incident",
    track: "Security+",
    role: "Incident Responder",
    title: "Phishing to Containment",
    description:
      "Investigate a suspicious sign-in and contain a compromised account.",
    incident:
      "An employee reports entering their password on a fake sign-in page and approving an unexpected MFA prompt. The service desk escalates the case to you.",
    questions: [
      {
        prompt:
          "Which action best confirms the report and starts an effective investigation?",
        answers: [
          "Delete the employee's mailbox",
          "Send the link to the team chat",
          "Open an incident and correlate the trusted sign-in logs with the user's timeline",
          "Publish the user's name in the status page",
        ],
        correct: 2,
        why: "Record the timeline and review identity logs to determine what happened and when. Work from trusted evidence and follow the response plan.",
        source: "Incident triage",
      },
      {
        prompt:
          "Logs confirm an unauthorized active session. What response addresses ongoing access?",
        answers: [
          "Follow the containment playbook to block sign-in, revoke sessions, and reset credentials",
          "Ask the employee to close their browser",
          "Reset the password and assume all sessions are immediately gone",
          "Wait for weekly reporting",
        ],
        correct: 0,
        why: "A password reset alone may leave existing sessions usable. Apply the identity provider's containment controls and verify affected sessions are blocked.",
        source: "Account containment",
      },
      {
        prompt:
          "Which evidence helps determine what the attacker did after signing in?",
        answers: [
          "The laptop's screen brightness",
          "A public DNS benchmark",
          "Only the employee's calendar",
          "Identity, mailbox, and application audit events for the affected account",
        ],
        correct: 3,
        why: "Correlating logs shows actions taken across services. Preserve timestamps and evidence through approved channels.",
        source: "Audit evidence",
      },
      {
        prompt:
          "You find a newly added forwarding rule that sends company mail to an external inbox. What should you do?",
        answers: [
          "Keep it active until the next maintenance cycle",
          "Preserve its details and remove the unauthorized rule under the response plan",
          "Delete all legitimate inbox rules too",
          "Ask the attacker to remove the rule",
        ],
        correct: 1,
        why: "Capture the rule and destination for scope and evidence, then remove this persistence mechanism under the incident plan.",
        source: "Persistence and eradication",
      },
      {
        prompt: "What should be validated before restoring the user's access?",
        answers: [
          "That the phishing page looks different",
          "That the employee can send an email from a personal account",
          "That recovery methods and MFA registrations are trusted and the account is monitored",
          "That the security ticket has no attachments",
        ],
        correct: 2,
        why: "Check factors and recovery paths for attacker changes. Monitor after restoring access to detect attempts to regain access.",
        source: "Account recovery",
      },
      {
        prompt:
          "Which change would most directly reduce the risk of a repeat credential-and-prompt phishing attack?",
        answers: [
          "Use phishing-resistant authentication such as security keys or passkeys where supported",
          "Extend the account's idle session",
          "Allow MFA approvals without user interaction",
          "Make the password reset link easier to forward",
        ],
        correct: 0,
        why: "FIDO-based authentication uses origin binding. A look-alike site cannot request a valid assertion for the legitimate site's origin.",
        source: "Phishing-resistant authentication",
      },
    ],
  },
];
