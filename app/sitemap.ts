import type { MetadataRoute } from 'next';

// Required for Next.js static HTML export.
export const dynamic = 'force-static';

const baseUrl = 'https://nicholai.online';

const publicRoutes = [
  '/',
  '/tools',
  '/tools/enterprise-endpoint',
  '/blog',
  '/blog/enterprise-endpoint-toolkit',
  '/blog/windows-11-intune-cis-powershell-hardening',
  '/blog/phi-redaction-proxy',
  '/blog/hybrid-endpoint-automation',
  '/academy',
  '/academy/md-102',
  '/agent',
  '/arcade',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: new URL(path, baseUrl).toString(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}
