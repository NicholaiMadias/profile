import type { Metadata } from 'next';
import Link from 'next/link';

const title = "10 Practical AI Prompts, PowerShell Scripts, and Python Workflows for Hybrid Endpoints";
const description = 'A hands-on toolkit for Workspace ONE, Intune, Entra ID, and Active Directory engineers.';

export const metadata: Metadata = { title, description };

const workflows = [
  [
    "Endpoint compliance auditor",
    "Use AD inventory to flag stale computer records for review. LastLogonDate is a replicated activity signal. Confirm device activity and compliance in your endpoint platform before taking action.",
    "$cutoff = (Get-Date).AddDays(-90)\nGet-ADComputer -Filter * -Properties LastLogonDate, OperatingSystem |\n  Select-Object Name, OperatingSystem, LastLogonDate, @{\n    Name = 'Status'\n    Expression = {\n      if (-not $_.LastLogonDate) { 'Unknown' }\n      elseif ($_.LastLogonDate -lt $cutoff) { 'Inactive' }\n      else { 'Active' }\n    }\n  } | Export-Csv .\\EndpointComplianceReport.csv -NoTypeInformation"
  ],
  [
    "Workspace ONE Chrome version sensor",
    "Configure a String response and run the sensor in a 64-bit PowerShell context on 64-bit Windows. This checks machine-wide installs in both registry views and emits one string.",
    "$paths = @(\n  'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome'\n  'HKLM:\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome'\n)\ntry {\n  foreach ($path in $paths) {\n    if (Test-Path -LiteralPath $path -ErrorAction Stop) {\n      $version = (Get-ItemProperty -LiteralPath $path -ErrorAction Stop).DisplayVersion\n      if ($version) { [string]$version; return }\n      'Version unavailable'; return\n    }\n  }\n  'Not installed'\n} catch {\n  'Detection error'\n}"
  ],
  [
    "Workspace ONE device inventory via REST",
    "Use the tenant’s API host and a short-lived OAuth access token with inventory access. Set the three environment variables from your approved configuration and credential sources. Check the tenant’s API documentation for its supported page size.",
    "$api = ([uri]$env:WS1_API_BASE)\nif (-not $api.IsAbsoluteUri -or $api.Scheme -ne 'https' -or\n    -not $env:WS1_ACCESS_TOKEN -or -not $env:WS1_TENANT_CODE) {\n  throw 'Set an HTTPS API base, OAuth token, and tenant code.'\n}\n$headers = @{\n  Authorization = \"Bearer $env:WS1_ACCESS_TOKEN\"\n  'aw-tenant-code' = $env:WS1_TENANT_CODE\n  Accept = 'application/json'\n}\n$base = $api.GetLeftPart([System.UriPartial]::Authority)\n$size = 100\n& {\n  for ($page = 0; ; $page++) {\n    $uri = \"$base/API/mdm/devices/search?page=$page&pagesize=$size\"\n    $result = Invoke-RestMethod -Uri $uri -Headers $headers -ErrorAction Stop\n    if (-not $result.Devices) { break }\n    $result.Devices | Select-Object FriendlyName, Platform, SerialNumber, LastSeen\n    if ($result.Total -and ($page + 1) * $size -ge $result.Total) { break }\n  }\n} | Export-Csv .\\WorkspaceOneDevices.csv -NoTypeInformation"
  ],
  [
    "Windows service health audit",
    "Compare status and startup mode with the device baseline. Services such as BITS can stop when idle, so use this report alongside symptoms and event logs.",
    "foreach ($name in 'wuauserv', 'BITS', 'EventLog', 'LanmanWorkstation') {\n  $service = Get-Service -Name $name -ErrorAction SilentlyContinue\n  [pscustomobject]@{\n    Name = $name\n    Status = if ($service) { $service.Status } else { 'Unavailable' }\n    StartType = if ($service) { $service.StartType }\n  }\n}"
  ],
  [
    "Entra ID stale account report",
    "Request sign-in activity explicitly. Reading it requires the appropriate Microsoft Entra ID license, Graph permissions, and delegated role. Review accounts without recorded activity separately.",
    "Connect-MgGraph -Scopes 'User.Read.All', 'AuditLog.Read.All'\n$cutoff = [DateTimeOffset]::UtcNow.AddDays(-90)\nGet-MgUser -All -Property DisplayName,UserPrincipalName,AccountEnabled,SignInActivity |\n  Select-Object DisplayName, UserPrincipalName, AccountEnabled, @{\n    Name = 'LastSuccessfulSignIn'\n    Expression = { $_.SignInActivity.LastSuccessfulSignInDateTime }\n  }, @{\n    Name = 'Activity'\n    Expression = {\n      $last = $_.SignInActivity.LastSuccessfulSignInDateTime\n      if (-not $last) { 'Unknown' }\n      elseif ([DateTimeOffset]$last -lt $cutoff) { 'Stale' }\n      else { 'Recent' }\n    }\n  } | Export-Csv .\\EntraUsers.csv -NoTypeInformation"
  ],
  [
    "Python device dashboard",
    "Install pandas and plotly in your Python environment. Chart the activity classifications produced in example 1.",
    "import pandas as pd\nimport plotly.express as px\n\ndevices = pd.read_csv(\"EndpointComplianceReport.csv\")\ncounts = devices[\"Status\"].value_counts().rename_axis(\"Status\").reset_index(name=\"Devices\")\npx.bar(counts, x=\"Status\", y=\"Devices\", title=\"AD device activity\").show()"
  ],
  [
    "ServiceNow incident trend analysis",
    "Use an export containing Category. Frequency tells you where to investigate. Read a sample of the underlying incidents before assigning a cause.",
    "import pandas as pd\n\nincidents = pd.read_csv(\"incidents.csv\")\ncategories = incidents[\"Category\"].fillna(\"Uncategorized\").str.strip()\nprint(categories.replace(\"\", \"Uncategorized\").value_counts().head(10))"
  ],
  [
    "Detect missing applications before remediation",
    "Check machine-wide uninstall entries without querying Win32_Product. Route missing apps to your approved Workspace ONE or Intune deployment after validating this detection logic on a pilot group.",
    "$paths = @(\n  'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall'\n  'HKLM:\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall'\n)\n$installed = foreach ($path in $paths) {\n  if (Test-Path -LiteralPath $path -ErrorAction Stop) {\n    (Get-ItemProperty -Path \"$path\\*\" -ErrorAction Stop).DisplayName\n  }\n}\nforeach ($app in 'Google Chrome', '7-Zip') {\n  [pscustomobject]@{\n    App = $app\n    Present = [bool]($installed -like \"$app*\")\n  }\n}"
  ],
  [
    "Reusable REST API request",
    "Use an HTTPS URI and pass credentials through headers. The wrapper propagates HTTP failures to the caller so a scheduled job can report them.",
    "function Invoke-ApiRequest {\n  param(\n    [Parameter(Mandatory)][uri]$Uri,\n    [Parameter(Mandatory)][hashtable]$Headers\n  )\n  if (-not $Uri.IsAbsoluteUri -or $Uri.Scheme -ne 'https') {\n    throw 'Use an absolute HTTPS URI.'\n  }\n  Invoke-RestMethod -Uri $Uri -Headers $Headers -Method Get -TimeoutSec 30 -ErrorAction Stop\n}"
  ],
  [
    "Hybrid endpoint inventory reconciliation",
    "Normalize both exports to a shared stable DeviceId before joining. The merge rejects duplicate IDs and identifies records present in only one source. Use platform compliance and check-in fields for a separate health assessment.",
    "import pandas as pd\n\ndef load_inventory(path):\n    frame = pd.read_csv(path, dtype={\"DeviceId\": \"string\"})\n    frame[\"DeviceId\"] = frame[\"DeviceId\"].str.strip().str.casefold()\n    if frame[\"DeviceId\"].fillna(\"\").eq(\"\").any():\n        raise ValueError(f\"{path} contains a missing DeviceId\")\n    return frame\n\nreport = load_inventory(\"ad_devices.csv\").merge(\n    load_inventory(\"intune_devices.csv\"),\n    on=\"DeviceId\", how=\"outer\", validate=\"one_to_one\",\n    suffixes=(\"_AD\", \"_Intune\"), indicator=\"InventoryMatch\",\n)\nreport.to_csv(\"HybridHealthReport.csv\", index=False)"
  ]
];

