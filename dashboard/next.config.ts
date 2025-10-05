import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopack: {
      root: __dirname,
    },
  },
};

export default nextConfig;
