'use client';

import React, { useState, useCallback } from 'react';

const GRID_SIZE = 7;
const INITIAL_MOVES = 20;
const TARGET_SCORE = 1200;

const GEMS = [
  { id: 'cyan', label: '◆', color: '#38bdf8', name: 'Signal' },
  { id: 'gold', label: '★', color: '#facc15', name: 'Star' },
  { id: 'rose', label: '♥', color: '#fb7185', name: 'Heart' },
  { id: 'emerald', label: '✦', color: '#34d399', name: 'Grace' },
  { id: 'violet', label: '⬡', color: '#c084fc', name: 'Core' },
] as const;

type GemId = (typeof GEMS)[number]['id'];
type Grid = GemId[][];

function randomGem(): GemId {
  return GEMS[Math.floor(Math.random() * GEMS.length)].id;
}

function createInitialGrid(): Grid {
  const grid: Grid = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    grid[r] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      let gem = randomGem();
      while (
        (c >= 2 && grid[r][c - 1] === gem && grid[r][c - 2] === gem) ||
        (r >= 2 && grid[r - 1][c] === gem && grid[r - 2][c] === gem)
      ) {
        gem = randomGem();
      }
      grid[r][c] = gem;
    }
  }
  return grid;
}

function findMatches(grid: Grid): Set<string> {
  const matched = new Set<string>();
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE - 2; c++) {
      const g = grid[r][c];
      if (g && g === grid[r][c + 1] && g === grid[r][c + 2]) {
        matched.add(`${r}:${c}`);
        matched.add(`${r}:${c + 1}`);
        matched.add(`${r}:${c + 2}`);
      }
    }
  }
  for (let c = 0; c < GRID_SIZE; c++) {
    for (let r = 0; r < GRID_SIZE - 2; r++) {
      const g = grid[r][c];
      if (g && g === grid[r + 1][c] && g === grid[r + 2][c]) {
        matched.add(`${r}:${c}`);
        matched.add(`${r + 1}:${c}`);
        matched.add(`${r + 2}:${c}`);
      }
    }
  }
  return matched;
}

function resolveCascades(startGrid: Grid): { grid: Grid; points: number } {
  let current = startGrid.map((row) => [...row]);
  let totalPoints = 0;
  let combo = 1;

  while (true) {
    const matches = findMatches(current);
    if (matches.size === 0) break;
    totalPoints += matches.size * 30 * combo;

    for (const key of matches) {
      const [r, c] = key.split(':').map(Number);
      (current[r][c] as GemId | null) = null;
    }

    for (let c = 0; c < GRID_SIZE; c++) {
      const col: GemId[] = [];
      for (let r = GRID_SIZE - 1; r >= 0; r--) {
        if (current[r][c]) col.push(current[r][c]);
      }
      while (col.length < GRID_SIZE) {
        col.push(randomGem());
      }
      for (let r = GRID_SIZE - 1, idx = 0; r >= 0; r--, idx++) {
        current[r][c] = col[idx];
      }
    }
    combo++;
  }

  return { grid: current, points: totalPoints };
}

function findHintPair(grid: Grid): [string, string] | null {
  const dirs = [
    [0, 1],
    [1, 0],
  ];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= GRID_SIZE || nc >= GRID_SIZE) continue;
        const copy = grid.map((row) => [...row]);
        const tmp = copy[r][c];
        copy[r][c] = copy[nr][nc];
        copy[nr][nc] = tmp;
        if (findMatches(copy).size > 0) {
          return [`${r}:${c}`, `${nr}:${nc}`];
        }
      }
    }
  }
  return null;
}

