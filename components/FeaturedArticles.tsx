'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Article {
  title: string;
  slug: string;
  date: string;
}

const featuredArticles: Article[] = [
  { title: 'Validated GPU Infrastructure', slug: '/blog/validated-gpu-infrastructure', date: '2026-11-07' },
  { title: 'Matrix of Conscience', slug: '/blog/matrix-of-conscience', date: '2026-11-04' },
  { title: 'Antigravity Dev Stack', slug: '/blog/antigravity-dev-stack', date: '2026-11-04' },
];

export const FeaturedArticles = () => {
  const [articles, setArticles] = useState<Article[]>(featuredArticles);

  useEffect(() => {
    const fetchFeatured = async () => {
      if (!db) return;
      try {
        // Grab the 3 most recent posts from Firestore collection "posts"
        const q = query(collection(db, 'posts'), where('published', '==', true), orderBy('createdAt', 'desc'), limit(3));
        const snapshot = await getDocs(q);
        const fetched: Article[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          return {
            title: data.title ?? 'Untitled',
            slug: data.slug ?? '/',
            // Convert Firestore Timestamp → YYYY‑MM‑DD
            date: data.createdAt?.toDate
              ? data.createdAt.toDate().toISOString().split('T')[0]
              : '',
          };
        });
        if (fetched.length) setArticles(fetched);
      } catch (err) {
        console.error('Failed to load featured articles', err);
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
            <Link href={a.slug}>{a.title}</Link> {a.date && <small>(<time dateTime={a.date}>{a.date}</time>)</small>}
          </li>
        ))}
      </ul>
    </section>
  );
};
