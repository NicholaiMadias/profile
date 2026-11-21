import Link from "next/link";
import type { Metadata } from "next";
import RoleQuest from "../../components/RoleQuest";
import { certificationMissions } from "../../lib/certification-quests";

export const metadata: Metadata = {
  title: "A+ Network+ Security+ Practice | Nicholai",
  description:
    "Play six A+, Network+, and Security+ practice games with troubleshooting scenarios and answer review.",
};

export default function Page() {
  return (
    <div className="container page">
      <h1
        className="eyebrow"
        style={{ fontFamily: "inherit", fontSize: "0.68rem" }}
      >
        NEXUS CERTIFICATION ACADEMY
      </h1>
      <RoleQuest
        missions={certificationMissions}
        storageId="nicholai-cert-quests-v2"
      />
      <section className="feature-card" aria-labelledby="intune-academy-title">
        <p className="eyebrow">MICROSOFT ENDPOINT ADMINISTRATION</p>
        <h2 id="intune-academy-title">Intune operational readiness</h2>
        <p>Follow three official Microsoft Learn modules on reporting, RBAC, and tenant health, with an optional local checklist and practice quiz on Amazing Grace LMS.</p>
        <a href="https://www.amazinggracehl.org/lms/microsoft-intune/" target="_blank" rel="noopener noreferrer">Open the Intune learning path ↗</a>
        <p><a href="https://www.amazinggracehl.org/lms/microsoft-intune/mission/" target="_blank" rel="noopener noreferrer">Play Intune Ops: Incident Command — six training cases ↗</a></p>
      </section>
      <p>
        These original, unofficial practice questions cover selected
        certification topics. Use the official CompTIA objectives to plan your
        full exam preparation.
      </p>
      <p>
        <Link href="/agent">Public Agent Nexus</Link> ·{" "}
        <Link href="/tools">Engineering tools</Link>
      </p>
      <p>
        See current exam versions, objectives, and policies on the official
        CompTIA pages for{" "}
        <a href="https://www.comptia.org/en-us/certifications/a/">A+</a>,{" "}
        <a href="https://www.comptia.org/en-us/certifications/network/">
          Network+
        </a>
        , and{" "}
        <a href="https://www.comptia.org/en-us/certifications/security/">
          Security+
        </a>
        .
      </p>
    </div>
  );
}
