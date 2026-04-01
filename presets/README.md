# Presets (non-historical)

These JSON files drive **`npm run audio:preset`**. They are **not** from Old Babylonian tablets, Cambridge *Iraq* philology, or verifiable ancient tuning data. They exist so you can quickly render **headphone binaural** experiments (432 Hz culture, popular “solfeggio” numbers, internet chakra Hz tables) **without mixing those claims into** `docs/philology-iraq-sources.md`.

## Run

```bash
# list ids if you omit PRESET (script prints available names)
PRESET=solfeggio-528 npm run audio:preset
PRESET=a432-carrier-6hz-beat OPEN_WAV=1 npm run audio:preset
```

Env vars **override** the JSON when set (same as `audio:beat`): `CARRIER_HZ`, `BEAT_HZ`, `BEAT_END`, `DURATION_SEC`, `SAMPLE_RATE`, `AMPLITUDE`, `FADE_SEC`, `SWAP_EARS`, `OUT`, `OPEN_WAV`.

## JSON fields

| Field | Required | Notes |
|--------|-----------|--------|
| `title` | yes | Short description |
| `disclaimer` | yes | Honesty sticker (shown in the console) |
| `carrierHz` | yes | Lower ear (unless `swapEars`) |
| `beatHz` | yes | Starting interaural offset (Hz) |
| `beatHzEnd` | no | If set, linear sweep to this offset |
| `durationSec` | yes | Length of the WAV |
| `outputFilename` | yes | Written under `out/` unless `OUT=` is set |
| `swapEars`, `amplitude`, `sampleRate`, `fadeSec` | no | Defaults match `audio:beat` |

Copy an existing file, change the values, save as `presets/my-name.json`, then `PRESET=my-name npm run audio:preset`.

## Files here

- **a432-carrier-6hz-beat** — 432 Hz reference + modest beat  
- **solfeggio-396 / 528 / 852** — common list frequencies (wellness literature)  
- **solfeggio-beat-sweep** — fixed 528 Hz carrier, beat sweeps down  
- **chakra-folklore-root / heart** — illustrative Hz from typical web tables, clearly labeled folklore  

**Headphones required** for the binaural effect.
