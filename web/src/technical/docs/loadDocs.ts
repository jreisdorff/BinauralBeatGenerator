import fs from "node:fs";
import path from "node:path";

export type DocSlug =
  | "philology-iraq-sources"
  | "sound-and-built-environment"
  | "pyramids-sound-and-claims";

const FILES: Record<DocSlug, string> = {
  "philology-iraq-sources": "philology-iraq-sources.md",
  "sound-and-built-environment": "sound-and-built-environment.md",
  "pyramids-sound-and-claims": "pyramids-sound-and-claims.md",
};

export const DOC_DISPLAY_PATH: Record<DocSlug, string> = {
  "philology-iraq-sources": "docs/philology-iraq-sources.md",
  "sound-and-built-environment": "docs/sound-and-built-environment.md",
  "pyramids-sound-and-claims": "docs/pyramids-sound-and-claims.md",
};

function docsDir(): string {
  return path.join(process.cwd(), "..", "docs");
}

export function isDocSlug(s: string): s is DocSlug {
  return s in FILES;
}

export function getDocSlugs(): DocSlug[] {
  return Object.keys(FILES) as DocSlug[];
}

export function getDocRaw(slug: DocSlug): string {
  const file = FILES[slug];
  const full = path.join(docsDir(), file);
  return fs.readFileSync(full, "utf8");
}
