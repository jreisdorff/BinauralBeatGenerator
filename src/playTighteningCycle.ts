/**
 * Writes out/tightening-cycle.mid (GM harp, seven-note chords per tightening step).
 * On macOS, opens the file with the default app if OPEN_MIDI=1.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { buildTighteningCycleMidi } from "./midi/tighteningCycleMidi.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "out");
const outPath = join(outDir, "tightening-cycle.mid");

mkdirSync(outDir, { recursive: true });
const buffer = buildTighteningCycleMidi();
writeFileSync(outPath, buffer);
console.log(`Wrote ${outPath} (${buffer.length} bytes)`);

if (process.env.OPEN_MIDI === "1" && process.platform === "darwin") {
  try {
    execSync(`open "${outPath}"`, { stdio: "inherit" });
  } catch {
    console.warn("Could not open file with default app.");
  }
}
