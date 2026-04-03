/** Same-origin technical walkthrough under the Next app (`output: 'export'` friendly). */
const TECH_BASE = "/technical";

export type TechWalkthroughSegment =
  | "overview"
  | "ancient"
  | "binaural"
  | "calm"
  | "acoustics"
  | "pyramids"
  | "reference";

const SEGMENT_PATH: Record<TechWalkthroughSegment, string> = {
  overview: "",
  ancient: "/ancient",
  binaural: "/binaural",
  calm: "/calm",
  acoustics: "/acoustics",
  pyramids: "/pyramids",
  reference: "/reference",
};

/** Path for `next/link` or `<a href>` (leading slash, no trailing slash except base). */
export function technicalWalkthroughPath(
  segment: TechWalkthroughSegment,
): string {
  const suffix = SEGMENT_PATH[segment];
  return suffix === "" ? TECH_BASE : `${TECH_BASE}${suffix}`;
}

export function technicalWalkthroughUrl(
  segment: TechWalkthroughSegment,
): string {
  return technicalWalkthroughPath(segment);
}
