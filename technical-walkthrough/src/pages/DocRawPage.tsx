import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {
  DOC_DISPLAY_PATH,
  DOC_RAW,
  isDocSlug,
  type DocSlug,
} from "../docs/bundled";
import { normalizeDocMath } from "../docs/normalizeMath";

export function DocRawPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !isDocSlug(slug)) {
    return (
      <>
        <h1>Unknown document</h1>
        <p>
          No bundled markdown for <code>{slug ?? "(missing)"}</code>.
        </p>
        <p>
          <Link to="/reference">Back to reference</Link>
        </p>
      </>
    );
  }

  const key = slug as DocSlug;
  const displayPath = DOC_DISPLAY_PATH[key];
  const raw = DOC_RAW[key];
  const prepared = useMemo(() => normalizeDocMath(raw), [raw]);

  return (
    <>
      <p className="doc-preview-nav">
        <Link to="/reference">Reference</Link>
        {" · "}
        <Link to="/">Overview</Link>
      </p>
      <h1 className="doc-preview-title">Preview: {displayPath}</h1>
      <p className="doc-preview-note">
        Rendered from bundled repository markdown (GFM tables, headings, lists). Inline
        and display math uses <code>\( \)</code> / <code>\[ \]</code> in source,
        normalized for KaTeX.
      </p>
      <article className="markdown-preview">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            a: ({ href, children, ...rest }) => (
              <a
                href={href}
                {...rest}
                {...(href?.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {children}
              </a>
            ),
          }}
        >
          {prepared}
        </ReactMarkdown>
      </article>
    </>
  );
}
