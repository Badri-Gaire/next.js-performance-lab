import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: true, // This was causing compatibility issues with 'force-dynamic'
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
};

export default nextConfig;
