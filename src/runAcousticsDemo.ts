/**
 * Writes out/room-modes.txt and out/chladni-mode-*.svg
 *
 * Env:
 *   ROOM_L_M  default 12   (length)
 *   ROOM_W_M  default 8
 *   ROOM_H_M  default 3
 *   CHLADNI_N CHLADNI_M  default 3,4  (first SVG)
 *   EXTRA_MODES  default 2,5|4,4  pipe-separated n,m pairs for more SVGs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  formatRoomModesReport,
  rectangularRoomModes,
} from "./acoustics/roomModes.js";
import { squarePlateModeSvg } from "./acoustics/chladniApprox.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "out");

function envNum(name: string, fallback: number): number {
  const v = process.env[name];
  if (v === undefined || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

mkdirSync(outDir, { recursive: true });

const dims = {
  lengthM: envNum("ROOM_L_M", 12),
  widthM: envNum("ROOM_W_M", 8),
  heightM: envNum("ROOM_H_M", 3),
};

const modes = rectangularRoomModes(dims, { maxAxis: 10 });
const report = formatRoomModesReport(dims, modes, 50);
const reportPath = join(outDir, "room-modes.txt");
writeFileSync(reportPath, `${report}\n`, "utf8");
console.log(`Wrote ${reportPath}`);

const n1 = Math.max(1, Math.floor(envNum("CHLADNI_N", 3)));
const m1 = Math.max(1, Math.floor(envNum("CHLADNI_M", 4)));
const svg1 = squarePlateModeSvg({ resolution: 72, n: n1, m: m1 });
const p1 = join(outDir, `chladni-mode-${n1}-${m1}.svg`);
writeFileSync(p1, svg1, "utf8");
console.log(`Wrote ${p1}`);

const extra = process.env.EXTRA_MODES ?? "2,5|4,4";
for (const part of extra.split("|")) {
  const [a, b] = part.split(",").map((s) => parseInt(s.trim(), 10));
  if (!Number.isFinite(a) || !Number.isFinite(b) || a < 1 || b < 1) continue;
  if (a === n1 && b === m1) continue;
  const svg = squarePlateModeSvg({ resolution: 72, n: a, m: b });
  const p = join(outDir, `chladni-mode-${a}-${b}.svg`);
  writeFileSync(p, svg, "utf8");
  console.log(`Wrote ${p}`);
}

console.log("\nSee docs/sound-and-built-environment.md for what this does (and does not) claim.");
