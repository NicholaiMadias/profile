import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Arcade | Nicholai.Online',
  description: 'Play Tower Defense, Match-3, VIM Defender, Matrix of Conscience, and knowledge challenges.',
};

const GAMES = [
  {
    href: '/arcade/tower-defense',
    eyebrow: 'TOWER DEFENSE · ALL STAGES UNLOCKED',
    title: 'Matrix Tower Defense',
    description: 'Build Pulse, Rapid Ion, Railgun, EMP, Plasma, and Tesla turrets across Nexus Defense, Syndicate Siege, and Sovereign Conscience.',
    cta: 'Play Tower Defense →',
    primary: true,
  },
  {
    href: '/arcade/match3',
    eyebrow: 'PUZZLE · 7×7 CASCADE',
    title: 'Match-3: Code Matrix',
    description: 'Swap neighboring gems to create 3+ matches, trigger cascades, and hit the target score before running out of moves.',
    cta: 'Play Match-3 →',
    primary: true,
  },
  {
    href: '/arcade/vim-defender',
    eyebrow: 'ARCADE SHOOTER · VIM KEYS',
    title: 'VIM Defender',
    description: 'Move with H/J/K/L or arrow keys, dodge incoming threats, and fire to defend the terminal.',
    cta: 'Play VIM Defender →',
    primary: true,
  },
  {
    href: '/nexus-os/matrix-of-conscience',
    eyebrow: 'CAMPAIGN · 10 SECTORS UNLOCKED',
    title: 'Matrix of Conscience',
    description: 'Explore the 10-sector star grid and deploy directly into any defense or campaign mission.',
    cta: 'Open Campaign Map →',
    primary: false,
  },
  {
    href: '/arcade/quick-click',
    eyebrow: 'REFLEX ARCADE',
    title: 'Quick Click',
    description: 'Fast-paced target clicking challenge to test reaction speed and accuracy.',
    cta: 'Play Quick Click →',
    primary: false,
  },
  {
    href: '/arcade/cert-arena',
    eyebrow: 'OPTIONAL QUIZ',
    title: 'Cert Arena',
    description: 'Optional CompTIA A+, Network+, and Security+ practice questions.',
    cta: 'Open Cert Arena →',
    primary: false,
  },
  {
    href: '/arcade/bible-quiz',
    eyebrow: 'OPTIONAL QUIZ',
    title: 'Bible Quiz',
    description: 'Optional Scripture knowledge questions with explanations.',
    cta: 'Open Bible Quiz →',
    primary: false,
  },
];

export default function ArcadeHubPage() {
  return (
    <main style={{ maxWidth: '1040px', margin: '0 auto', padding: '2.5rem 1.25rem', color: '#f1f5f9' }}>
      <header style={{ marginBottom: '2rem' }}>
        <p style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', margin: '0 0 0.5rem' }}>
          NICHOLAI.ONLINE · ARCADE HUB
        </p>
        <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', margin: '0 0 0.75rem' }}>
          Games &amp; Tactical Arcade
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '64ch', margin: 0, lineHeight: 1.6 }}>
          Jump straight into Tower Defense, Match-3, or Arcade Shooter gameplay—every stage is unlocked with no mandatory quiz gates.
        </p>
      </header>

      <section
        aria-label="Arcade games"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.1rem',
        }}
      >
        {GAMES.map((game) => (
          <article
            key={game.href}
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: game.primary ? '1px solid rgba(56, 189, 248, 0.45)' : '1px solid rgba(148, 163, 184, 0.25)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.9rem',
            }}
          >
            <div>
              <p style={{ color: '#38bdf8', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.09em', margin: '0 0 0.35rem' }}>
                {game.eyebrow}
              </p>
              <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: '#f8fafc' }}>{game.title}</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>{game.description}</p>
            </div>
            <Link
              href={game.href}
              style={{
                display: 'inline-block',
                alignSelf: 'flex-start',
                padding: '0.55rem 0.95rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                background: game.primary ? '#38bdf8' : 'rgba(148, 163, 184, 0.16)',
                color: game.primary ? '#020617' : '#e2e8f0',
              }}
            >
              {game.cta}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
