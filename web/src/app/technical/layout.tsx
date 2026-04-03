import type { Metadata } from "next";
import { TechnicalChrome } from "@/technical/components/TechnicalChrome";
import "@/technical/technical.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "Technical walkthrough",
  description:
    "Monospace companion to SoundWorld: formulas, code sketches, and bundled doc previews.",
};

export default function TechnicalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="technical-doc-scope">
      <TechnicalChrome>{children}</TechnicalChrome>
    </div>
  );
}
