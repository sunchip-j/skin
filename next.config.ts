import type { NextConfig } from "next";

const projectRoot = process.cwd();

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  async rewrites() {
    return {
      beforeFiles: [
        ["/", "/ilina-home"],
        ["/about", "/ilina-home/about"],
        ["/privacy", "/ilina-home/privacy"],
        ["/robots.txt", "/ilina-home/robots.txt"],
        ["/sitemap.xml", "/ilina-home/sitemap.xml"],
      ].map(([source, destination]) => ({
        source,
        destination,
        has: [{ type: "host" as const, value: "ilina.kr" }],
      })),
      afterFiles: [],
      fallback: [],
    };
  },
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
