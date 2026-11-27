'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ConscienceProvider } from '../../../lib/games/matrix-of-conscience/ConscienceProvider';
import Level1NexusDefense from '../../../lib/games/matrix-of-conscience/Level1NexusDefense';
import Level2SyndicateSiege from '../../../lib/games/matrix-of-conscience/Level2SyndicateSiege';
import Level3SovereignConscience from '../../../lib/games/matrix-of-conscience/Level3SovereignConscience';

type Stage = 1 | 2 | 3;

export default function TowerDefensePage() {
  const [stage, setStage] = useState<Stage>(1);
  const [banner, setBanner] = useState<string>('');

  return (
    <ConscienceProvider>
      <div style={{ minHeight: '100vh', background: '#050814', color: '#f1f5f9', padding: '1rem' }}>
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto 1rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/arcade" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 700 }}>
              ← Arcade Hub
            </Link>
            <strong style={{ fontSize: '1.05rem' }}>Matrix Tower Defense</strong>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} role="group" aria-label="Select Tower Defense stage">
            {[
              { id: 1 as Stage, label: 'Stage 1: Nexus Defense' },
              { id: 2 as Stage, label: 'Stage 2: Syndicate Siege' },
              { id: 3 as Stage, label: 'Stage 3: Sovereign Conscience' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setStage(item.id);
                  setBanner('');
                }}
                style={{
                  padding: '0.45rem 0.8rem',
                  borderRadius: '8px',
                  border: stage === item.id ? '1px solid #38bdf8' : '1px solid rgba(148,163,184,0.3)',
                  background: stage === item.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.9)',
                  color: stage === item.id ? '#7dd3fc' : '#cbd5e1',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {banner && (
          <div
            role="status"
            style={{
              maxWidth: '960px',
              margin: '0 auto 1rem',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.16)',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              color: '#6ee7b7',
              fontWeight: 600,
            }}
          >
            {banner}
          </div>
        )}

        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {stage === 1 && (
            <Level1NexusDefense
              onBack={() => setStage(1)}
              onVictory={() => {
                setBanner('Stage 1 cleared! Advancing to Stage 2: Syndicate Siege.');
                setStage(2);
              }}
            />
          )}
          {stage === 2 && (
            <Level2SyndicateSiege
              sectorId={2}
              onBack={() => setStage(1)}
              onVictory={() => {
                setBanner('Stage 2 cleared! Advancing to Stage 3: Sovereign Conscience.');
                setStage(3);
              }}
            />
          )}
          {stage === 3 && (
            <Level3SovereignConscience
              sectorId={3}
              onBack={() => setStage(2)}
              onVictory={() => {
                setBanner('All 3 Tower Defense stages cleared!');
              }}
            />
          )}
        </div>
      </div>
    </ConscienceProvider>
  );
}
