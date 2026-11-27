'use client';

import React, { useState } from 'react';
import VimDefender from './vim-defender/VimDefender';
import Match3 from './match3/Match3';
import Level1NexusDefense from './matrix-of-conscience/Level1NexusDefense';
import { ConscienceProvider } from './matrix-of-conscience/ConscienceProvider';

export default function GamesList() {
  const [selected, setSelected] = useState<'td' | 'vim' | 'match'>('td');
  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => setSelected('td')}>Tower Defense</button>
        <button type="button" onClick={() => setSelected('match')}>Match-3</button>
        <button type="button" onClick={() => setSelected('vim')}>VIM Defender</button>
      </div>
      {selected === 'td' ? (
        <ConscienceProvider>
          <Level1NexusDefense onBack={() => setSelected('td')} onVictory={() => setSelected('match')} />
        </ConscienceProvider>
      ) : selected === 'match' ? (
        <Match3 />
      ) : (
        <VimDefender />
      )}
    </div>
  );
}
