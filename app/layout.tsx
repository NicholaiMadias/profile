import { SiteAnalytics } from "../components/SiteAnalytics";
import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { ProgressProvider } from '../components/ProgressProvider';

export const metadata: Metadata = {
  title: 'Nicholai Maro Madias | Senior Platform Engineer',
  description: 'Senior Platform Engineer specializing in enterprise endpoint management, Microsoft Intune, Workspace ONE UEM, Entra ID, PowerShell automation, and secure infrastructure.',
  metadataBase: new URL('https://nicholai.online'),
  openGraph: {
    type: 'website',
    url: 'https://nicholai.online',
    siteName: 'Nicholai.online',
    title: 'Nicholai Maro Madias | Senior Platform Engineer',
    description: 'Enterprise endpoint management, identity, security operations, and practical automation.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ProgressProvider>
          <header className="site-header">
            <div className="header-inner">
              <Link className="nav-brand" href="/" aria-label="Nicholai.Online home">
                <Image src="/nicholai-online-logo.webp" alt="" width={560} height={76} loading="eager" unoptimized />
              </Link>
              <nav className="nav-links" aria-label="Main navigation">
                <Link href="/#work">Work</Link>
                <Link href="/#experience">Experience</Link>
                <Link href="/blog" prefetch={false}>Writing</Link>
                <Link href="/arcade" prefetch={false}>Arcade</Link>
                <details className="tools-dropdown">
                  <summary>Tools</summary>
                  <ul>
                    <li><Link prefetch={false} href="/tools">All tools</Link></li>
                    <li><Link prefetch={false} href="/agent">Agent Nexus</Link></li>
                    <li><Link prefetch={false} href="/tools#nexus-assistant">Nexus Assistant</Link></li>
                    <li><Link prefetch={false} href="/tools/enterprise-endpoint">Endpoint Automation Toolkit</Link></li>
                    <li><Link prefetch={false} href="/academy">Certification Academy</Link></li>
                  </ul>
                </details>
              </nav>
            </div>
          </header>
          <main id="main" tabIndex={-1}>{children}</main>
          <footer className="site-footer">
            <span>Nicholai Maro Madias</span>
            <div>
              <a href="https://amazinggracehl.org">
                <Image src="/amazing-grace-mark.webp" alt="" width={32} height={32} unoptimized />
                Amazing Grace Home Living
              </a>
              <a href="https://voiceofjesusministry.net">
                <Image src="/voice-of-jesus-mark.webp" alt="" width={32} height={32} unoptimized />
                Voice of Jesus Ministry
              </a>
              <a href="https://limitlessnexus.com">Limitless Nexus</a>
              <Link href="/privacy">Privacy</Link>
            </div>
          </footer>
        </ProgressProvider>
        <SiteAnalytics />
      </body>
    </html>
  );
}
