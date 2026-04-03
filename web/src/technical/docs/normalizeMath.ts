/**
 * remark-math expects `$...$` / `$$...$$`; repository markdown uses LaTeX `\(...\)` / `\[...\]`.
 */
export function normalizeDocMath(markdown: string): string {
  let s = markdown;
  s = s.replace(
    /\\\[([\s\S]*?)\\\]/g,
    (_, inner: string) => `\n$$\n${inner.trim()}\n$$\n`,
  );
  s = s.replace(/\\\(([\s\S]*?)\\\)/g, (_, inner: string) => `$${inner}$`);
  return s;
}
