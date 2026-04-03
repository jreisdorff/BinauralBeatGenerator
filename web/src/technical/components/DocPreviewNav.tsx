import Link from "next/link";

export function DocPreviewNav() {
  return (
    <p className="doc-preview-nav">
      <Link href="/technical/reference">Reference</Link>
      {" · "}
      <Link href="/technical">Overview</Link>
    </p>
  );
}
