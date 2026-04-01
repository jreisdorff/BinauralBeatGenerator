/**
 * Crude Chladni-style nodal visualization for a simply supported square plate mode (n,m):
 * displacement ∝ sin(nπx) sin(mπy) on the unit square.
 *
 * Real plates: stiffness, boundary conditions, and driving point matter; this is pedagogy only.
 */

export type ChladniGridOptions = {
  /** Cells per side (higher = smoother SVG, larger file). */
  resolution: number;
  /** Mode indices (>=1). */
  n: number;
  m: number;
};

function displacement(n: number, m: number, x: number, y: number): number {
  return Math.sin(n * Math.PI * x) * Math.sin(m * Math.PI * y);
}

/**
 * SVG with cells coloured by |w|; nodal regions (near zero) read as darker bands in grayscale.
 */
export function squarePlateModeSvg(options: ChladniGridOptions): string {
  const { resolution: N, n, m } = options;
  if (n < 1 || m < 1 || N < 8) {
    throw new Error("need n,m >= 1 and resolution >= 8");
  }

  const cell = 6;
  const pad = 20;
  const w = N * cell + pad * 2;
  const h = N * cell + pad * 2;
  const maxAbs = 1;

  const rects: string[] = [];
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) / N;
      const y = (j + 0.5) / N;
      const v = Math.abs(displacement(n, m, x, y));
      const g = Math.round(255 * (1 - v / maxAbs));
      const cx = pad + i * cell;
      const cy = pad + j * cell;
      rects.push(
        `<rect x="${cx}" y="${cy}" width="${cell}" height="${cell}" fill="rgb(${g},${g},${g})"/>`,
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="#1a1a1a"/>
  <text x="${pad}" y="14" fill="#ccc" font-size="12" font-family="system-ui,sans-serif">mode (${n},${m}) · |sin(nπx)sin(mπy)| · pedagogy only</text>
  ${rects.join("\n  ")}
</svg>`;
}
