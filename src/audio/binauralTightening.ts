/**
 * Render tightening-cycle chords as stereo audio with a fixed binaural offset:
 * left ear = f Hz, right ear = (f + beatHz) Hz for each partial (classic beat = beatHz).
 *
 * This is a technical demo pipeline, not a clinical or Monroe/Hemi-Sync protocol.
 */

import type { TighteningScheduleSegment } from "../tuning/tighteningSchedule.js";

export type BinauralRenderOptions = {
  /** Beat frequency in Hz (difference between ears). Typical exploration range ~2–20. */
  beatHz: number;
  sampleRate: number;
  /** Per-chord duration in seconds. */
  chordDurationSec: number;
  /** Silence between chords. */
  restDurationSec: number;
  /** Linear fade in/out per chord to reduce clicks. */
  edgeFadeSec: number;
};

const TAU = Math.PI * 2;

function fadeEnvelope(
  t: number,
  duration: number,
  fadeIn: number,
  fadeOut: number,
): number {
  if (duration <= 0) return 0;
  let g = 1;
  if (fadeIn > 0 && t < fadeIn) g *= t / fadeIn;
  if (fadeOut > 0 && t > duration - fadeOut) {
    g *= (duration - t) / fadeOut;
  }
  return Math.max(0, Math.min(1, g));
}

/** Fade in at file start / fade out at file end only (no ducking between back-to-back chords). */
function fadeFirstLastFrames(
  globalFrame: number,
  totalFrames: number,
  fadeFrames: number,
): number {
  if (fadeFrames <= 0 || totalFrames <= 0) return 1;
  const f = Math.min(fadeFrames, Math.floor(totalFrames / 2));
  if (globalFrame < f) return globalFrame / f;
  if (globalFrame >= totalFrames - f) {
    return (totalFrames - 1 - globalFrame) / f;
  }
  return 1;
}

/**
 * Sum of sines per partial; amplitude scaled so chords stay near [-1,1].
 */
export function renderTighteningBinaural(
  segments: readonly TighteningScheduleSegment[],
  options: BinauralRenderOptions,
): Float32Array {
  const {
    beatHz,
    sampleRate,
    chordDurationSec,
    restDurationSec,
    edgeFadeSec,
  } = options;
  if (beatHz <= 0) {
    throw new Error("beatHz must be positive (interaural difference in Hz)");
  }

  const fade = Math.min(edgeFadeSec, chordDurationSec / 4);
  const chordSamples = Math.max(1, Math.round(chordDurationSec * sampleRate));
  const restSamples = Math.max(0, Math.round(restDurationSec * sampleRate));
  const totalFrames =
    segments.length * chordSamples + Math.max(0, segments.length - 1) * restSamples;

  const out = new Float32Array(totalFrames * 2);
  let framePtr = 0;
  const gapless = restSamples === 0;
  const fadeFrames = gapless
    ? Math.round(edgeFadeSec * sampleRate)
    : Math.round(fade * sampleRate);

  const ampPerPartial = 0.65 / 7;

  for (let s = 0; s < segments.length; s++) {
    const seg = segments[s]!;
    const freqs = seg.freqsHz;
    if (freqs.length !== 7) throw new Error("expected seven partials per segment");

    for (let i = 0; i < chordSamples; i++) {
      const globalFrame = framePtr;
      const t = globalFrame / sampleRate;
      const env = gapless
        ? fadeFirstLastFrames(globalFrame, totalFrames, fadeFrames)
        : fadeEnvelope(i / sampleRate, chordDurationSec, fade, fade);
      let l = 0;
      let r = 0;
      for (const f of freqs) {
        if (f <= 0) continue;
        const ph = TAU * f * t;
        l += Math.sin(ph);
        r += Math.sin(TAU * (f + beatHz) * t);
      }
      l *= ampPerPartial * env;
      r *= ampPerPartial * env;
      out[framePtr * 2] = l;
      out[framePtr * 2 + 1] = r;
      framePtr++;
    }

    if (s < segments.length - 1 && restSamples > 0) {
      framePtr += restSamples;
    }
  }

  return out;
}
