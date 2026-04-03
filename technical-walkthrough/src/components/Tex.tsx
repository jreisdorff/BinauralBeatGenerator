import katex from "katex";
import "katex/dist/katex.min.css";

type BlockProps = { tex: string };

/** Display-mode KaTeX (block). */
export function BlockMath({ tex }: BlockProps) {
  const html = katex.renderToString(tex, {
    displayMode: true,
    throwOnError: false,
    strict: "ignore",
  });
  return (
    <div
      className="math-block"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/** Inline KaTeX. */
export function InlineMath({ tex }: BlockProps) {
  const html = katex.renderToString(tex, {
    displayMode: false,
    throwOnError: false,
    strict: "ignore",
  });
  return (
    <span
      className="math-inline"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
