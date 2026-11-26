import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './arcade.module.css';

export const metadata: Metadata = {
  title: 'Arcade | Nicholai.Online',
  description: 'Play strategy games, classic campaigns, and quick skill challenges.',
};

const games = [
  { title: 'Nexus Defense', type: 'Tower Defense', copy: 'Place turrets and defend the Core against incoming waves.', href: '/arcade/tower-defense' },
  { title: 'Code Matrix', type: 'Puzzle & Typing', copy: 'Match tiles or see how many words you can type accurately in 30 seconds.', href: '/arcade/code-matrix' },
  { title: 'Relay Protocol', type: 'Arcade Shooter', copy: 'Defend the relay or warm up with a 20-second Quick Click round.', href: '/arcade/relay-protocol' },
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
