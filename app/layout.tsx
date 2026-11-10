import { SiteAnalytics } from "../components/SiteAnalytics";
import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ProgressProvider } from '../components/ProgressProvider';

export const metadata: Metadata = {
  title: 'Nicholai Maro Madias | Senior Engineer & Administrator',
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

                <a href="https://amazinggracehl.org">Amazing Grace</a>
                <a href="https://voiceofjesusministry.net">Voice of Jesus Ministry</a>
                <Link href="/arcade" aria-label="Open the Nexus Arcade, including Matrix of Conscience">Arcade</Link>
                <a href="https://github.com/NicholaiMadias/Code">Nexus Code Lab</a>
                <Link href="/blog">Blog</Link>
                <details className="tools-dropdown">
  <summary>Tools</summary>
  <ul>
    <li><Link href="/nexus">Nexus Assistant</Link></li>
    <li><Link href="/tools">Nexus LMS &amp; Toolbox</Link></li>
  </ul>
</details>
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
