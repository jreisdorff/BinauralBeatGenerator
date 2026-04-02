import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /** Monorepo: parent has its own lockfile; trace from `web/` only. */
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
