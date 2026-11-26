'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ConscienceProvider } from '../../../lib/games/matrix-of-conscience/ConscienceProvider';

const MatrixOfConscienceApp = dynamic(() => import('../../../lib/games/matrix-of-conscience/MatrixOfConscienceApp'), {
  ssr: false,
});

export default function MatrixGame({ initialLevel = 0 }: { initialLevel?: number }) {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <ConscienceProvider>
        <MatrixOfConscienceApp initialLevel={initialLevel} />
      </ConscienceProvider>
    </div>
  );
}
