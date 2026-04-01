/**
 * UET VII 74 modulation cycles tabulated in Crickmore 2008 (ICONEA), Figures 5–6.
 * String numbers 1–9; 8 and 9 are octaves of 1 and 2 (retune together when listed).
 *
 * Mode spellings match BabylonianHeptachord (nīš tuḫri, not Crickmore’s “nīš GABA.RI*”).
 */

import type { BabylonianHeptachord } from "./heptachords.js";

export type ModulationDirection = "tighten" | "loosen";

export type ModulationStep = {
  from: BabylonianHeptachord;
  to: BabylonianHeptachord;
  /** String pair between which the tritone (“unclear” interval) lies in `from` mode. */
  tritonePair: readonly [number, number];
  /** Strings to tighten (Fig. 5) or loosen (Fig. 6) when moving `from` → `to`. */
  adjustStrings: readonly number[];
  direction: ModulationDirection;
  /** Only on cycle closure: kitmû → išartum (+1) or qablītum → išartum (−1). */
  semitoneTranspose?: 1 | -1;
};

/** Fig. 5 — successive tightening (first part of UET VII 74 per Crickmore). */
export const TIGHTENING_CYCLE: readonly ModulationStep[] = [
  {
    from: "išartum",
    to: "qablītum",
    tritonePair: [5, 2],
    adjustStrings: [5],
    direction: "tighten",
  },
  {
    from: "qablītum",
    to: "nīš tuḫri",
    tritonePair: [1, 5],
    adjustStrings: [1, 8],
    direction: "tighten",
  },
  {
    from: "nīš tuḫri",
    to: "nīd qabli",
    tritonePair: [4, 1],
    adjustStrings: [4],
    direction: "tighten",
  },
  {
    from: "nīd qabli",
    to: "pītum",
    tritonePair: [7, 4],
    adjustStrings: [7],
    direction: "tighten",
  },
  {
    from: "pītum",
    to: "embūbum",
    tritonePair: [3, 7],
    adjustStrings: [3],
    direction: "tighten",
  },
  {
    from: "embūbum",
    to: "kitmû",
    tritonePair: [6, 3],
    adjustStrings: [6],
    direction: "tighten",
  },
  {
    from: "kitmû",
    to: "išartum",
    tritonePair: [2, 6],
    adjustStrings: [2, 9],
    direction: "tighten",
    semitoneTranspose: 1,
  },
];

/** Fig. 6 — loosening (second part of UET VII 74 per Crickmore). */
export const LOOSENING_CYCLE: readonly ModulationStep[] = [
  {
    from: "išartum",
    to: "kitmû",
    tritonePair: [5, 2],
    adjustStrings: [2, 9],
    direction: "loosen",
  },
  {
    from: "kitmû",
    to: "embūbum",
    tritonePair: [2, 6],
    adjustStrings: [6],
    direction: "loosen",
  },
  {
    from: "embūbum",
    to: "pītum",
    tritonePair: [6, 3],
    adjustStrings: [3],
    direction: "loosen",
  },
  {
    from: "pītum",
    to: "nīd qabli",
    tritonePair: [3, 7],
    adjustStrings: [7],
    direction: "loosen",
  },
  {
    from: "nīd qabli",
    to: "nīš tuḫri",
    tritonePair: [7, 4],
    adjustStrings: [4],
    direction: "loosen",
  },
  {
    from: "nīš tuḫri",
    to: "qablītum",
    tritonePair: [4, 1],
    adjustStrings: [1, 8],
    direction: "loosen",
  },
  {
    from: "qablītum",
    to: "išartum",
    tritonePair: [1, 5],
    adjustStrings: [5],
    direction: "loosen",
    semitoneTranspose: -1,
  },
];

export function stepTighten(
  from: BabylonianHeptachord,
): ModulationStep | undefined {
  return TIGHTENING_CYCLE.find((s) => s.from === from);
}

export function stepLoosen(
  from: BabylonianHeptachord,
): ModulationStep | undefined {
  return LOOSENING_CYCLE.find((s) => s.from === from);
}

/** Ordered list of modes visited by repeated tightening (including final closure to išartum). */
export function fullTighteningSequence(): BabylonianHeptachord[] {
  const out: BabylonianHeptachord[] = [];
  for (const s of TIGHTENING_CYCLE) {
    out.push(s.from);
  }
  out.push(TIGHTENING_CYCLE[TIGHTENING_CYCLE.length - 1]!.to);
  return out;
}

export function formatTritonePair(pair: readonly [number, number]): string {
  return `${pair[0]}-${pair[1]}`;
}
