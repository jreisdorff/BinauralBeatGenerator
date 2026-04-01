/**
 * Axial / oblique room modes for a rectangular air-filled box (idealized).
 * c ≈ 343 m/s at ~20 °C.
 */

export const SPEED_OF_SOUND_M_S = 343;

export type RoomDimensions = {
  lengthM: number;
  widthM: number;
  heightM: number;
};

export type RoomMode = {
  nx: number;
  ny: number;
  nz: number;
  hz: number;
};

function modeFrequency(
  nx: number,
  ny: number,
  nz: number,
  Lx: number,
  Ly: number,
  Lz: number,
  c: number,
): number {
  const a = (nx / Lx) ** 2 + (ny / Ly) ** 2 + (nz / Lz) ** 2;
  return (c / 2) * Math.sqrt(a);
}

/**
 * Enumerate modes with each index in 0…maxAxis (not all zero). Sorted by Hz.
 */
export function rectangularRoomModes(
  dims: RoomDimensions,
  options: { maxAxis?: number; c?: number } = {},
): RoomMode[] {
  const { lengthM: Lx, widthM: Ly, heightM: Lz } = dims;
  if (Lx <= 0 || Ly <= 0 || Lz <= 0) {
    throw new Error("room dimensions must be positive");
  }
  const c = options.c ?? SPEED_OF_SOUND_M_S;
  const maxAxis = options.maxAxis ?? 12;
  const out: RoomMode[] = [];

  for (let nx = 0; nx <= maxAxis; nx++) {
    for (let ny = 0; ny <= maxAxis; ny++) {
      for (let nz = 0; nz <= maxAxis; nz++) {
        if (nx === 0 && ny === 0 && nz === 0) continue;
        const hz = modeFrequency(nx, ny, nz, Lx, Ly, Lz, c);
        out.push({ nx, ny, nz, hz });
      }
    }
  }

  out.sort((a, b) => a.hz - b.hz || a.nx - b.nx || a.ny - b.ny || a.nz - b.nz);
  return out;
}

export function formatRoomModesReport(
  dims: RoomDimensions,
  modes: RoomMode[],
  limit = 40,
): string {
  const lines = [
    "Rectangular room modes (ideal rigid walls, uniform air)",
    `  L×W×H = ${dims.lengthM} × ${dims.widthM} × ${dims.heightM} m`,
    `  c = ${SPEED_OF_SOUND_M_S} m/s`,
    "",
    `  f(nx,ny,nz) = (c/2) * sqrt((nx/Lx)² + (ny/Ly)² + (nz/Lz)²)`,
    "",
    `  First ${Math.min(limit, modes.length)} modes (by frequency):`,
  ];
  for (let i = 0; i < Math.min(limit, modes.length); i++) {
    const m = modes[i]!;
    lines.push(
      `    ${(i + 1).toString().padStart(3)}  (${m.nx},${m.ny},${m.nz})  ${m.hz.toFixed(3)} Hz`,
    );
  }
  if (modes.length > limit) {
    lines.push(`    … ${modes.length - limit} more`);
  }
  return lines.join("\n");
}
