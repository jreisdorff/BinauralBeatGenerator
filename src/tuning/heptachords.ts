/**
 * Seven Babylonian heptachord names (Kilmer / “Greek order” listing).
 * Sixth name per Mirelman & Krispijn (*Iraq* 71): nīš tuḫri, not nīš GABA.RI.
 */

export const BABYLONIAN_HEPTACHORD_NAMES = [
  "išartum",
  "kitmû",
  "embūbum",
  "pītum",
  "nīd qabli",
  "nīš tuḫri",
  "qablītum",
] as const;

export type BabylonianHeptachord = (typeof BABYLONIAN_HEPTACHORD_NAMES)[number];
