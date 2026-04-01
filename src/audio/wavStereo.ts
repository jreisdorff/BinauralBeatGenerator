/**
 * Minimal 16-bit stereo PCM WAV writer (interleaved LRLR…).
 */

import { writeFileSync } from "node:fs";

function writeString(view: DataView, offset: number, s: string): void {
  for (let i = 0; i < s.length; i++) {
    view.setUint8(offset + i, s.charCodeAt(i)!);
  }
}

/** `samples` length must be 2 * frameCount (L,R pairs). Values in [-1, 1]. */
export function writeStereoWavFile(
  path: string,
  samples: Float32Array,
  sampleRate: number,
): void {
  if (samples.length % 2 !== 0) {
    throw new Error("stereo samples must have even length");
  }
  const frameCount = samples.length / 2;
  const bitsPerSample = 16;
  const bytesPerSample = 2;
  const blockAlign = 2 * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = frameCount * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 2, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  let o = 44;
  for (let i = 0; i < samples.length; i++) {
    const x = Math.max(-1, Math.min(1, samples[i]!));
    const q = x < 0 ? x * 0x8000 : x * 0x7fff;
    view.setInt16(o, Math.round(q), true);
    o += 2;
  }

  writeFileSync(path, new Uint8Array(buffer));
}
