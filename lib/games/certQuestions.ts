// Comprehensive CompTIA A+, Network+, Security+, and IT Systems certification quiz questions
// Each category covers real-world core domains, troubleshooting, and concepts.

export type CertCategory = 'all' | 'a-plus' | 'network-plus' | 'security-plus';

export interface CertQuestion {
  id: string;
  category: 'a-plus' | 'network-plus' | 'security-plus';
  categoryLabel: string;
  text: string;
  choices: string[];
  answerIndex: number;
  reference: string;
  explanation: string;
}

export const certQuestions: CertQuestion[] = [
  // --- CompTIA A+ Core 1 & 2 Questions ---
  {
    id: "aplus-1",
    category: "a-plus",
    categoryLabel: "CompTIA A+",
    text: "Which TCP port is used by default for secure HTTPS web traffic?",
    choices: ["Port 22", "Port 80", "Port 443", "Port 8080"],
    answerIndex: 2,
    reference: "CompTIA A+ Core 1 (220-1101) Domain 2.1 - Networking Protocols",
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) defaults to TCP port 443 for encrypted TLS/SSL web traffic, whereas HTTP uses port 80."
  },
  {
    id: "aplus-2",
    category: "a-plus",
    categoryLabel: "CompTIA A+",
    text: "A technician needs to connect a high-speed NVMe solid-state drive directly to the motherboard. Which form factor and slot interface are required?",
    choices: ["SATA 2.5-inch with AHCI", "M.2 PCIe Gen 4 / Gen 5 slot", "PCI Express x1 legacy riser", "IDE/PATA 40-pin ribbon"],
    answerIndex: 1,
    reference: "CompTIA A+ Core 1 (220-1101) Domain 3.2 - Storage Devices",
    explanation: "High-speed NVMe SSDs utilize the M.2 form factor communicating directly over the PCIe bus (PCI Express Gen 4 or 5) for ultra-low latency."
  },
  {
    id: "aplus-3",
    category: "a-plus",
    categoryLabel: "CompTIA A+",
    text: "When a user powers on a desktop computer, the fans spin at maximum speed, no video displays on the monitor, and the motherboard emits 1 long beep followed by 2 short beeps. What is the most likely cause?",
    choices: ["Dead CMOS battery", "Video card / GPU seating or failure", "Corrupted Windows Boot Manager", "Overheating CPU thermal paste"],
    answerIndex: 1,
    reference: "CompTIA A+ Core 1 (220-1101) Domain 5.2 - Hardware Troubleshooting",
    explanation: "Standard POST beep codes dictate that 1 long beep followed by 2 short beeps signifies a display adapter / video card issue or video memory failure."
  },
  {
    id: "aplus-4",
    category: "a-plus",
    categoryLabel: "CompTIA A+",
    text: "Which IP address belongs to the Automatic Private IP Addressing (APIPA) range, indicating a client failed to obtain a lease from a DHCP server?",
    choices: ["10.0.0.15", "192.168.1.100", "169.254.120.45", "172.16.254.1"],
    answerIndex: 2,
    reference: "CompTIA A+ Core 1 (220-1101) Domain 2.3 - IPv4 Addressing",
    explanation: "APIPA assigns addresses in the 169.254.0.1 to 169.254.255.254 range (/16) with subnet mask 255.255.0.0 when DHCP discovery fails."
  },
  {
    id: "aplus-5",
    category: "a-plus",
    categoryLabel: "CompTIA A+",
    text: "In the 6-step CompTIA troubleshooting methodology, what is the immediate next step after 'Establish a theory of probable cause'?",
    choices: ["Verify full system functionality", "Test the theory to determine cause", "Document findings, actions, and outcomes", "Establish a plan of action to resolve the problem"],
    answerIndex: 1,
    reference: "CompTIA A+ Core 1 & 2 Troubleshooting Methodology",
    explanation: "Step 1: Identify problem. Step 2: Establish theory of probable cause. Step 3: Test theory to determine cause. Step 4: Plan of action. Step 5: Verify functionality. Step 6: Document findings."
  },
  {
    id: "aplus-6",
    category: "a-plus",
    categoryLabel: "CompTIA A+",
    text: "Which Windows utility should an IT administrator run to scan the integrity of all protected system files and replace incorrect, corrupted versions?",
    choices: ["chkdsk /f", "sfc /scannow", "ipconfig /flushdns", "diskpart clean"],
    answerIndex: 1,
    reference: "CompTIA A+ Core 2 (220-1102) Domain 1.9 - Operating System Tools",
    explanation: "System File Checker (`sfc /scannow`) inspects protected Windows OS files and repairs corrupt or missing files using cached copies from the Windows component store."
  },
  {
    id: "aplus-7",
    category: "a-plus",
    categoryLabel: "CompTIA A+",
    text: "Which type of display backlight technology provides individual per-pixel illumination without requiring a separate LED edge-lit diffuser, achieving true infinite black contrast?",
    choices: ["CCFL (Cold Cathode Fluorescent)", "TN (Twisted Nematic) LCD", "OLED (Organic Light Emitting Diode)", "IPS (In-Plane Switching) with WLED"],
    answerIndex: 2,
    reference: "CompTIA A+ Core 1 (220-1101) Domain 1.3 - Display Technologies",
    explanation: "OLED displays use organic molecules that emit their own light per pixel. Turning off pixels completely creates true absolute blacks without backlight bleed."
  },
  {
    id: "aplus-8",
    category: "a-plus",
    categoryLabel: "CompTIA A+",
    text: "A technician is recycling decommissioned hard drives that previously contained sensitive financial records. Which sanitization method guarantees data cannot be recovered even in a clean-room forensics lab?",
    choices: ["Standard Quick Format in NTFS", "Degaussing followed by physical destruction / shredding", "Zero-fill with a single-pass wipe", "Partition deletion with Disk Management"],
    answerIndex: 1,
    reference: "CompTIA A+ Core 2 (220-1102) Domain 2.6 - Data Disposal",
    explanation: "Electromagnetic degaussing neutralizes magnetic fields on magnetic platters, followed by physical mechanical shredding (NIST SP 800-88 Purge/Destroy)."
  },

  // --- CompTIA Network+ Questions ---
  {
    id: "netplus-1",
    category: "network-plus",
    categoryLabel: "CompTIA Network+",
    text: "Which OSI model layer is responsible for end-to-end packet routing, logical IP addressing, and determining path selection across different networks?",
    choices: ["Layer 2 - Data Link Layer", "Layer 3 - Network Layer", "Layer 4 - Transport Layer", "Layer 5 - Session Layer"],
    answerIndex: 1,
    reference: "CompTIA Network+ (N10-008/N10-009) Domain 1.2 - OSI Model",
    explanation: "Layer 3 (Network Layer) handles logical addressing (IPv4/IPv6), packet encapsulation, subnet routing, and protocols like ICMP, OSPF, and BGP."
  },
  {
    id: "netplus-2",
    category: "network-plus",
    categoryLabel: "CompTIA Network+",
    text: "What is the usable host capacity and default subnet mask for an IPv4 network configured with a CIDR prefix of /27?",
    choices: [
      "Subnet mask 255.255.255.224 with 30 usable hosts",
      "Subnet mask 255.255.255.240 with 14 usable hosts",
      "Subnet mask 255.255.255.192 with 62 usable hosts",
      "Subnet mask 255.255.255.248 with 6 usable hosts"
    ],
    answerIndex: 0,
    reference: "CompTIA Network+ Domain 1.4 - Subnetting and CIDR",
    explanation: "A /27 borrowing 3 bits in the 4th octet (128 + 64 + 32 = 224) provides 2^(32-27) = 32 total addresses minus 2 (network & broadcast) = 30 usable hosts."
  },
  {
    id: "netplus-3",
    category: "network-plus",
    categoryLabel: "CompTIA Network+",
    text: "Which Spanning Tree Protocol (STP) standard (IEEE 802.1w) reduces convergence time from 30-50 seconds to mere milliseconds upon topology change?",
    choices: ["RSTP (Rapid Spanning Tree Protocol)", "PVST+ (Per-VLAN Spanning Tree)", "LACP (Link Aggregation Control Protocol)", "RIPv2 (Routing Information Protocol)"],
    answerIndex: 0,
    reference: "CompTIA Network+ Domain 2.2 - Switching Features & Loop Prevention",
    explanation: "RSTP (802.1w) provides fast convergence for switch loop prevention by actively confirming alternate ports without waiting on forwarding delays."
  },
  {
    id: "netplus-4",
    category: "network-plus",
    categoryLabel: "CompTIA Network+",
    text: "Which routing protocol is an exterior gateway protocol (EGP) based on path-vector routing that serves as the backbone protocol routing traffic between autonomous systems (AS) on the global Internet?",
    choices: ["OSPF (Open Shortest Path First)", "BGP (Border Gateway Protocol)", "EIGRP (Enhanced Interior Gateway Routing Protocol)", "RIP (Routing Information Protocol)"],
    answerIndex: 1,
    reference: "CompTIA Network+ Domain 1.3 - Routing Concepts and Protocols",
    explanation: "BGP (specifically BGP-4) is the standardized exterior gateway protocol designed to exchange routing and reachability information among autonomous systems on the Internet."
  },
  {
    id: "netplus-5",
    category: "network-plus",
    categoryLabel: "CompTIA Network+",
    text: "An engineer needs to diagnose intermittent packet loss and pinpoint the exact router or hop where latency spikes occur along a path. Which command-line utility should be used?",
    choices: ["netstat -ano", "traceroute / tracert (or mtr)", "nslookup -type=mx", "arp -a"],
    answerIndex: 1,
    reference: "CompTIA Network+ Domain 5.2 - Command Line Tools",
    explanation: "`traceroute` (macOS/Linux) or `tracert` (Windows) and `mtr` use ICMP/UDP with incrementing TTL (Time to Live) values to identify each router hop along a path."
  },
  {
    id: "netplus-6",
    category: "network-plus",
    categoryLabel: "CompTIA Network+",
    text: "What standard TIA/EIA wiring color code order represents the T568B pinout standard on an RJ-45 modular connector for pins 1 through 8?",
    choices: [
      "White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown",
      "White/Green, Green, White/Orange, Blue, White/Blue, Orange, White/Brown, Brown",
      "White/Orange, Orange, White/Green, Green, White/Blue, Blue, White/Brown, Brown",
      "Orange, White/Orange, Green, White/Green, Blue, White/Blue, Brown, White/Brown"
    ],
    answerIndex: 0,
    reference: "CompTIA Network+ Domain 1.1 - Physical Cabling Standards",
    explanation: "T568B pinout: 1:White/Orange, 2:Orange, 3:White/Green, 4:Blue, 5:White/Blue, 6:Green, 7:White/Brown, 8:Brown."
  },
  {
    id: "netplus-7",
    category: "network-plus",
    categoryLabel: "CompTIA Network+",
    text: "Which DNS record type is explicitly configured to specify the mail server responsible for accepting incoming email messages on behalf of a domain?",
    choices: ["A / AAAA Record", "CNAME (Canonical Name)", "MX (Mail Exchanger)", "PTR (Pointer Record)"],
    answerIndex: 2,
    reference: "CompTIA Network+ Domain 1.5 - Network Services and DNS",
    explanation: "MX (Mail Exchanger) records direct email to the mail servers designated for a domain with associated priority preference numbers."
  },
  {
    id: "netplus-8",
    category: "network-plus",
    categoryLabel: "CompTIA Network+",
    text: "Which wireless frequency band introduced with Wi-Fi 6E (802.11ax) and Wi-Fi 7 (802.11be) offers expansive contiguous spectrum up to 1200 MHz without DFS radar interference?",
    choices: ["900 MHz ISM Band", "2.4 GHz Band", "5 GHz Band", "6 GHz Band"],
    answerIndex: 3,
    reference: "CompTIA Network+ Domain 1.6 - Wireless Standards and Technologies",
    explanation: "Wi-Fi 6E expanded Wi-Fi operation into the unlicensed 6 GHz band (5.925 GHz to 7.125 GHz), providing wide 160MHz and 320MHz channels free of legacy contention."
  },

  // --- CompTIA Security+ Questions ---
  {
    id: "secplus-1",
    category: "security-plus",
    categoryLabel: "CompTIA Security+",
    text: "Which pillar of the CIA Triad is directly violated when an attacker performs an unauthorized SQL Injection that modifies salary entries in an accounting database?",
    choices: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
    answerIndex: 1,
    reference: "CompTIA Security+ (SY0-701) Domain 1.1 - Fundamental Security Concepts",
    explanation: "Integrity ensures data is accurate, consistent, and protected from unauthorized modification, alteration, or deletion."
  },
  {
    id: "secplus-2",
    category: "security-plus",
    categoryLabel: "CompTIA Security+",
    text: "An organization adopts a security architecture requiring continuous verification of every user, device, and network flow, assuming the internal perimeter is already compromised. What framework does this describe?",
    choices: ["Defense-in-Depth Castle-and-Moat", "Zero Trust Architecture (ZTA)", "Air-Gapped DMZ Isolation", "OpenID Connect Federated Sign-on"],
    answerIndex: 1,
    reference: "CompTIA Security+ Domain 3.1 - Architecture and Design",
    explanation: "Zero Trust Architecture (NIST SP 800-207) operates under 'Never trust, always verify', enforcing least privilege and continuous authentication regardless of network location."
  },
  {
    id: "secplus-3",
    category: "security-plus",
    categoryLabel: "CompTIA Security+",
    text: "Which cryptographic algorithm is an asymmetric public-key algorithm based on the difficulty of computing discrete logarithms on elliptic curves, offering strong security with shorter key lengths?",
    choices: ["AES-256", "RSA 4096", "ECC (Elliptic Curve Cryptography)", "SHA-3"],
    answerIndex: 2,
    reference: "CompTIA Security+ Domain 2.8 - Cryptography Concepts",
    explanation: "ECC provides equivalent or greater cryptographic strength with significantly smaller keys (e.g. 256-bit ECC ≈ 3072-bit RSA), drastically reducing compute overhead."
  },
  {
    id: "secplus-4",
    category: "security-plus",
    categoryLabel: "CompTIA Security+",
    text: "An employee receives an urgent, highly tailored email supposedly from their company CEO requesting an emergency wire transfer to a vendor account. What specific social engineering attack is this?",
    choices: ["Watering hole attack", "Spear phishing / Whaling", "Pharming attack", "Vishing attack"],
    answerIndex: 1,
    reference: "CompTIA Security+ Domain 2.1 - Threat Vectors and Attack Types",
    explanation: "Whaling is targeted spear phishing directed at or masquerading as high-profile executive leadership to authorize fraudulent transfers or divulge trade secrets."
  },
  {
    id: "secplus-5",
    category: "security-plus",
    categoryLabel: "CompTIA Security+",
    text: "Which authentication protocol uses tickets issued by a Key Distribution Center (KDC) comprising an Authentication Server (AS) and a Ticket-Granting Server (TGS) to prevent password transmission across networks?",
    choices: ["SAML 2.0", "Kerberos (Port 88)", "RADIUS", "OAuth 2.0"],
    answerIndex: 1,
    reference: "CompTIA Security+ Domain 3.7 - Identity and Access Management",
    explanation: "Kerberos authenticates clients using time-stamped symmetric tickets granted by the KDC (AS and TGS), eliminating cleartext credential transmission on Active Directory networks."
  },
  {
    id: "secplus-6",
    category: "security-plus",
    categoryLabel: "CompTIA Security+",
    text: "What access control model restricts access based strictly on security clearances assigned to subjects and classification labels (e.g., Top Secret, Confidential) assigned to data objects?",
    choices: ["DAC (Discretionary Access Control)", "RBAC (Role-Based Access Control)", "MAC (Mandatory Access Control)", "ABAC (Attribute-Based Access Control)"],
    answerIndex: 2,
    reference: "CompTIA Security+ Domain 3.7 - Access Control Models",
    explanation: "Mandatory Access Control (MAC) enforces fixed security labels and clearance levels dictated by a central authority; individual owners cannot alter permissions."
  },
  {
    id: "secplus-7",
    category: "security-plus",
    categoryLabel: "CompTIA Security+",
    text: "In incident response planning, what metric represents the maximum acceptable duration of time that a business process can be inoperable following an outage before catastrophic damage occurs?",
    choices: ["MTBF (Mean Time Between Failures)", "RTO (Recovery Time Objective)", "RPO (Recovery Point Objective)", "MTTR (Mean Time to Repair)"],
    answerIndex: 1,
    reference: "CompTIA Security+ Domain 5.3 - Business Continuity & Disaster Recovery",
    explanation: "RTO (Recovery Time Objective) defines the maximum tolerable downtime a system can be down before restoration. RPO defines maximum acceptable data loss in time."
  },
  {
    id: "secplus-8",
    category: "security-plus",
    categoryLabel: "CompTIA Security+",
    text: "Which network security device uses deep packet inspection, application awareness, and integrated threat intelligence to detect and automatically terminate malicious connections in real time inline?",
    choices: ["Stateless packet filter firewall", "NIPS (Network Intrusion Prevention System) / NGFW", "Passive SPAN port network tap", "Proxy cache server"],
    answerIndex: 1,
    reference: "CompTIA Security+ Domain 3.2 - Security Appliances & Controls",
    explanation: "A NIPS sits inline on the network to actively detect and block malicious traffic in real time, unlike a passive NIDS that only generates alerts."
  }
];

export function selectCertQuestions(
  category: CertCategory = 'all',
  limit: number = 5,
  random: () => number = Math.random
): CertQuestion[] {
  let pool = category === 'all'
    ? [...certQuestions]
    : certQuestions.filter(q => q.category === category);

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const sample = Math.min(Math.max(random(), 0), 0.9999999999999999);
    const j = Math.floor(sample * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const safeLimit = Number.isInteger(limit) ? Math.max(0, limit) : 0;
  return pool.slice(0, Math.min(safeLimit, pool.length));
}
