import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './arcade.module.css';

export const metadata: Metadata = {
  title: 'Arcade | Nicholai.Online',
  description: 'Play strategy games, classic campaigns, and quick skill challenges.',
};

const games = [
  { title: 'Quick Click', type: 'Reaction Game', copy: 'Catch as many stars as you can in twenty seconds.', href: '/arcade/quick-click' },
  { title: 'Word Sprint', type: 'Typing Game', copy: 'Type as many words as you can in thirty seconds and check your accuracy.', href: '/arcade/word-sprint' },
  { title: 'Vim Defender', type: 'Keyboard Game', copy: 'Practice Vim motions in a playable challenge.', href: '/arcade/vim-defender' },
  { title: 'Nexus Defense', type: 'Tower Defense', copy: 'Place turrets and defend the Core against incoming waves.', href: '/arcade/tower-defense' },
  { title: 'Code Matrix', type: 'Match-3', copy: 'Swap neighboring tiles to make a line of three or more. Opens on Amazing Grace.', href: 'https://www.amazinggracehl.org/arcade/code-matrix/' },
  { title: 'Relay Patrol', type: 'Arcade Shooter', copy: 'Move your ship and shoot drones before they reach the relay. Opens on Amazing Grace.', href: 'https://www.amazinggracehl.org/arcade/relay-patrol/' },
  { title: 'Noah & Norea: Cleansing the Gloom', type: 'Standalone Game', copy: 'Play the original Cleansing the Gloom.', href: '/arcade/classics/noah-and-norea' },
];

export default function ArcadePage() {
  return (
    <section className={styles.arcade}>
      <h1>Arcade</h1>
      <p>Choose a game and play.</p>
      <ul className={styles.games}>
        {games.map(game => (
          <li key={game.title}>
            <p className={styles.category}>{game.type}</p>
            <h2>{game.title}</h2>
            <p>{game.copy}</p>
            <Link href={game.href} className={styles.gameLink}>Play {game.title}</Link>
          </li>
        ))}
        <li>
          <h2>Matrix of Conscience</h2>
          <ul className={styles.matrixLinks}>
            <li>
              <Link href="/nexus-os/matrix-of-conscience" className={styles.gameLink}>Strategy Campaign</Link>
              <p>Choose any of the ten sectors on the campaign map.</p>
            </li>
            <li>
              <Link href="/arcade/classics/multiverse" className={styles.gameLink}>Multiverse Arcade</Link>
              <p>Play six levels and save your best score on this device.</p>
            </li>
            <li>
              <Link href="/arcade/classics/matrix-lore" className={styles.gameLink}>Matrix Lore Expanded</Link>
              <p>Read the original story archive.</p>
            </li>
          </ul>
        </li>
      </ul>
      <nav className={styles.quizzes} aria-label="Optional arcade quizzes">
        <Link href="/arcade/bible-quiz">Bible quiz</Link>
        <Link href="/arcade/cert-arena">CompTIA quiz</Link>
      </nav>
    </section>
  );
}
