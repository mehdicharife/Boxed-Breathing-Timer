import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  async headers() {
    return ["/sw.js", "/sw-dev.js"].map((source) => ({
      source,
      headers: [
        { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        { key: "Cache-Control", value: "no-store, max-age=0" },
        { key: "Service-Worker-Allowed", value: "/" },
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
      ],
    }));
  },
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
