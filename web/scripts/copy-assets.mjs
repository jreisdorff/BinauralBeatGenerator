/**
 * Copy generated samples from repo ../out into public/audio (and chladni SVG).
 * Run from repo root: npm run copy-assets --prefix web
 * Or: cd web && npm run copy-assets
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = join(__dirname, "..");
const repoOut = join(webRoot, "..", "out");
const pubAudio = join(webRoot, "public", "audio");
const pubImg = join(webRoot, "public", "images");

mkdirSync(pubAudio, { recursive: true });
mkdirSync(pubImg, { recursive: true });

const wavFiles = [
  "tightening-binaural.wav",
  "preset-a432-beat6.wav",
  "preset-solfeggio-396.wav",
  "preset-solfeggio-528.wav",
  "preset-solfeggio-852.wav",
  "preset-chakra--root.wav",
  "preset-chakra--heart.wav",
  "preset-solfeggio-528-sweep-beat.wav",
  "pure-binaural-220Hz-beat10Hz.wav",
];

const other = ["tightening-cycle.mid"];

/** If the preferred filename is missing, copy from a legacy name (same bytes, web path stays canonical). */
const WAV_ALIASES = [
  ["preset-chakra--root.wav", "preset-chakra-folklore-root.wav"],
  ["preset-chakra--heart.wav", "preset-chakra-folklore-heart.wav"],
];

function copyOneWav(filename) {
  const dest = join(pubAudio, filename);
  const primary = join(repoOut, filename);
  if (existsSync(primary)) {
    copyFileSync(primary, dest);
    console.log("copied", filename);
    return true;
  }
  const alias = WAV_ALIASES.find(([want]) => want === filename);
  if (alias) {
    const [, legacy] = alias;
    const leg = join(repoOut, legacy);
    if (existsSync(leg)) {
      copyFileSync(leg, dest);
      console.log("copied", filename, "(from", legacy + ")");
      return true;
    }
  }
  return false;
}

let n = 0;
for (const f of wavFiles) {
  if (copyOneWav(f)) n++;
}
for (const f of other) {
  const src = join(repoOut, f);
  const dest = join(pubAudio, f);
  if (existsSync(src)) {
    copyFileSync(src, dest);
    console.log("copied", f);
    n++;
  }
}

for (const svg of ["chladni-mode-3-4.svg", "chladni-mode-2-5.svg"]) {
  const src = join(repoOut, svg);
  const dest = join(pubImg, svg);
  if (existsSync(src)) {
    copyFileSync(src, dest);
    console.log("copied", svg);
    n++;
  }
}

if (n === 0) {
  console.warn(
    "No files copied. Generate them first:\n" +
      "  npm run audio:binaural && npm run audio:preset:all && npm run midi:tightening && npm run acoustics:demo\n" +
      "  (from repo root)",
  );
} else {
  console.log(`Done. ${n} file(s) into web/public/`);
}
