import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  serverExternalPackages: ["better-sqlite3"],
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    "/": ["./db/**/*"],
    "/chant/[slug]": ["./db/**/*"],
    "/library": ["./db/**/*"],
  },
};

export default nextConfig;
