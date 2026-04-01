import { describe, expect, it } from "vitest";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  listPresetIds,
  loadPresetFile,
  presetToRenderOptions,
} from "./loadPreset.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("presets/", () => {
  it("lists json preset ids", () => {
    const ids = listPresetIds(root);
    expect(ids).toContain("solfeggio-528");
    expect(ids).toContain("a432-carrier-6hz-beat");
  });

  it("loads solfeggio-528 and builds render options", () => {
    const p = loadPresetFile(root, "solfeggio-528");
    expect(p.disclaimer.length).toBeGreaterThan(10);
    const o = presetToRenderOptions(p);
    expect(o.carrierHz).toBe(528);
    expect(o.beatHz).toBe(6);
    expect(o.beatHzEnd).toBeUndefined();
  });

  it("loads beat sweep preset", () => {
    const p = loadPresetFile(root, "solfeggio-beat-sweep");
    const o = presetToRenderOptions(p);
    expect(o.beatHzEnd).toBe(4);
  });
});