const prompts = [
  [
    "Workspace ONE sensor builder",
    "Act as a senior Workspace ONE engineer. Write a PowerShell sensor for Chrome’s machine-wide version. Check both registry views and return one string. Include expected output and a test matrix."
  ],
  [
    "Intune policy translator",
    "Map this Intune configuration to Workspace ONE. Identify equivalent settings, gaps, rollout risks, and a pilot plan."
  ],
  [
    "Incident investigator",
    "Review these redacted logs as a Tier 3 endpoint engineer. Identify affected systems, likely causes, remediation steps, and evidence still needed."
  ],
  [
    "PowerShell reviewer",
    "Review this script for bugs, security issues, performance, and idempotency. Explain each proposed change."
  ],
  [
    "Graph API assistant",
    "Draft a Microsoft Graph PowerShell inventory script with least-privilege permissions, pagination, throttling handling, and error reporting."
  ],
  [
    "Compliance auditor",
    "Review this anonymized inventory for unsupported operating systems, stale devices, compliance gaps, and remediation priorities. Identify missing evidence."
  ],
  [
    "Documentation writer",
    "Document this script’s purpose, prerequisites, workflow, troubleshooting, and change management requirements."
  ],
  [
    "Executive dashboard generator",
    "Summarize this endpoint dataset for leadership. Define each KPI and its denominator, and explain trends, gaps, risks, and actions."
  ],
  [
    "Root cause analyst",
    "Review this incident as a principal platform engineer. Rank possible causes, show the supporting evidence, and propose tests that would confirm each cause."
  ],
  [
    "Automation architect",
    "Design a workflow across Workspace ONE, Intune, Entra ID, AD, ServiceNow, and PowerShell. Specify ownership, approvals, rollback, logging, monitoring, and reporting."
  ]
];

