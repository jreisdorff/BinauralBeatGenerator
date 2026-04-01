# AncientMusic

Small tools around **Old Babylonian / Mesopotamian tuning theory** (see `docs/philology-iraq-sources.md`). This is a modern reconstruction for sound experiments—not a claim that the tablets specify Hz.

## Setup

```bash
cd AncientMusic
npm install
```

## Quick run

Print a text summary (corpus, heptachords, modulation, file hints):

```bash
npm start
```

## MIDI (tightening cycle)

Builds a Standard MIDI file from the **UET VII 74 tightening tour** (after Crickmore’s figures). Uses **A4 = 432 Hz** only as a reference when mapping frequencies to note names.

```bash
npm run midi:tightening
```

Output: **`out/tightening-cycle.mid`**

On a Mac, open it automatically:

```bash
OPEN_MIDI=1 npm run midi:tightening
```

## WAV — tightening cycle + binaural offset

Renders the **same** chord sequence as stereo audio. Each partial is **slightly higher in the right ear** than the left, by **`BEAT_HZ`**, so you get a binaural-style beat. **Use headphones.**

```bash
npm run audio:binaural
```

Default: no silence between chords. Optional gap (about one quarter-note at BPM 72):

```bash
REST_SEC=0.833 npm run audio:binaural
```

Tweak examples:

```bash
BEAT_HZ=10 BPM=72 A4_HZ=432 npm run audio:binaural
OPEN_WAV=1 npm run audio:binaural   # macOS: open the WAV when done
```

Output: **`out/tightening-binaural.wav`**

## WAV — pure binaural beat (explore frequencies)

One sine wave in each ear; perceived pulse rate is about the **difference** between them. Good for trying carriers and beat rates outside the tightening chords.

```bash
npm run audio:beat
```

Defaults: 220 Hz carrier, 10 Hz beat, 120 seconds → **`out/pure-binaural-220Hz-beat10Hz.wav`**

Examples:

```bash
CARRIER_HZ=200 BEAT_HZ=4 DURATION_SEC=300 npm run audio:beat
BEAT_HZ=40 BEAT_END=2 DURATION_SEC=180 npm run audio:beat   # sweep 40 → 2 Hz over the file
OUT=out/my-beat.wav npm run audio:beat
```

**Headphones required** for the effect.

## Presets (432 / “solfeggio” / chakra folklore — **not** ancient Babylon)

JSON under **`presets/`** is explicitly **non-historical**: quick binaural experiments without mixing those ideas into the philology doc. Each file includes a **`disclaimer`** field.

```bash
PRESET=solfeggio-528 npm run audio:preset
PRESET=a432-carrier-6hz-beat npm run audio:preset
```

Omit `PRESET` to print available ids. Same env overrides as `audio:beat` (`BEAT_HZ`, `OUT`, …). See **`presets/README.md`**.

## Tests

```bash
npm test
```

## Project layout (short)

| Path | What it is |
|------|------------|
| `docs/philology-iraq-sources.md` | Sources and how the code maps to them |
| `src/tuning/` | Heptachords, UET VII 74 cycles, CBS 10996 pairs, schedule |
| `src/midi/` | MIDI export |
| `src/audio/` | Binaural WAV synthesis |
| `out/` | Generated `.mid` / `.wav` (gitignored) |
| `presets/` | Non-historical binaural JSON → `npm run audio:preset` |
