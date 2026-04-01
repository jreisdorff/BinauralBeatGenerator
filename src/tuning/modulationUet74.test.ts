import { describe, expect, it } from "vitest";
import {
  LOOSENING_CYCLE,
  TIGHTENING_CYCLE,
  stepLoosen,
  stepTighten,
} from "./modulationUet74.js";

describe("UET VII 74 cycles (Crickmore Figs 5–6)", () => {
  it("has seven tightening steps with unique from-modes", () => {
    expect(TIGHTENING_CYCLE).toHaveLength(7);
    const froms = TIGHTENING_CYCLE.map((s) => s.from);
    expect(new Set(froms).size).toBe(7);
  });

  it("kitmû tighten → išartum with +1 semitone", () => {
    const step = stepTighten("kitmû");
    expect(step).toBeDefined();
    expect(step!.to).toBe("išartum");
    expect(step!.semitoneTranspose).toBe(1);
  });

  it("išartum loosen → kitmû (Fig. 6 first step)", () => {
    const step = stepLoosen("išartum");
    expect(step).toBeDefined();
    expect(step!.to).toBe("kitmû");
    expect(step!.adjustStrings).toEqual([2, 9]);
  });

  it("qablītum loosen → išartum with −1 semitone", () => {
    const step = stepLoosen("qablītum");
    expect(step!.to).toBe("išartum");
    expect(step!.semitoneTranspose).toBe(-1);
  });

  it("loosening cycle mirrors seven modes", () => {
    expect(LOOSENING_CYCLE).toHaveLength(7);
    const froms = LOOSENING_CYCLE.map((s) => s.from);
    expect(new Set(froms).size).toBe(7);
  });
});
