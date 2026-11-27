import type { Metadata } from 'next';
import Link from 'next/link';
import Match3 from '../../../lib/games/match3/Match3';

export const metadata: Metadata = {
  title: 'Match-3: Code Matrix | Nicholai.Online',
  description: 'Play 7x7 Match-3 puzzle gameplay with cascades, hints, and score targets.',
};

export default function Match3Page() {
  return (
    <main style={{ minHeight: '100vh', background: '#050814', color: '#f1f5f9', padding: '1.5rem 1rem' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/arcade" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 700 }}>
          ← Arcade Hub
        </Link>
        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Match-3 Puzzle</span>
      </div>
      <h1 style={{ textAlign: 'center', margin: '0 0 0.5rem' }}>Match-3: Code Matrix</h1>
      <Match3 />
    </main>
  );
}
