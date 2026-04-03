import { notFound } from "next/navigation";
import { DocMarkdownClient } from "@/technical/components/DocMarkdownClient";
import { DocPreviewNav } from "@/technical/components/DocPreviewNav";
import {
  DOC_DISPLAY_PATH,
  getDocRaw,
  getDocSlugs,
  isDocSlug,
} from "@/technical/docs/loadDocs";
import { normalizeDocMath } from "@/technical/docs/normalizeMath";

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TechnicalDocPreviewPage({ params }: Props) {
  const { slug } = await params;
  if (!isDocSlug(slug)) notFound();

  const raw = getDocRaw(slug);
  const prepared = normalizeDocMath(raw);
  const displayPath = DOC_DISPLAY_PATH[slug];

  return (
    <>
      <DocPreviewNav />
      <h1 className="doc-preview-title">Preview: {displayPath}</h1>
      <p className="doc-preview-note">
        Rendered from bundled repository markdown (GFM tables, headings, lists). Inline
        and display math uses <code>\( \)</code> / <code>\[ \]</code> in source,
        normalized for KaTeX.
      </p>
      <DocMarkdownClient markdown={prepared} />
    </>
  );
}
