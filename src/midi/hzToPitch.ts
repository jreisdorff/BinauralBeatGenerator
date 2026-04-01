/**
 * Map Hz to MIDI-style pitch names for midi-writer-js (A4 reference, default 432 Hz).
 * Integer note numbers are rounded; microtonal offset from 12-TET is not preserved in GM.
 */

const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export function hzToMidiFloat(freq: number, a4Hz: number): number {
  if (freq <= 0 || a4Hz <= 0) throw new Error("frequency must be positive");
  return 69 + 12 * Math.log2(freq / a4Hz);
}

/** Rounded MIDI note number → scientific pitch string (e.g. 69 → A4). */
export function midiFloatToPitchName(midi: number): string {
  const rounded = Math.round(midi);
  const name = NOTE_NAMES[((rounded % 12) + 12) % 12]!;
  const octave = Math.floor(rounded / 12) - 1;
  return `${name}${octave}`;
}

export function hzToPitchName(freq: number, a4Hz: number): string {
  return midiFloatToPitchName(hzToMidiFloat(freq, a4Hz));
}
