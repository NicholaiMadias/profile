import type { NextConfig } from "next";
import path from "path";

// Redirects and security headers are served by Firebase Hosting (firebase.json)
// because static exports do not support Next.js redirects() or headers().
const nextConfig: NextConfig = {
  output: "export",
  turbopack: {
    root: path.resolve(__dirname),
  },
  poweredByHeader: false,
};
export default nextConfig;
