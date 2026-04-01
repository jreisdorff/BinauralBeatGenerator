import { describe, expect, it } from "vitest";
import {
  assertUnderNyquist,
  renderPureBinauralBeat,
} from "./pureBinauralBeat.js";

describe("renderPureBinauralBeat", () => {
  it("produces correct stereo frame count", () => {
    const sr = 8000;
    const dur = 0.5;
    const buf = renderPureBinauralBeat({
      carrierHz: 200,
      beatHz: 5,
      durationSec: dur,
      sampleRate: sr,
      amplitude: 0.2,
      swapEars: false,
      edgeFadeSec: 0,
    });
    expect(buf.length).toBe(Math.round(dur * sr) * 2);
  });

  it("throws if carrier+beat above Nyquist", () => {
    expect(() => assertUnderNyquist(20000, 5000, 5000, 48000)).toThrow(
      /Frequencies out of range/,
    );
  });
});
