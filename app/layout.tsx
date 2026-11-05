import { SiteAnalytics } from "../components/SiteAnalytics";
import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ProgressProvider } from '../components/ProgressProvider';

export const metadata: Metadata = {
  title: 'Nicholai Maro Madias | Endpoint Platform Engineer',
  description: 'Enterprise endpoints, identity, automation, tools and educational game design.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ProgressProvider>
          <header className="site-header">
            <div className="header-inner">
              <Link className="nav-brand" href="/">Nicholai Maro Madias</Link>
              <nav className="nav-links" aria-label="Main navigation">
                <Link href="/blog">Nicholai’s Blog</Link>
                <a href="https://amazinggracehl.org">Amazing Grace</a>
                <a href="https://voiceofjesusministry.net">Voice of Jesus Ministry</a>
                <Link href="/arcade">Matrix of Conscience</Link>
                <Link href="/#tools">Tools</Link>
              </nav>
            </div>
          </header>
          <main id="main">{children}</main>
          <footer className="site-footer">
            <span>Nicholai Maro Madias</span>
            <div>
              <a href="https://amazinggracehl.org">Amazing Grace</a>
              <a href="https://voiceofjesusministry.net">Voice of Jesus Ministry</a>
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
