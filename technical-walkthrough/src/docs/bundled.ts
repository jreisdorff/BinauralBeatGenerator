import philologyIraqSources from "../../../docs/philology-iraq-sources.md?raw";
import soundAndBuiltEnvironment from "../../../docs/sound-and-built-environment.md?raw";
import pyramidsSoundAndClaims from "../../../docs/pyramids-sound-and-claims.md?raw";

export type DocSlug =
  | "philology-iraq-sources"
  | "sound-and-built-environment"
  | "pyramids-sound-and-claims";

export const DOC_DISPLAY_PATH: Record<DocSlug, string> = {
  "philology-iraq-sources": "docs/philology-iraq-sources.md",
  "sound-and-built-environment": "docs/sound-and-built-environment.md",
  "pyramids-sound-and-claims": "docs/pyramids-sound-and-claims.md",
};

export const DOC_RAW: Record<DocSlug, string> = {
  "philology-iraq-sources": philologyIraqSources,
  "sound-and-built-environment": soundAndBuiltEnvironment,
  "pyramids-sound-and-claims": pyramidsSoundAndClaims,
};

export function isDocSlug(s: string): s is DocSlug {
  return s in DOC_RAW;
}
