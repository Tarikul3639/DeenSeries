import type { NextConfig } from 'next';

/**
 * CRITICAL: If you remove this rewrite, all API requests will go directly to the backend.
 * The browser will treat it as cross-site and block it — cookies won't be set, and authentication will not work.
 */
const BACKEND_URL =
  process.env.BACKEND_API_URL || "http://localhost:5000/api/v1";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",

        // remove duplicate /api/v1
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;