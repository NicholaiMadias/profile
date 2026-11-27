import type { MetadataRoute } from 'next';

// Required for Next.js static HTML export.
export const dynamic = 'force-static';

const baseUrl = 'https://nicholai.online';

const publicRoutes = [
  '/',
  '/tools',
  '/tools/enterprise-endpoint',
  '/blog',
  '/blog/antigravity-dev-stack',
  '/blog/enterprise-endpoint-toolkit',
  '/blog/finding-renewed-strength',
  '/blog/hybrid-endpoint-automation',
  '/blog/matrix-of-conscience',
  '/blog/nexus-assist-deployment',
  '/blog/noopept-hif-1-brain-cell-protection-research',
  '/blog/phi-redaction-proxy',
  '/blog/ssh-extension-access',
  '/blog/validated-gpu-infrastructure',
  '/blog/windows-11-intune-cis-powershell-hardening',
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
