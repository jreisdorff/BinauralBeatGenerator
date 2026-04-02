import { IRAQ_CORPUS, UET_VII_74 } from "./corpus.js";
import {
  BABYLONIAN_HEPTACHORD_NAMES,
  modulationGraph,
} from "./tuning/modes.js";
import {
  CBS10996_ROWS,
  fourteenDichords,
  formatPair,
} from "./tuning/cbs10996Pairs.js";
import {
  TIGHTENING_CYCLE,
  formatTritonePair,
  stepTighten,
  fullTighteningSequence,
} from "./tuning/modulationUet74.js";
import {
  REFERENCE_A4_HZ,
  defaultFundamentalForA4,
  nineStringFrequencies,
} from "./tuning/nineStrings.js";

export function summarizePhilology(): string {
  const firstTight = TIGHTENING_CYCLE[0]!;
  const tightenFromIšartum = stepTighten("išartum");

  const lines = [
    "SoundLab — corpus summary (see docs/philology-iraq-sources.md)",
    "",
    `Reference A4: ${REFERENCE_A4_HZ} Hz (modern convention only)`,
    "",
    "Iraq articles in scope:",
    ...IRAQ_CORPUS.map(
      (t) =>
        `- ${t.designation}: ${t.article}, ${t.journal} ${t.volume} (${t.year})`,
    ),
    "",
    `Principal tablet: ${UET_VII_74.designation}`,
    "",
    "Heptachord names (Kilmer list order; sixth = nīš tuḫri):",
    ...BABYLONIAN_HEPTACHORD_NAMES.map((n) => `  • ${n}`),
    "",
    "UET VII 74 tightening tour (Crickmore 2008 Fig. 5):",
    `  ${fullTighteningSequence().join(" → ")}`,
    "",
    "Example tighten step (išartum):",
    `  unclear dichord ${formatTritonePair(tightenFromIšartum!.tritonePair)} → tighten strings [${tightenFromIšartum!.adjustStrings.join(", ")}] → ${tightenFromIšartum!.to}`,
    "",
    "First row of tightening cycle:",
    `  ${firstTight.from}: tritone ${formatTritonePair(firstTight.tritonePair)}, tighten [${firstTight.adjustStrings.join(", ")}] → ${firstTight.to}`,
    "",
    "CBS 10996 primary pairs (Crickmore Fig. 2):",
    ...CBS10996_ROWS.map(
      (r) =>
        `  ${r.associatedHeptachord}: primary ${formatPair(r.primaryPair)}, secondary ${formatPair(r.secondaryPair)}`,
    ),
    "",
    `Fourteen dichords (flattened): ${fourteenDichords().length}`,
    "",
    "Sample modulationGraph entry (išartum):",
    (() => {
      const g = modulationGraph["išartum"];
      return [
        `  unclear: ${g.unclearDichord}`,
        `  tighten → ${g.nextModeAfterTighten} (strings ${g.adjustStringsTighten.join(",")})`,
        `  loosen → ${g.nextModeAfterLoosen} (strings ${g.adjustStringsLoosen.join(",")})`,
      ].join("\n");
    })(),
    "",
    "Nine-string test frequencies (Hz), core + octaves:",
    ...nineStringFrequencies({
      fundamentalHz: defaultFundamentalForA4(),
    }).map((f, i) => `  string ${i + 1}: ${f.toFixed(3)}`),
    "",
    "MIDI (tightening cycle): npm run midi:tightening → out/tightening-cycle.mid",
    "  Optional: OPEN_MIDI=1 npm run midi:tightening (macOS opens default app)",
    "",
    "Binaural WAV (same schedule as MIDI; L=f, R=f+BEAT_HZ per partial):",
    "  npm run audio:binaural → out/tightening-binaural.wav",
    "  BEAT_HZ=10 BPM=72 A4_HZ=432 OPEN_WAV=1 npm run audio:binaural",
    "  REST_SEC=0.833 npm run audio:binaural  (optional quarter-rest gaps, ~midi:tightening)",
    "",
    "Pure binaural beat (explore carrier / beat / sweep): npm run audio:beat",
    "  CARRIER_HZ=220 BEAT_HZ=6 DURATION_SEC=600 npm run audio:beat",
    "  BEAT_HZ=40 BEAT_END=1 DURATION_SEC=120 npm run audio:beat  (linear sweep)",
    "",
    "Presets (): PRESET=solfeggio-528 npm run audio:preset  (see presets/README.md)",
    "  npm run audio:preset:all  — render every presets/*.json",
    "",
    "Acoustics (rooms / Chladni pedagogy): npm run acoustics:demo  → docs/sound-and-built-environment.md",
  ];
  return lines.join("\n");
}

console.log(summarizePhilology());
