/**
 * Load non-historical / experimental binaural presets from presets/*.json
 */

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { PureBinauralBeatOptions } from "./audio/pureBinauralBeat.js";

export type PresetFile = {
  /** Short label for humans. */
  title: string;
  /** Required honesty sticker. */
  disclaimer: string;
  carrierHz: number;
  beatHz: number;
  /** Omit or null for fixed beat. */
  beatHzEnd?: number | null;
  durationSec: number;
  swapEars?: boolean;
  amplitude?: number;
  sampleRate?: number;
  fadeSec?: number;
  /** Basename for out/ (e.g. preset-a432.wav). */
  outputFilename: string;
};

export function presetDir(root: string): string {
  return join(root, "presets");
}

export function listPresetIds(root: string): string[] {
  const dir = presetDir(root);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => f.replace(/\.json$/i, ""));
}

export function loadPresetFile(root: string, id: string): PresetFile {
  const path = join(presetDir(root), `${id}.json`);
  const raw = JSON.parse(readFileSync(path, "utf8")) as unknown;
  if (!raw || typeof raw !== "object") throw new Error(`invalid preset: ${id}`);
  const p = raw as Partial<PresetFile>;
  for (const k of ["title", "disclaimer", "carrierHz", "beatHz", "durationSec", "outputFilename"] as const) {
    if (p[k] === undefined || p[k] === null) {
      throw new Error(`preset ${id} missing required field: ${k}`);
    }
  }
  if (typeof p.carrierHz !== "number" || typeof p.beatHz !== "number") {
    throw new Error(`preset ${id}: carrierHz and beatHz must be numbers`);
  }
  return p as PresetFile;
}

export function presetToRenderOptions(p: PresetFile): PureBinauralBeatOptions {
  const beatEnd =
    p.beatHzEnd === undefined || p.beatHzEnd === null ? undefined : p.beatHzEnd;
  return {
    carrierHz: p.carrierHz,
    beatHz: p.beatHz,
    beatHzEnd: beatEnd,
    durationSec: p.durationSec,
    sampleRate: p.sampleRate ?? 48000,
    amplitude: p.amplitude ?? 0.32,
    swapEars: p.swapEars ?? false,
    edgeFadeSec: p.fadeSec ?? 0.04,
  };
}
