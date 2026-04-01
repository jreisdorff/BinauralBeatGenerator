export type TrackMeta = {
  id: string;
  title: string;
  subtitle?: string;
  /** What this beat is commonly explored for — hedged; not medical advice. */
  listenerNote?: string;
  file: string;
};

/** Paths under /audio/ after `npm run copy-assets` in web/ */
export const ANCIENT_TRACKS: TrackMeta[] = [
  {
    id: "tightening",
    title: "Tightening cycle (binaural stereo)",
    subtitle: "Seven retunings + closure — use headphones",
    file: "/audio/tightening-binaural.wav",
  },
];

export const BINAURAL_TRACKS: TrackMeta[] = [
  {
    id: "a432",
    title: "432 Hz carrier + 6 Hz beat",
    listenerNote:
      "6 Hz sits near the alpha–theta border. People often try this band for gentle relaxation, slower breathing, or a calmer but still awake headspace—responses vary widely.",
    file: "/audio/preset-a432-beat6.wav",
  },
  {
    id: "sol396",
    title: "Solfeggio-style 396 Hz + beat",
    subtitle: "6 Hz beat",
    listenerNote:
      "Same 6 Hz beat as above; carrier pitch changes timbre, not the beat rate. Often explored like other theta-border sessions: unwind without fully zoning out.",
    file: "/audio/preset-solfeggio-396.wav",
  },
  {
    id: "sol528",
    title: "Solfeggio-style 528 Hz + beat",
    subtitle: "6 Hz beat",
    listenerNote:
      "Again a 6 Hz interaural difference with a higher carrier. Some listeners find brighter carriers more engaging; the subjective ‘goal’ is usually still mild relaxation or focus play.",
    file: "/audio/preset-solfeggio-528.wav",
  },
  {
    id: "sol852",
    title: "Solfeggio-style 852 Hz + beat",
    subtitle: "5 Hz beat",
    listenerNote:
      "5 Hz is in the theta range. Commonly explored for deeper unwinding, inward or imagery-friendly listening, or before sleep—though it can feel too slow or droning for some.",
    file: "/audio/preset-solfeggio-852.wav",
  },
  {
    id: "chakra-root",
    title: " “root” table (256 Hz)",
    subtitle: "4 Hz beat",
    listenerNote:
      "4 Hz is lower theta. Some people report a heavier, dreamier, or sleepier pull; others feel little. Not a substitute for clinical sleep or anxiety care.",
    file: "/audio/preset-chakra--root.wav",
  },
  {
    id: "chakra-heart",
    title: " “heart” pairing (528 Hz)",
    subtitle: "5 Hz beat",
    listenerNote:
      "5 Hz theta-style beat with a mid-high carrier. Often used like other slow-beat tracks: soften stress or support a soft-focus pause—expectation and mood matter a lot.",
    file: "/audio/preset-chakra--heart.wav",
  },
  {
    id: "sweep",
    title: "528 Hz carrier, beat 18 → 4 Hz sweep",
    listenerNote:
      "Moves from a faster pulse (~18 Hz, beta-like) down toward ~4 Hz (theta). Good for noticing how rhythm feels as it slows—alert → mellow is a common report, not a promise.",
    file: "/audio/preset-solfeggio-528-sweep-beat.wav",
  },
  {
    id: "pure220",
    title: "Pure binaural (220 Hz / 10 Hz default)",
    listenerNote:
      "10 Hz is classic ‘mid alpha’ in popular guides: relaxed wakefulness, light focus, or stress unwinding. Study results are mixed; try short sessions and trust your own comfort.",
    file: "/audio/pure-binaural-220Hz-beat10Hz.wav",
  },
];

export const MIDI_DOWNLOAD = {
  title: "Tightening cycle (MIDI)",
  file: "/audio/tightening-cycle.mid",
};
