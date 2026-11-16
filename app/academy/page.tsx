import Link from "next/link";
import type { Metadata } from "next";
import RoleQuest from "../../components/RoleQuest";
import { certificationMissions } from "../../lib/certification-quests";

export const metadata: Metadata = {
  title: "A+ Network+ Security+ Practice | Nicholai",
  description: "Original CompTIA-aligned foundation lessons and knowledge checks.",
};

export default function Page() {
  return (
    <div className="container page">
      <p className="eyebrow">NEXUS CERTIFICATION ACADEMY</p>
      <h1>Learn by role. Practice by mission.</h1>
      <RoleQuest missions={certificationMissions} storageId="nicholai-cert-quests-v1" />
      <p>
        Start with quick lessons for A+, Network+, and Security+. Answer scenario-based
        questions, read explanations, and replay to improve your score. These are
        original, unofficial practice questions—not CompTIA exam content or a
        certification guarantee.
      </p>
      <p>
        <Link href="/agent">Public Agent Nexus</Link> ·{" "}
        <Link href="/tools">Engineering tools</Link>
      </p>
      <p>
        See current exam versions, objectives, and policies on the official
        CompTIA pages for{" "}
        <a href="https://www.comptia.org/en-us/certifications/a/">A+</a>,{" "}
        <a href="https://www.comptia.org/en-us/certifications/network/">Network+</a>,
        and{" "}
        <a href="https://www.comptia.org/en-us/certifications/security/">Security+</a>.
      </p>
    </div>
  );
}
