/**
 * Pedagogical shoebox “room” IR: sum of damped sinusoids at rectangular axial mode
 * frequencies (not a full wave simulation). Good for hearing how dimensions colour decay.
 */

import { rectangularRoomModes, type RoomDimensions } from "./roomModes";

export type ShoeboxIrOptions = {
  /** How many lowest modes to mix (cost ~ modes × samples). */
  maxModes?: number;
  /** Rough decay time (seconds); scales with volume if omitted. */
  t60Seconds?: number;
  /** IR length cap (seconds). */
  maxDurationSeconds?: number;
};

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

/** Amplitude decay so energy falls ~60 dB in T60 (simplified shoebox model). */
function decayRateFromT60(t60: number) {
  return (3 * Math.LN10) / t60;
}

/**
 * Build stereo impulse response buffer: mode sum with random phases, shared decay envelope.
 */
export function createShoeboxImpulseBuffer(
  ctx: BaseAudioContext,
  dims: RoomDimensions,
  opts: ShoeboxIrOptions = {},
): AudioBuffer {
  const maxModes = opts.maxModes ?? 40;
  const sr = ctx.sampleRate;
  const { lengthM: L, widthM: W, heightM: H } = dims;
  const V = L * W * H;
  const t60Default = clamp(0.22 + 0.55 * Math.min(1, V / 450), 0.25, 2.2);
  const t60 = opts.t60Seconds ?? t60Default;
  const decay = decayRateFromT60(t60);
  const maxDur = opts.maxDurationSeconds ?? Math.min(2, t60 * 2.5);
  const len = Math.floor(sr * maxDur);

  const modes = rectangularRoomModes(dims, 10).slice(0, maxModes);
  const phases = modes.map(() => Math.random() * Math.PI * 2);
  const earOffsetSec = 0.00042;

  const buf = ctx.createBuffer(2, len, sr);
  for (let c = 0; c < 2; c++) {
    const data = buf.getChannelData(c);
    const delaySec = c * earOffsetSec;
    for (let n = 0; n < len; n++) {
      const t = n / sr;
      const te = Math.max(0, t - delaySec);
      const env = Math.exp(-decay * te);
      let s = 0;
      for (let k = 0; k < modes.length; k++) {
        const f = modes[k]!.hz;
        const phi = phases[k]! + c * 0.17 * (k % 7);
        s += Math.sin(2 * Math.PI * f * te + phi);
      }
      data[n] = (s / Math.sqrt(modes.length)) * env * 0.42;
    }
  }

  let peak = 0.0001;
  for (let c = 0; c < 2; c++) {
    const data = buf.getChannelData(c);
    for (let n = 0; n < len; n++) peak = Math.max(peak, Math.abs(data[n]!));
  }
  const norm = 0.92 / peak;
  for (let c = 0; c < 2; c++) {
    const data = buf.getChannelData(c);
    for (let n = 0; n < len; n++) data[n]! *= norm;
  }

  return buf;
}

/** Short band-emphasised noise burst — reads as “snare-ish” without external samples. */
export function createSnareHitBuffer(ctx: BaseAudioContext): AudioBuffer {
  const sr = ctx.sampleRate;
  const dur = 0.11;
  const len = Math.ceil(sr * dur);
  const buf = ctx.createBuffer(1, len, sr);
  const d = buf.getChannelData(0);

  let b0 = 0;
  let b1 = 0;
  const fc = 2200 / sr;
  const r = Math.exp(-2 * Math.PI * fc);

  for (let i = 0; i < len; i++) {
    const t = i / sr;
    const attack = Math.min(1, t * 4200);
    const env = attack * Math.exp(-t * 38);
    const x = (Math.random() * 2 - 1) * env;
    b0 = r * b0 + (1 - r) * x;
    b1 = r * b1 + (1 - r) * b0;
    d[i] = (x * 0.35 + b1 * 1.15) * 0.9;
  }

  let peak = 0.0001;
  for (let i = 0; i < len; i++) peak = Math.max(peak, Math.abs(d[i]!));
  const norm = 0.95 / peak;
  for (let i = 0; i < len; i++) d[i]! *= norm;

  return buf;
}
