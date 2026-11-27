import type { Metadata } from 'next';
import Link from 'next/link';
import { WordSprint } from '../../../components/WordSprint';
import styles from '../arcade.module.css';

const matchThreeUrl = 'https://www.amazinggracehl.org/arcade/code-matrix/';

export const metadata: Metadata = {
  title: 'Code Matrix | Nicholai.Online',
  description: 'Play the Code Matrix match-3 puzzle or a 30-second typing challenge.',
};

export default function CodeMatrixPage() {
  return (
    <section className="container page narrow">
      <Link className={styles.gameLink} href="/arcade">All games</Link>
      <h1>Code Matrix</h1>
      <p><a className={styles.gameLink} href="#typing-challenge">Jump to Typing Challenge</a></p>
      <section aria-labelledby="match-three">
        <h2 id="match-three">Match-3 Puzzle</h2>
        <a className={styles.gameLink} href={matchThreeUrl}>
          Open Match-3 on Amazing Grace
        </a>
        <iframe className={styles.gameFrame} src={matchThreeUrl} title="Code Matrix Match-3 Puzzle" loading="lazy" />
      </section>
      <section className={styles.sideGame} aria-labelledby="typing-challenge">
        <h2 id="typing-challenge">Typing Challenge</h2>
        <WordSprint />
      </section>
    </section>
  );
}
