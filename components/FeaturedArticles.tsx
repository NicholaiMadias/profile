'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Article {
  title: string;
  slug: string;
  date: string;
}

export const FeaturedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Grab the 3 most recent posts from Firestore collection "posts"
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3));
        const snapshot = await getDocs(q);
        const fetched: Article[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          return {
            title: data.title ?? 'Untitled',
            slug: data.slug ?? '/',
            // Convert Firestore Timestamp → YYYY‑MM‑DD
            date: data.createdAt?.toDate
              ? data.createdAt.toDate().toISOString().split('T')[0]
              : '1970-01-01',
          };
        });
        setArticles(fetched);
      } catch (err) {
        console.error('Failed to load featured articles', err);
        // Fallback to static list if Firestore isn’t reachable
        setArticles([
          { title: 'Validated GPU Infrastructure', slug: '/blog/validated-gpu-infrastructure', date: '2024-10-01' },
          { title: 'Matrix of Conscience', slug: '/blog/matrix-of-conscience', date: '2024-09-15' },
          { title: 'Antigravity Dev Stack', slug: '/blog/antigravity-dev-stack', date: '2024-08-20' },
        ]);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="featured-articles">
      <h2>Featured Articles</h2>
      <ul>
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={a.slug}>{a.title}</Link> <small>({a.date})</small>
          </li>
        ))}
      </ul>
    </section>
  );
};
