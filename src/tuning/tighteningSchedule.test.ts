import { describe, expect, it } from "vitest";
import { buildTighteningScheduleSegments } from "./tighteningSchedule.js";
import { TIGHTENING_CYCLE } from "./modulationUet74.js";

describe("buildTighteningScheduleSegments", () => {
  it("has one segment per tightening step plus closure", () => {
    const segs = buildTighteningScheduleSegments(432);
    expect(segs).toHaveLength(TIGHTENING_CYCLE.length + 1);
  });

  it("each segment has seven partials", () => {
    const segs = buildTighteningScheduleSegments(432);
    for (const s of segs) {
      expect(s.freqsHz).toHaveLength(7);
      for (const f of s.freqsHz) {
        expect(f).toBeGreaterThan(0);
      }
    }
  });
});