export default function Match3() {
  const [grid, setGrid] = useState<Grid>(() => createInitialGrid());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(INITIAL_MOVES);
  const [status, setStatus] = useState('Swap two neighboring tiles to match 3 or more.');
  const [hint, setHint] = useState<Set<string>>(new Set());

  const resetGame = useCallback(() => {
    setGrid(createInitialGrid());
    setSelected(null);
    setScore(0);
    setMoves(INITIAL_MOVES);
    setHint(new Set());
    setStatus('New board ready. Match 3 or more!');
  }, []);

  const handleCellClick = (r: number, c: number) => {
    if (moves <= 0) return;
    setHint(new Set());

    if (!selected) {
      setSelected([r, c]);
      return;
    }

    const [sr, sc] = selected;
    if (sr === r && sc === c) {
      setSelected(null);
      return;
    }

    const isAdjacent = Math.abs(sr - r) + Math.abs(sc - c) === 1;
    if (!isAdjacent) {
      setSelected([r, c]);
      return;
    }

    const swapped = grid.map((row) => [...row]);
    const tmp = swapped[sr][sc];
    swapped[sr][sc] = swapped[r][c];
    swapped[r][c] = tmp;

    if (findMatches(swapped).size === 0) {
      setSelected(null);
      setStatus('No match there — try another adjacent pair.');
      return;
    }

    const { grid: settled, points } = resolveCascades(swapped);
    const nextScore = score + points;
    const nextMoves = moves - 1;
    setGrid(settled);
    setSelected(null);
    setScore(nextScore);
    setMoves(nextMoves);

    if (nextScore >= TARGET_SCORE) {
      setStatus(`Target reached (${nextScore} pts)! Keep playing or start a new board.`);
    } else if (nextMoves === 0) {
      setStatus(`Out of moves! Final score: ${nextScore}.`);
    } else {
      setStatus(`+${points} pts!`);
    }
  };

  const showHint = () => {
    const pair = findHintPair(grid);
    if (pair) {
      setHint(new Set(pair));
      setStatus('Hint highlighted on the board.');
    } else {
      setGrid(createInitialGrid());
      setStatus('No valid moves left — shuffled a fresh board!');
    }
  };

  return (
    <div style={{ maxWidth: '520px', margin: '0 auto', padding: '1.25rem', color: '#f1f5f9' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '0.6rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>SCORE</div>
          <strong style={{ fontSize: '1.25rem', color: '#38bdf8' }}>{score}</strong>
        </div>
        <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '0.6rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>MOVES</div>
          <strong style={{ fontSize: '1.25rem', color: '#facc15' }}>{moves}</strong>
        </div>
        <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '0.6rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>TARGET</div>
          <strong style={{ fontSize: '1.25rem', color: '#34d399' }}>{TARGET_SCORE}</strong>
        </div>
      </div>

      <div
        role="grid"
        aria-label="Match-3 game board"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gap: '6px',
          background: '#090f1d',
          padding: '10px',
          borderRadius: '14px',
          border: '1px solid rgba(56, 189, 248, 0.35)',
        }}
      >
        {grid.map((row, r) =>
          row.map((gemId, c) => {
            const gem = GEMS.find((g) => g.id === gemId) ?? GEMS[0];
            const isSelected = selected?.[0] === r && selected?.[1] === c;
            const isHint = hint.has(`${r}:${c}`);
            return (
              <button
                key={`${r}:${c}`}
                type="button"
                aria-label={`${gem.name} at row ${r + 1} column ${c + 1}`}
                onClick={() => handleCellClick(r, c)}
                style={{
                  aspectRatio: '1',
                  borderRadius: '10px',
                  border: isSelected
                    ? '2px solid #ffffff'
                    : isHint
                      ? '2px solid #facc15'
                      : '1px solid rgba(148, 163, 184, 0.25)',
                  background: isSelected ? 'rgba(56, 189, 248, 0.25)' : '#131d33',
                  color: gem.color,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                {gem.label}
              </button>
            );
          }),
        )}
      </div>

      <p role="status" aria-live="polite" style={{ margin: '0.9rem 0', color: '#cbd5e1', minHeight: '1.5rem' }}>
        {status}
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={showHint}
          style={{
            padding: '0.55rem 1rem',
            borderRadius: '8px',
            border: '1px solid #38bdf8',
            background: 'rgba(56, 189, 248, 0.16)',
            color: '#e0f2fe',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Show Hint
        </button>
        <button
          type="button"
          onClick={resetGame}
          style={{
            padding: '0.55rem 1rem',
            borderRadius: '8px',
            border: '1px solid #475569',
            background: '#1e293b',
            color: '#f1f5f9',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          New Board
        </button>
      </div>
    </div>
  );
}
