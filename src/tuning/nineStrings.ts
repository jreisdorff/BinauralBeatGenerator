/**
 * Nine-string sammu model implied by the tuning tradition (UET VII 74 et al.):
 * seven distinct steps on strings 1–7; strings 8–9 duplicate 1–2 at the octave.
 *
 * Ratios below are a *modern just-intonation major-like heptad* used only so the
 * program can sound something while philological modulation rules are transcribed.
 * They are NOT frequencies written on cuneiform tablets.
 */

export const REFERENCE_A4_HZ = 432;

/** Just-intonation ratios for strings 1–7 relative to string 1 = 1.0 (išartum-like ordering). */
export const JUST_HEPTAD_RATIOS: readonly number[] = [
  1,
  9 / 8,
  5 / 4,
  4 / 3,
  3 / 2,
  5 / 3,
  15 / 8,
];

export type NineStringState = {
  /** Fundamental frequency of string 1 in Hz (lowest of the core heptad). */
  fundamentalHz: number;
};

/**
 * Returns frequencies for strings 1–9. Strings 8–9 are 2× strings 1–2.
 */
export function nineStringFrequencies(state: NineStringState): number[] {
  const { fundamentalHz } = state;
  const core = JUST_HEPTAD_RATIOS.map((r) => fundamentalHz * r);
  if (core.length !== 7) throw new Error("expected seven core strings");
  const s8 = core[0]! * 2;
  const s9 = core[1]! * 2;
  return [...core, s8, s9];
}

/**
 * Map Western A4 to a plausible fundamental so that the heptad’s fifth degree
 * (ratio 3/2) aligns with A4 — arbitrary but stable for the project.
 */
export function defaultFundamentalForA4(a4Hz: number = REFERENCE_A4_HZ): number {
  const fifthRatio = 3 / 2;
  return a4Hz / fifthRatio;
}
