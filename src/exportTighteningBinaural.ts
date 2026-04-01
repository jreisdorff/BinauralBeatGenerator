/**
 * Pipeline: same tightening schedule as MIDI → stereo WAV with binaural offset (R = L + beatHz per partial).
 *
 * Env:
 *   BEAT_HZ        default 6
 *   SAMPLE_RATE    default 48000
 *   BPM            default 72 (chord = 2 quarters)
 *   REST_SEC       default 0 (no silence between chords; set e.g. 0.833 to match midi quarter-rest)
 *   OPEN_WAV=1     macOS: open output with default app
 */

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { writeStereoWavFile } from "./audio/wavStereo.js";
import { renderTighteningBinaural } from "./audio/binauralTightening.js";
import { buildTighteningScheduleSegments } from "./tuning/tighteningSchedule.js";
import { REFERENCE_A4_HZ } from "./tuning/nineStrings.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "out");
const outPath = join(outDir, "tightening-binaural.wav");

function envNum(name: string, fallback: number): number {
  const v = process.env[name];
  if (v === undefined || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

const a4Hz = envNum("A4_HZ", REFERENCE_A4_HZ);
const beatHz = envNum("BEAT_HZ", 6);
const sampleRate = Math.floor(envNum("SAMPLE_RATE", 48000));
const bpm = envNum("BPM", 72);
const quarterSec = 60 / bpm;
const chordDurationSec = 2 * quarterSec;
const restDurationSec = envNum("REST_SEC", 0);

mkdirSync(outDir, { recursive: true });

const segments = buildTighteningScheduleSegments(a4Hz);
const samples = renderTighteningBinaural(segments, {
  beatHz,
  sampleRate,
  chordDurationSec,
  restDurationSec,
  edgeFadeSec: 0.012,
});

writeStereoWavFile(outPath, samples, sampleRate);

console.log(
  [
    `Wrote ${outPath}`,
    `  A4=${a4Hz} Hz  beat=${beatHz} Hz  SR=${sampleRate}`,
    `  chord ${chordDurationSec.toFixed(3)}s + rest ${restDurationSec.toFixed(3)}s (BPM ${bpm})`,
    `  segments: ${segments.length}`,
  ].join("\n"),
);

if (process.env.OPEN_WAV === "1" && process.platform === "darwin") {
  try {
    execSync(`open "${outPath}"`, { stdio: "inherit" });
  } catch {
    console.warn("Could not open WAV with default app.");
  }
}
