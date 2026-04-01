/**
 * Run a binaural preset from presets/<PRESET>.json (non-historical / experimental).
 * Env vars override JSON when set (same names as audio:beat).
 *
 *   PRESET=a432-carrier-6hz-beat npm run audio:preset
 *   PRESET=solfeggio-528 BEAT_HZ=8 npm run audio:preset   # override beat only
 */

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { writeStereoWavFile } from "./audio/wavStereo.js";
import { renderPureBinauralBeat } from "./audio/pureBinauralBeat.js";
import {
  loadPresetFile,
  listPresetIds,
  presetDir,
  presetToRenderOptions,
} from "./loadPreset.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "out");

function envNum(name: string, presetVal: number): number {
  const v = process.env[name];
  if (v === undefined || v === "") return presetVal;
  const n = Number(v);
  return Number.isFinite(n) ? n : presetVal;
}

function envStr(name: string, presetVal: string): string {
  const v = process.env[name];
  return v !== undefined && v !== "" ? v : presetVal;
}

const presetId = process.env.PRESET;

if (!presetId) {
  const ids = listPresetIds(root);
  console.error("Set PRESET=<id> (filename without .json under presets/).");
  console.error(`Available: ${ids.length ? ids.join(", ") : "(none)"}`);
  console.error(`Folder: ${presetDir(root)}`);
  process.exit(1);
}

let file;
try {
  file = loadPresetFile(root, presetId);
} catch (e) {
  console.error(String(e));
  process.exit(1);
}

const beatEndFromEnv = process.env.BEAT_END;
let mergedBeatEnd: number | undefined;
if (beatEndFromEnv !== undefined && beatEndFromEnv !== "") {
  const n = Number(beatEndFromEnv);
  mergedBeatEnd = Number.isFinite(n) ? n : undefined;
} else if (file.beatHzEnd !== undefined && file.beatHzEnd !== null) {
  mergedBeatEnd = file.beatHzEnd;
}

const merged = {
  ...file,
  carrierHz: envNum("CARRIER_HZ", file.carrierHz),
  beatHz: envNum("BEAT_HZ", file.beatHz),
  beatHzEnd: mergedBeatEnd,
  durationSec: envNum("DURATION_SEC", file.durationSec),
  amplitude: envNum("AMPLITUDE", file.amplitude ?? 0.32),
  sampleRate: Math.floor(envNum("SAMPLE_RATE", file.sampleRate ?? 48000)),
  fadeSec: envNum("FADE_SEC", file.fadeSec ?? 0.04),
  swapEars:
    process.env.SWAP_EARS === "1"
      ? true
      : process.env.SWAP_EARS === "0"
        ? false
        : (file.swapEars ?? false),
};

const renderOpts = presetToRenderOptions(merged);

const outPath = envStr("OUT", join(outDir, file.outputFilename));

mkdirSync(dirname(outPath), { recursive: true });

const samples = renderPureBinauralBeat(renderOpts);
writeStereoWavFile(outPath, samples, renderOpts.sampleRate);

const pcmBytes = 44 + (samples.length / 2) * 4;

console.log(
  [
    `Preset: ${presetId}`,
    `  ${file.title}`,
    `  ${file.disclaimer}`,
    `Wrote ${outPath} (${(samples.length / 2 / renderOpts.sampleRate).toFixed(3)}s, ~${pcmBytes} bytes PCM)`,
    `  carrier ${renderOpts.carrierHz} Hz  beat ${renderOpts.beatHz}${renderOpts.beatHzEnd !== undefined ? ` → ${renderOpts.beatHzEnd}` : ""} Hz`,
  ].join("\n"),
);

if (process.env.OPEN_WAV === "1" && process.platform === "darwin") {
  try {
    execSync(`open "${outPath}"`, { stdio: "inherit" });
  } catch {
    console.warn("Could not open WAV with default app.");
  }
}
