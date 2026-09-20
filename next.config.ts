import type { NextConfig } from "next";

const projectRoot = process.cwd();

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/ilina-home",
          has: [
            {
              type: "host",
              value: "ilina.kr",
            },
          ],
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
