/**
 * Standard MIDI file for the UET VII 74 tightening cycle (Crickmore Fig. 5).
 * Simulates each retuning as ×2^(1/12) on the listed strings; plays a 7-string chord per step.
 */

import MidiWriter from "midi-writer-js";
import { buildTighteningScheduleSegments } from "../tuning/tighteningSchedule.js";
import { REFERENCE_A4_HZ } from "../tuning/nineStrings.js";
import { hzToPitchName } from "./hzToPitch.js";

export type TighteningMidiOptions = {
  /** Reference for Hz → pitch names (MIDI note 69 = this frequency). */
  a4Hz?: number;
  bpm?: number;
  /** midi-writer duration string per chord (e.g. '2' = half note). */
  chordDuration?: string;
  /** Rest after each chord (e.g. '4' = quarter). */
  restAfterChord?: string;
  /** General MIDI program 0–127 (default 46 = orchestral harp). */
  instrument?: number;
};

/**
 * Build a single-track Type 1–style buffer: markers + chords for each `from` mode, then final state.
 */
export function buildTighteningCycleMidi(
  options: TighteningMidiOptions = {},
): Uint8Array {
  const a4Hz = options.a4Hz ?? REFERENCE_A4_HZ;
  const bpm = options.bpm ?? 72;
  const chordDuration = options.chordDuration ?? "2";
  const restAfterChord = options.restAfterChord ?? "4";
  const instrument = options.instrument ?? 46;

  const segments = buildTighteningScheduleSegments(a4Hz);

  const track = new MidiWriter.Track();
  track.addEvent(new MidiWriter.TrackNameEvent({ text: "UET VII 74 tightening" }));
  track.addEvent(new MidiWriter.TempoEvent({ bpm }));
  track.addEvent(
    new MidiWriter.InstrumentNameEvent({ text: "Harp (GM); A4 ref in Hz only" }),
  );
  track.addEvent(
    new MidiWriter.TextEvent({
      text: `Reference A4=${a4Hz} Hz; just heptad + semitone retunings (modern model).`,
    }),
  );
  track.addEvent(
    new MidiWriter.ProgramChangeEvent({
      instrument: Math.min(127, Math.max(0, instrument)),
    }),
  );

  let firstChord = true;
  for (const seg of segments) {
    track.addEvent(new MidiWriter.MarkerEvent({ text: seg.label }));
    track.addEvent(
      new MidiWriter.NoteEvent({
        pitch: seg.freqsHz.map((hz) => hzToPitchName(hz, a4Hz)),
        duration: chordDuration,
        velocity: 55,
        wait: firstChord ? "0" : restAfterChord,
      }),
    );
    firstChord = false;
  }

  const writer = new MidiWriter.Writer(track);
  return writer.buildFile();
}
