/**
 * Heptachord names and modulation graph derived from UET VII 74 (Crickmore 2008 Figs 5–6).
 *
 * `BABYLONIAN_HEPTACHORD_NAMES` order is the Kilmer-style list, not the order of the tightening tour.
 */

import {
  LOOSENING_CYCLE,
  TIGHTENING_CYCLE,
  formatTritonePair,
} from "./modulationUet74.js";
import {
  BABYLONIAN_HEPTACHORD_NAMES,
  type BabylonianHeptachord,
} from "./heptachords.js";

export { BABYLONIAN_HEPTACHORD_NAMES, type BabylonianHeptachord };

export type ModulationGraph = Record<
  BabylonianHeptachord,
  {
    /** Tritone / “unclear” dichord for this mode (string numbers). */
    unclearDichord: string;
    nextModeAfterTighten: BabylonianHeptachord;
    adjustStringsTighten: readonly number[];
    semitoneTransposeTighten?: 1;
    nextModeAfterLoosen: BabylonianHeptachord;
    adjustStringsLoosen: readonly number[];
    semitoneTransposeLoosen?: -1;
  }
>;

function buildModulationGraph(): ModulationGraph {
  const init = BABYLONIAN_HEPTACHORD_NAMES.map((name) => [
    name,
    null,
  ]) as [BabylonianHeptachord, ModulationGraph[BabylonianHeptachord] | null][];

  const map = Object.fromEntries(init) as Record<
    BabylonianHeptachord,
    ModulationGraph[BabylonianHeptachord] | null
  >;

  for (const s of TIGHTENING_CYCLE) {
    const loosen = LOOSENING_CYCLE.find((l) => l.from === s.from);
    if (!loosen) {
      throw new Error(`Missing loosening step for mode ${s.from}`);
    }
    map[s.from] = {
      unclearDichord: formatTritonePair(s.tritonePair),
      nextModeAfterTighten: s.to,
      adjustStringsTighten: s.adjustStrings,
      semitoneTransposeTighten: s.semitoneTranspose === 1 ? 1 : undefined,
      nextModeAfterLoosen: loosen.to,
      adjustStringsLoosen: loosen.adjustStrings,
      semitoneTransposeLoosen: loosen.semitoneTranspose === -1 ? -1 : undefined,
    };
  }

  for (const name of BABYLONIAN_HEPTACHORD_NAMES) {
    if (map[name] == null) {
      throw new Error(`Modulation graph missing mode ${name}`);
    }
  }

  return map as ModulationGraph;
}

export const modulationGraph: ModulationGraph = buildModulationGraph();
