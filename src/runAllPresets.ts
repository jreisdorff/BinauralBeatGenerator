/**
 * Render every presets/*.json (same as PRESET=<id> npm run audio:preset in a loop).
 */

import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { listPresetIds } from "./loadPreset.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const ids = listPresetIds(root).sort();
if (ids.length === 0) {
  console.error("No JSON presets found in presets/");
  process.exit(1);
}

for (const id of ids) {
  console.log(`\n=== ${id} ===`);
  execSync("npm run audio:preset", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, PRESET: id },
  });
}

console.log(`\nDone. ${ids.length} preset(s) → out/`);
