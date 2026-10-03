import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ownership",
        destination: "/ownership.html",
      },
    ];
  },
};

export default nextConfig;
