import type { Metadata } from 'next';
import Link from 'next/link';
import { CertQuizGame } from '../../../components/CertQuizGame';

export const metadata: Metadata = {
  title: 'CompTIA Certification Arena (A+, Network+, Security+) | Arcade',
  description: 'Sharpen your hardware, network architecture, and cybersecurity skills with interactive exam scenarios and diagnostic challenges.',
};

export default function CertQuizPage() {
  return (
    <div className="container page narrow">
      <Link className="text-link" href="/arcade">
        ← All games & Arcade
      </Link>
      <p className="eyebrow">TECH & SECURITY MASTERY</p>
      <h1>CompTIA Certification Arena</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        Practice official-style exam questions for <strong>CompTIA A+</strong>, <strong>Network+</strong>, and <strong>Security+</strong>. Test your knowledge across core domains, cloud architecture, and security protocols.
      </p>
      <CertQuizGame />
    </div>
  );
}
