import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Finding Renewed Strength in Seasons of Fatigue | Nicholai’s Blog",
  description: "A reflection on Isaiah 40:28–31 with discussion questions about fatigue, rest, and renewal.",
};

export default function FindingRenewedStrength() {
  return (
    <article className="blog-shell">
      <header className="blog-intro">
        <h1>Finding Renewed Strength in Seasons of Fatigue</h1>
        <p>A Reflection on Isaiah 40:28–31</p>
        <Link href="/blog">← Back to all articles</Link>
      </header>
      <div className="blog-article">
        <svg aria-hidden="true" viewBox="0 0 600 240" width="100%" height="240" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="60%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="600" height="240" rx="12" fill="url(#skyGrad)" />
          <circle cx="300" cy="140" r="70" fill="url(#sunGrad)" opacity="0.9" />
          <path d="M 300 30 L 300 0 M 300 250 L 300 220 M 190 140 L 160 140 M 440 140 L 410 140 M 222 62 L 200 40 M 378 218 L 400 240 M 222 218 L 200 240 M 378 62 L 400 40" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
          <polygon points="0,240 140,120 280,240" fill="url(#mountainGrad)" opacity="0.8" />
          <polygon points="320,240 460,100 600,240" fill="url(#mountainGrad)" opacity="0.9" />
          <polygon points="120,240 300,80 480,240" fill="url(#mountainGrad)" />
          <g fill="#ffffff" transform="translate(280, 50) scale(0.6)">
            <path d="M0,20 Q20,-10 50,0 Q80,-10 100,20 Q60,15 50,35 Q40,15 0,20 Z" />
          </g>
        </svg>
        <p>We all face seasons where fatigue feels overwhelming and our spirit feels worn down by daily demands. During these heavy moments, it is easy to wonder how long our strength will hold out.</p>
        <p>Scripture gently meets us in these low moments, acknowledging our human limitations while pointing us toward an infinite source of comfort and renewal. Reflecting on divine endurance reminds us that our personal weakness is not a failure, but an invitation to rest in God’s unfailing care.</p>
        <h2>Key Reflections</h2>
        <ul>
          <li>
            <h3>1. Recognizing Our Human Limits</h3>
            <p>No matter how capable or resilient we consider ourselves, human energy has boundaries. Admitting that we are tired or overwhelmed allows us to step away from self‑reliance and embrace the grace of being supported.</p>
          </li>
          <li>
            <h3>2. Resting in An Everlasting Source</h3>
            <p>While our energy fades, God's strength remains constant and unwearied. Placing our hope in God means shifting our focus from our immediate limitations to His enduring faithfulness and care.</p>
          </li>
          <li>
            <h3>3. Finding Freedom from Shame</h3>
            <p>Approaching our vulnerability without shame opens the door to genuine restoration. Weakness isn’t a flaw to hide—it's a threshold where peace and spiritual renewal begin.</p>
          </li>
        </ul>
        <section>
          <h2>Community Discussion Questions</h2>
          <ol>
            <li>In what area of your life are you currently feeling the most drained, and what would it look like to surrender that burden today?</li>
            <li>How do you typically respond when you hit your physical or emotional limits?</li>
            <li>What is one practical habit you can build this week to create space for spiritual rest and renewal?</li>
          </ol>
        </section>
        <footer>© Voice of Jesus Ministry. All rights reserved.</footer>
      </div>
    </article>
  );
}
