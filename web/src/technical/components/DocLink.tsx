import Link from "next/link";
import type { DocSlug } from "@/technical/docs/loadDocs";
import { DOC_DISPLAY_PATH } from "@/technical/docs/loadDocs";

type Props = {
  slug: DocSlug;
};

/** Clickable link to rendered markdown preview for a bundled repository doc. */
export function DocLink({ slug }: Props) {
  const path = DOC_DISPLAY_PATH[slug];
  return (
    <Link href={`/technical/docs/${slug}`} className="doc-md-link">
      <code>{path}</code>
    </Link>
  );
}
