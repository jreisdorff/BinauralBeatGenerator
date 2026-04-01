/**
 * Pure binaural-beat WAV (one sine per ear). Use headphones.
 *
 * Env (all optional except you usually set BEAT_HZ / CARRIER_HZ to taste):
 *   CARRIER_HZ   default 220   — lower ear gets this (unless SWAP_EARS=1)
 *   BEAT_HZ      default 10    — starting interaural offset in Hz (other ear = carrier + this)
 *   BEAT_END     unset         — if set, offset sweeps linearly from BEAT_HZ to BEAT_END over the file
 *   DURATION_SEC default 120
 *   SAMPLE_RATE  default 48000
 *   AMPLITUDE    default 0.32  — per-channel peak (keep < ~0.5)
 *   SWAP_EARS=1  — put higher frequency in left ear instead of right
 *   FADE_SEC     default 0.04  — fade in/out at file edges
 *   OUT          default out/pure-binaural.wav
 *   OPEN_WAV=1   macOS: open after write
 *
 * Examples:
 *   npm run audio:beat
 *   CARRIER_HZ=100 BEAT_HZ=4 DURATION_SEC=300 npm run audio:beat
 *   BEAT_HZ=40 BEAT_END=2 DURATION_SEC=180 npm run audio:beat   — sweep 40→2 Hz beat over 3 min
 */

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { writeStereoWavFile } from "./audio/wavStereo.js";
import { renderPureBinauralBeat } from "./audio/pureBinauralBeat.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "out");

function envNum(name: string, fallback: number): number {
  const v = process.env[name];
  if (v === undefined || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function envStr(name: string, fallback: string): string {
  const v = process.env[name];
  return v !== undefined && v !== "" ? v : fallback;
}

const carrierHz = envNum("CARRIER_HZ", 220);
const beatHz = envNum("BEAT_HZ", 10);
const beatEndRaw = process.env.BEAT_END;
const beatHzEnd =
  beatEndRaw !== undefined && beatEndRaw !== ""
    ? Number(beatEndRaw)
    : undefined;
const durationSec = envNum("DURATION_SEC", 120);
const sampleRate = Math.floor(envNum("SAMPLE_RATE", 48000));
const amplitude = envNum("AMPLITUDE", 0.32);
const swapEars = process.env.SWAP_EARS === "1";
const fadeSec = envNum("FADE_SEC", 0.04);

const defaultName =
  beatHzEnd !== undefined && Number.isFinite(beatHzEnd)
    ? `pure-binaural-${carrierHz}Hz-sweep${beatHz}-${beatHzEnd}Hz.wav`
    : `pure-binaural-${carrierHz}Hz-beat${beatHz}Hz.wav`;
const outPath = envStr("OUT", join(outDir, defaultName));

mkdirSync(dirname(outPath), { recursive: true });

const samples = renderPureBinauralBeat({
  carrierHz,
  beatHz,
  beatHzEnd:
    beatHzEnd !== undefined && Number.isFinite(beatHzEnd) ? beatHzEnd : undefined,
  durationSec,
  sampleRate,
  amplitude,
  swapEars,
  edgeFadeSec: fadeSec,
});

writeStereoWavFile(outPath, samples, sampleRate);

const pcmBytes = 44 + (samples.length / 2) * 4;

const sweepNote =
  beatHzEnd !== undefined && Number.isFinite(beatHzEnd)
    ? `  sweep beat ${beatHz} → ${beatHzEnd} Hz`
    : `  fixed beat offset ${beatHz} Hz`;

console.log(
  [
    `Wrote ${outPath} (${(samples.length / 2 / sampleRate).toFixed(3)}s, ~${pcmBytes} bytes PCM)`,
    `  carrier ${carrierHz} Hz  ${sweepNote}`,
    `  SR=${sampleRate}  amplitude≈${amplitude}  swapEars=${swapEars}`,
  ].join("\n"),
);

if (process.env.OPEN_WAV === "1" && process.platform === "darwin") {
  try {
    execSync(`open "${outPath}"`, { stdio: "inherit" });
  } catch {
    console.warn("Could not open WAV with default app.");
  }
}