export default function HybridEndpointAutomation() {
  return (
    <article className="blog-shell blog-article">
      <header>
        <p className="blog-meta"><time dateTime="2026-11-11">November 11, 2026</time> · Endpoint Engineering</p>
        <h1>{title}</h1>
        <p className="blog-deck">{description}</p>
        <p><Link href="/blog">Back to Nicholai’s Blog</Link></p>
      </header>
      <p>Use PowerShell to collect device and identity data, Python to compare and report it, and AI to help draft scripts and investigate patterns. Start with read-only reports, then test detection and rollout logic on a pilot group.</p>
      <h2>Ten scripts and workflows</h2>
      {workflows.map(([name, guidance, code], index) => (
        <section key={name}>
          <h3>{index + 1}. {name}</h3>
          <p>{guidance}</p>
          <pre><code>{code}</code></pre>
        </section>
      ))}
      <h2>Ten AI prompts for endpoint engineers</h2>
      <p>Use redacted data or an approved internal model. Review generated scripts and test them with representative inputs before production use.</p>
      <ol>
        {prompts.map(([name, prompt]) => (
          <li key={name}><strong>{name}</strong><blockquote>{prompt}</blockquote></li>
        ))}
      </ol>
      <h2>Tools for a hybrid endpoint stack</h2>
      <p>For Python reporting and automation, consider pandas, Plotly, requests, openpyxl, Flask, Streamlit, psutil, pywin32, SQLAlchemy, Rich, and PyJWT. Choose packages based on the reporting or integration task.</p>
      <p>For PowerShell, common choices include Microsoft.Graph, ActiveDirectory, ExchangeOnlineManagement, Az, PSWindowsUpdate, ImportExcel, Pester, PSScriptAnalyzer, VMware.PowerCLI, and ThreadJob.</p>
      <p>Use Workspace ONE and Intune for endpoint management, Entra ID and Active Directory for identity, PowerShell for administration, and Python for analysis. AI can help draft scripts, document workflows, and investigate patterns while engineers verify the results.</p>
      <h2>References</h2>
      <ul>
        <li><a href="https://docs.omnissa.com/Windows_Desktop_Management-VSaaS/uemWindeskSensors">Omnissa Workspace ONE UEM Sensors</a></li>
        <li><a href="https://developer.omnissa.com/workspace-one-uem-apis/">Omnissa Workspace ONE UEM APIs</a></li>
        <li><a href="https://learn.microsoft.com/en-us/entra/identity/monitoring-health/howto-manage-inactive-user-accounts">Microsoft Entra inactive accounts</a></li>
        <li><a href="https://learn.microsoft.com/en-us/powershell/module/activedirectory/get-adcomputer">Microsoft Get-ADComputer reference</a></li>
      </ul>
    </article>
  );
}
