import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  /**
   * Without this, Next emits both `out/technical.html` and `out/technical/` (nested
   * routes). Static hosts often resolve `/technical` to the directory, find no
   * `index.html`, and 404 — while client-side navigation still works. Trailing-slash
   * export uses `technical/index.html` only, avoiding that clash.
   */
  trailingSlash: true,
  /** Monorepo: parent has its own lockfile; trace from `web/` only. */
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
