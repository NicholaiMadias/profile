import type { Metadata } from 'next';
import Link from 'next/link';
import { QuickClick } from '../../../components/QuickClick';
import styles from '../arcade.module.css';

const relayPatrolUrl = 'https://www.amazinggracehl.org/arcade/relay-patrol/';

export const metadata: Metadata = {
  title: 'Relay Protocol | Nicholai.Online',
  description: 'Defend the relay in Relay Patrol or warm up with Quick Click.',
};

export default function RelayProtocolPage() {
  return (
    <section className="container page narrow">
      <Link className={styles.gameLink} href="/arcade">All games</Link>
      <h1>Relay Protocol</h1>
      <p><a className={styles.gameLink} href="#quick-click">Jump to Quick Click</a></p>
      <section aria-labelledby="relay-patrol">
        <h2 id="relay-patrol">Relay Patrol</h2>
        <a className={styles.gameLink} href={relayPatrolUrl}>
          Open Relay Patrol on Amazing Grace
        </a>
        <iframe className={styles.gameFrame} src={relayPatrolUrl} title="Relay Patrol arcade shooter" loading="lazy" />
      </section>
      <section className={styles.sideGame} aria-labelledby="quick-click">
        <h2 id="quick-click">Quick Click</h2>
        <QuickClick />
      </section>
    </section>
  );
}
