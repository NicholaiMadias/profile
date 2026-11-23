import type { MetadataRoute } from 'next';

// Required for Next.js static HTML export.
export const dynamic = 'force-static';

const baseUrl = 'https://nicholai.online';

const publicRoutes = [
  '/',
  '/profile',
  '/tools/enterprise-endpoint',
  '/blog',
  '/blog/enterprise-endpoint-toolkit',
  '/blog/windows-11-intune-cis-powershell-hardening',
  '/blog/phi-redaction-proxy',
  '/blog/hybrid-endpoint-automation',
  '/academy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: new URL(path, baseUrl).toString(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.7,
  }));
}
