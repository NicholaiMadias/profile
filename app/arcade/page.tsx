import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './arcade.module.css';

export const metadata: Metadata = {
  title: 'Arcade | Nicholai.Online',
  description: 'Play tower defense, match-3, an arcade shooter, or the Matrix of Conscience campaign.',
};

const games = [
  { title: 'Nexus Defense', type: 'Tower Defense', copy: 'Place turrets and defend the Core against incoming waves.', href: '/arcade/tower-defense' },
  { title: 'Code Matrix', type: 'Match-3', copy: 'Swap neighboring tiles to make a line of three or more. Opens on Amazing Grace.', href: 'https://www.amazinggracehl.org/arcade/code-matrix/' },
  { title: 'Relay Patrol', type: 'Arcade Shooter', copy: 'Move your ship and shoot drones before they reach the relay. Opens on Amazing Grace.', href: 'https://www.amazinggracehl.org/arcade/relay-patrol/' },
  { title: 'Matrix of Conscience', type: 'Strategy Campaign', copy: 'Choose any of the ten sectors on the campaign map.', href: '/nexus-os/matrix-of-conscience' },
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
            <Link href={game.href} className={styles.play}>Play {game.title} →</Link>
          </li>
        ))}
      </ul>
      <nav className={styles.quizzes} aria-label="Optional arcade quizzes">
        <Link href="/arcade/bible-quiz">Bible quiz</Link>
        <Link href="/arcade/cert-arena">CompTIA quiz</Link>
      </nav>
    </section>
  );
}
