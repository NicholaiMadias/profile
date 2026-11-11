// app/blog/finding-renewed-strength/page.tsx
import React from "react";

export default function FindingRenewedStrength() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Finding Renewed Strength</title>
        <style>{`
          :root {
            --primary-color: #2c3e50;
            --accent-color: #d4af37;
            --bg-color: #f8f9fa;
            --card-bg: #ffffff;
            --text-color: #333333;
            --text-muted: #555555;
            --border-color: #e2e8f0;
          }
          body{font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;background-color:var(--bg-color);color:var(--text-color);line-height:1.6;margin:0;padding:0}
          header{background:linear-gradient(135deg,#1e293b 0%,#334155 100%);color:#fff;text-align:center;padding:3rem 1rem}
          header h1{font-size:2.25rem;margin-bottom:.5rem;font-weight:700}
          header p{color:#94a3b8;font-size:1.1rem}
          .container{max-width:800px;margin:-2rem auto 3rem auto;padding:0 1rem}
          .card{background-color:var(--card-bg);border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,.05);padding:2.5rem;margin-bottom:2rem}
          .graphic-container{text-align:center;margin:1rem 0 2.5rem}
          h2{color:var(--primary-color);border-bottom:2px solid var(--accent-color);padding-bottom:.5rem;margin-top:2rem;font-size:1.5rem}
          .key-points{list-style:none;padding:0}
          .key-points li{background:#f1f5f9;border-left:4px solid var(--accent-color);padding:1rem 1.25rem;margin-bottom:1rem;border-radius:0 8px 8px 0}
          .key-points h3{margin:0 0 .25rem;color:var(--primary-color);font-size:1.1rem}
          .key-points p{margin:0;color:var(--text-muted)}
          .questions-box{background:#fefce8;border:1px solid #fef08a;border-radius:8px;padding:1.5rem;margin-top:2rem}
          .questions-box h3{color:#854d0e;margin-top:0}
          footer{text-align:center;color:#64748b;font-size:.9rem;padding:2rem 1rem}
        `}</style>
      </head>
      <body>
        <header>
          <h1>Finding Renewed Strength in Seasons of Fatigue</h1>
          <p>A Reflection on Isaiah 40:28–31</p>
        </header>
        <div className="container">
          <div className="card">
            <div className="graphic-container">
              <svg viewBox="0 0 600 240" width="100%" height="240" xmlns="http://www.w3.org/2000/svg">
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
            </div>
            <p>We all face seasons where fatigue feels overwhelming and our spirit feels worn down by daily demands. During these heavy moments, it is easy to wonder how long our strength will hold out.</p>
            <p>Scripture gently meets us in these low moments, acknowledging our human limitations while pointing us toward an infinite source of comfort and renewal. Reflecting on divine endurance reminds us that our personal weakness is not a failure, but an invitation to rest in God’s unfailing care.</p>
            <h2>Key Reflections</h2>
            <ul className="key-points">
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
            <div className="questions-box">
              <h3>Community Discussion Questions</h3>
              <ol>
                <li>In what area of your life are you currently feeling the most drained, and what would it look like to surrender that burden today?</li>
                <li>How do you typically respond when you hit your physical or emotional limits?</li>
                <li>What is one practical habit you can build this week to create space for spiritual rest and renewal?</li>
              </ol>
            </div>
          </div>
        </div>
        <footer>
          <p>© Voice of Jesus Ministry. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
