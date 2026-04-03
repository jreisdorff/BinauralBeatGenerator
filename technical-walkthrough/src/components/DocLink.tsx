import { Link } from "react-router-dom";
import type { DocSlug } from "../docs/bundled";
import { DOC_DISPLAY_PATH } from "../docs/bundled";

type Props = {
  slug: DocSlug;
};

/** Clickable link to raw markdown view for a bundled repository doc. */
export function DocLink({ slug }: Props) {
  const path = DOC_DISPLAY_PATH[slug];
  return (
    <Link to={`/docs/${slug}`} className="doc-md-link">
      <code>{path}</code>
    </Link>
  );
}
