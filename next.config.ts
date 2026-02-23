import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: true, // Merged with PPR in Next 16, currently conflicts with force-dynamic in demos
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
