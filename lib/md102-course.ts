/** Original, unofficial MD-102 learning activities based on the public Microsoft study guide. */
export type Lesson = {
  id: string;
  title: string;
  weight: string;
  overview: string;
  objectives: string[];
  question: string;
  answers: [string, string, string, string];
  correct: number;
  explanation: string;
};
export const MD102_GUIDE = "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/md-102";
export const MD102_CERT = "https://learn.microsoft.com/en-us/credentials/certifications/modern-desktop/";
export const md102Lessons: Lesson[] = [
  {
    id: "infrastructure",
    title: "Prepare infrastructure for devices",
    weight: "20–25%",
    overview: "Plan device identity, enrollment and compliance across supported platforms.",
    objectives: ["Compare Microsoft Entra registration with join.", "Select Windows, Apple and Android enrollment approaches.", "Plan Intune RBAC, scope tags and Conditional Access."],
    question: "A Windows device must be organization-managed and enrolled automatically in Intune. What should you plan first?",
    answers: ["Only create a local administrator account", "Confirm Entra join and MDM enrollment configuration", "Disable compliance evaluation", "Copy an existing user's browser profile"],
    correct: 1,
    explanation: "Device identity and automatic MDM enrollment need appropriate tenant configuration. A local account alone does not provide organization enrollment."
  },
  {
    id: "devices",
    title: "Manage and maintain devices",
    weight: "25–30%",
    overview: "Deploy Windows devices, configure policies, manage updates and operational lifecycle.",
    objectives: ["Distinguish Autopilot deployment profiles and device preparation policies.", "Plan device configuration profiles.", "Evaluate Windows 365 and Windows update management."],
    question: "Before assigning an Autopilot deployment to a large fleet, which practice best reduces operational risk?",
    answers: ["Deploy to all devices immediately", "Disable enrollment status reporting", "Validate enrollment and applications with a small pilot ring", "Require every employee to reinstall Windows manually"],
    correct: 2,
    explanation: "A controlled pilot validates the enrollment and application experience before broad rollout."
  },
  {
    id: "protection",
    title: "Protect devices",
    weight: "15–20%",
    overview: "Apply security baselines and endpoint protection while assessing recovery procedures.",
    objectives: ["Review device security and endpoint protection settings.", "Understand BitLocker recovery governance.", "Evaluate Defender for Endpoint integration."],
    question: "A managed Windows laptop displays a BitLocker recovery prompt. What is the appropriate next step?",
    answers: ["Share the recovery key in a public support thread", "Verify device ownership and use the organization's approved recovery process", "Disable device encryption for the entire organization", "Clear the TPM before checking the device record"],
    correct: 1,
    explanation: "Verify the requester and device, then use an authorized recovery process without exposing recovery material."
  },
  {
    id: "applications",
    title: "Manage and secure applications",
    weight: "15–20%",
    overview: "Assign and maintain applications using Intune and application-protection controls.",
    objectives: ["Select appropriate application deployment types.", "Review application assignment and update practices.", "Plan app protection for company information."],
    question: "An application must reach a pilot group before all managed devices. What is the safest assignment strategy?",
    answers: ["Assign it to all users immediately", "Publish without monitoring", "Target a dedicated pilot group and review install results", "Disable application reporting"],
    correct: 2,
    explanation: "A scoped pilot group provides installation evidence and catches compatibility problems before broad assignment."
  },
  {
    id: "automation",
    title: "Optimize with automation, monitoring and reporting",
    weight: "10–15%",
    overview: "Use PowerShell, Microsoft Graph and reporting to improve endpoint operations.",
    objectives: ["Identify read-only Microsoft Graph reporting patterns.", "Use PowerShell for repeatable diagnostics.", "Recognize opportunities and risks of AI-assisted operational workflows."],
    question: "A dashboard shows no check-in timestamp for 100 devices. How should the report classify their freshness?",
    answers: ["All healthy", "All offline", "Unknown until the data source is verified", "Automatically compliant"],
    correct: 2,
    explanation: "Missing telemetry is not evidence of a healthy, stale or compliant endpoint. Treat it as unknown and investigate."
  }
];
export const MD102_IDS = md102Lessons.map(lesson => lesson.id);
