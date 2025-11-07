import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: '.',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
