/**
 * Single pair of sine carriers: one frequency per ear. Perceived beat rate ≈ |f_R − f_L|
 * when listened to on headphones (classic binaural beat).
 *
 * Optional linear sweep of the interaural difference over time (explore many beat rates in one file).
 */

const TAU = Math.PI * 2;

export type PureBinauralBeatOptions = {
  /** Lower of the two carrier frequencies (Hz), unless swapEars. */
  carrierHz: number;
  /** Starting interaural offset (Hz): other ear = carrier + beatHz. */
  beatHz: number;
  /** If set, beat offset moves linearly from beatHz to beatHzEnd over the duration. */
  beatHzEnd?: number;
  durationSec: number;
  sampleRate: number;
  /** Peak amplitude per channel, roughly 0–0.5. */
  amplitude: number;
  /** If true, right ear gets `carrierHz`, left gets `carrier + beat(t)`. */
  swapEars: boolean;
  /** Linear fade in/out at file edges (seconds). */
  edgeFadeSec: number;
};

function fadeFirstLastFrames(
  globalFrame: number,
  totalFrames: number,
  fadeFrames: number,
): number {
  if (fadeFrames <= 0 || totalFrames <= 0) return 1;
  const f = Math.min(fadeFrames, Math.max(1, Math.floor(totalFrames / 2)));
  if (globalFrame < f) return globalFrame / f;
  if (globalFrame >= totalFrames - f) {
    return (totalFrames - 1 - globalFrame) / f;
  }
  return 1;
}

/**
 * Phase of the higher-frequency ear when beat offset sweeps linearly:
 * f_high(t) = carrier + b0 + (b1-b0) * t/T
 * Φ_high(t) = 2π ∫_0^t f_high(τ) dτ
 */
function phaseHighEarIntegral(
  t: number,
  carrier: number,
  b0: number,
  b1: number,
  durationSec: number,
): number {
  if (durationSec <= 0) return TAU * (carrier + b0) * t;
  const k = (b1 - b0) / durationSec;
  return TAU * ((carrier + b0) * t + (k * t * t) / 2);
}

/** Right ear is carrier+beat; beat may sweep between beatA and beatB. */
export function assertUnderNyquist(
  carrierHz: number,
  beatA: number,
  beatB: number,
  sampleRate: number,
): void {
  const rLo = carrierHz + Math.min(beatA, beatB);
  const rHi = carrierHz + Math.max(beatA, beatB);
  const hi = Math.max(carrierHz, rLo, rHi);
  const lo = Math.min(carrierHz, rLo, rHi);
  const nyq = sampleRate * 0.49;
  if (carrierHz <= 0 || lo <= 0 || hi > nyq) {
    throw new Error(
      `Frequencies out of range for SR=${sampleRate}: need positive audible tones and max <= ${nyq.toFixed(0)} Hz (raise SAMPLE_RATE or lower CARRIER/BEAT)`,
    );
  }
}

export function renderPureBinauralBeat(
  options: PureBinauralBeatOptions,
): Float32Array {
  const {
    carrierHz,
    beatHz,
    beatHzEnd,
    durationSec,
    sampleRate,
    amplitude,
    swapEars,
    edgeFadeSec,
  } = options;

  if (durationSec <= 0) throw new Error("durationSec must be positive");
  const b1 = beatHzEnd ?? beatHz;

  assertUnderNyquist(carrierHz, beatHz, b1, sampleRate);

  const totalFrames = Math.max(1, Math.round(durationSec * sampleRate));
  const out = new Float32Array(totalFrames * 2);
  const fadeFrames = Math.round(edgeFadeSec * sampleRate);

  for (let i = 0; i < totalFrames; i++) {
    const t = i / sampleRate;
    const env = fadeFirstLastFrames(i, totalFrames, fadeFrames);
    const phLow = TAU * carrierHz * t;
    const phHigh = phaseHighEarIntegral(
      t,
      carrierHz,
      beatHz,
      b1,
      durationSec,
    );

    const lowSample = Math.sin(phLow) * amplitude * env;
    const highSample = Math.sin(phHigh) * amplitude * env;

    if (swapEars) {
      out[i * 2] = highSample;
      out[i * 2 + 1] = lowSample;
    } else {
      out[i * 2] = lowSample;
      out[i * 2 + 1] = highSample;
    }
  }

  return out;
}
