import type { Metadata } from "next";
import Link from "next/link";
import MD102Course from "../../../components/MD102Course";

export const metadata: Metadata = {
  title: "MD-102 Endpoint Administrator Learning Path | Nicholai",
  description: "Free, unofficial MD-102 endpoint administration lessons, practice checks and progress tracking."
};

export default function Page() {
  return <div className="container page">
    <p><Link href="/academy">← Certification Academy</Link></p>
    <p className="eyebrow">NEXUS LMS · OPEN LEARNING PATH</p>
    <h1>MD-102 Endpoint Administrator</h1>
    <p>Study Microsoft Intune, Entra ID, device management, protection, applications and endpoint automation. Open to everyone—sign-in is optional.</p>
    <MD102Course />
  </div>;
}
