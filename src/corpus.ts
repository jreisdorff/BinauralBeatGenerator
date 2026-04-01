/**
 * Tablet register for the Old Babylonian / Babylonian music-theory corpus
 * prioritized for this project (Cambridge *Iraq* and directly related editions).
 */

export type TabletRef = {
  id: string;
  designation: string;
  period: string;
  article: string;
  journal: string;
  volume: number;
  year: number;
  pages?: string;
  role: string;
};

export const IRAQ_CORPUS: TabletRef[] = [
  {
    id: "uet-vi3-899",
    designation: "UET VI/3 899",
    period: "Old Babylonian",
    article: "The Old Babylonian Tuning Text UET VI/3 899",
    journal: "Iraq",
    volume: 71,
    year: 2009,
    pages: "43–52",
    role: "Modulation text; confirms/refines UET VII 74 cycle; nīš tuḫri(m) reading.",
  },
  {
    id: "bm-65217-66616",
    designation: "BM 65217 + 66616",
    period: "First millennium (Babylonian context)",
    article: "A Music Tablet from Sippar(?): BM 65217 + 66616",
    journal: "Iraq",
    volume: 46,
    year: 1984,
    pages: "Iraq 46(2), 1984 — verify pages in PDF",
    role: "Interval / string-pair theory; fourteen dichords; heptatonic structure.",
  },
];

/** Principal modulation tablet (edition: Gurney / UET VII 74), cited throughout Mirelman & Krispijn 2009. */
export const UET_VII_74 = {
  designation: "UET VII 74 (U. 7/80)",
  firstPublication: "O. R. Gurney (Ur tablets / tuning text, 1968+)",
  role: "Main Old Babylonian modulation / retuning instructions for the sammu.",
} as const;
