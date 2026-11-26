import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const games = {
  multiverse: {
    title: 'Matrix of Conscience: Multiverse Arcade',
    file: 'Matrix of Conscience_ Multiverse Arcade.html',
  },
  'matrix-lore': {
    title: 'Matrix Lore Expanded',
    file: 'matrix-lore-expanded.html',
  },
  'noah-and-norea': {
    title: 'Noah & Norea: Cleansing the Gloom',
    file: 'Noah & Norea_ Cleansing the Gloom.html',
  },
};

type GamePageProps = { params: Promise<{ game: string }> };

async function getGame({ params }: GamePageProps) {
  const { game } = await params;
  if (!Object.hasOwn(games, game)) notFound();
  return games[game as keyof typeof games];
}

export function generateStaticParams() {
  return Object.keys(games).map(game => ({ game }));
}

export async function generateMetadata(props: GamePageProps): Promise<Metadata> {
  const { title } = await getGame(props);
  return { title: `${title} | Nicholai.Online` };
}

export default async function ClassicGamePage(props: GamePageProps) {
  const { title, file } = await getGame(props);
  const html = await readFile(join(process.cwd(), 'public', file), 'utf8');

  return (
    <section>
      <div className="container">
        <Link href="/arcade">← All games</Link>
        <h1>{title}</h1>
      </div>
      <iframe
        title={title}
        srcDoc={html}
        allowFullScreen
        style={{ display: 'block', width: '100%', height: '90dvh', minHeight: '38rem', border: 0 }}
      />
    </section>
  );
}
