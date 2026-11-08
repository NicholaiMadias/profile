import type { NextConfig } from "next";

const legacyAcademyPages = [
  ["/Apps/academy", "/tools"],
  ["/Apps/academy/bible-study", "/arcade/bible-quiz"],
  ["/Apps/academy/games/code-matrix", "/arcade"],
  ["/Apps/academy/games/matrix-of-conscience", "/arcade"],
  ["/Apps/academy/games/powershell-defense", "/arcade"],
  ["/Apps/academy/games/seven-stars", "/bible-study/seven-stars"],
  ["/Apps/academy/games/signal-operations", "/arcade"],
  ["/Apps/academy/vim-defense", "/arcade/vim-defender"],
] as const;

import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/connections",
        destination: "https://voiceofjesusnet.blogspot.com/",
        permanent: false,
      },
      ...legacyAcademyPages.flatMap(([source, destination]) => [
        { source, destination, permanent: false },
        { source: `${source}/index.html`, destination, permanent: false },
      ]),
      {
        source: "/Apps/academy/games/matrix-of-conscience/matrix-act-iv.html",
        destination: "/arcade",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
