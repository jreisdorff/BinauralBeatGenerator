import { describe, expect, it } from "vitest";
import { rectangularRoomModes, SPEED_OF_SOUND_M_S } from "./roomModes.js";

describe("rectangularRoomModes", () => {
  it("lowest mode is axial along longest dimension (12×8×3 m)", () => {
    const modes = rectangularRoomModes(
      { lengthM: 12, widthM: 8, heightM: 3 },
      { maxAxis: 4 },
    );
    expect(modes.length).toBeGreaterThan(0);
    const first = modes[0]!;
    expect(first.nx).toBe(1);
    expect(first.ny).toBe(0);
    expect(first.nz).toBe(0);
    const expected = (SPEED_OF_SOUND_M_S / 2) * (1 / 12);
    expect(first.hz).toBeCloseTo(expected, 5);
  });
});
