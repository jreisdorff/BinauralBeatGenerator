/**
 * Shared timeline for the UET VII 74 tightening simulation (Crickmore Fig. 5):
 * seven chords (one per `from` mode) plus final closure chord, with Hz after each retuning step.
 */

import { TIGHTENING_CYCLE } from "./modulationUet74.js";
import {
  defaultFundamentalForA4,
  nineStringFrequencies,
  REFERENCE_A4_HZ,
} from "./nineStrings.js";

const SEMITONE_RATIO = Math.pow(2, 1 / 12);

export type TighteningScheduleSegment = {
  label: string;
  /** Seven core string frequencies (Hz), strings 1–7. */
  freqsHz: readonly number[];
};

function cloneFreqs(f: number[]): number[] {
  return [...f];
}

function applyTighten(freqs: number[], stringNumbers: readonly number[]): void {
  for (const s of stringNumbers) {
    const i = s - 1;
    if (i < 0 || i >= freqs.length) throw new Error(`invalid string index ${s}`);
    freqs[i]! *= SEMITONE_RATIO;
  }
}

/** One entry per tightening step (`from` state) plus final post-cycle chord. */
export function buildTighteningScheduleSegments(
  a4Hz: number = REFERENCE_A4_HZ,
): TighteningScheduleSegment[] {
  const freqs = cloneFreqs(
    nineStringFrequencies({ fundamentalHz: defaultFundamentalForA4(a4Hz) }),
  );
  const segments: TighteningScheduleSegment[] = [];

  for (const step of TIGHTENING_CYCLE) {
    segments.push({
      label: `${step.from} → tritone ${step.tritonePair[0]}-${step.tritonePair[1]}`,
      freqsHz: freqs.slice(0, 7),
    });
    applyTighten(freqs, step.adjustStrings);
  }

  segments.push({
    label: "išartum closure (+1 semitone, Crickmore Fig. 5)",
    freqsHz: freqs.slice(0, 7),
  });

  return segments;
}
