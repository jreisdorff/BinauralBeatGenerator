/**
 * CBS 10996 string-pair layout as in Crickmore 2008, Fig. 2 (after Kilmer).
 * Seven rows × (primary fifth/fourth pair + secondary third/sixth pair) = fourteen dichords.
 */

import type { BabylonianHeptachord } from "./heptachords.js";

export type DichordKind = "primary" | "secondary";

export type Cbs10996Row = {
  /** Heptachord whose basic tuning uses this primary pair in Kilmer/Crickmore’s column. */
  associatedHeptachord: BabylonianHeptachord;
  primaryPair: readonly [number, number];
  secondaryPair: readonly [number, number];
};

export const CBS10996_ROWS: readonly Cbs10996Row[] = [
  {
    associatedHeptachord: "nīš tuḫri",
    primaryPair: [1, 5],
    secondaryPair: [7, 5],
  },
  {
    associatedHeptachord: "išartum",
    primaryPair: [2, 6],
    secondaryPair: [1, 6],
  },
  {
    associatedHeptachord: "embūbum",
    primaryPair: [3, 7],
    secondaryPair: [2, 7],
  },
  {
    associatedHeptachord: "nīd qabli",
    primaryPair: [4, 1],
    secondaryPair: [1, 3],
  },
  {
    associatedHeptachord: "qablītum",
    primaryPair: [5, 2],
    secondaryPair: [2, 4],
  },
  {
    associatedHeptachord: "kitmû",
    primaryPair: [6, 3],
    secondaryPair: [3, 5],
  },
  {
    associatedHeptachord: "pītum",
    primaryPair: [7, 4],
    secondaryPair: [4, 6],
  },
];

export type FlatDichord = {
  kind: DichordKind;
  pair: readonly [number, number];
  associatedHeptachord: BabylonianHeptachord;
  rowIndex: number;
};

/** All fourteen string-pairs in tablet order (primary line then secondary line per row). */
export function fourteenDichords(): FlatDichord[] {
  const out: FlatDichord[] = [];
  CBS10996_ROWS.forEach((row, rowIndex) => {
    out.push({
      kind: "primary",
      pair: row.primaryPair,
      associatedHeptachord: row.associatedHeptachord,
      rowIndex,
    });
    out.push({
      kind: "secondary",
      pair: row.secondaryPair,
      associatedHeptachord: row.associatedHeptachord,
      rowIndex,
    });
  });
  return out;
}

export function formatPair(pair: readonly [number, number]): string {
  return `${pair[0]}-${pair[1]}`;
}
