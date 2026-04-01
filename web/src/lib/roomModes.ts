/** Same model as repo `src/acoustics/roomModes.ts` — browser-side interactive demo. */

export const SPEED_OF_SOUND_M_S = 343;

export type RoomDimensions = { lengthM: number; widthM: number; heightM: number };
export type RoomMode = { nx: number; ny: number; nz: number; hz: number };

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

export function rectangularRoomModes(
  dims: RoomDimensions,
  maxAxis = 10,
  c = SPEED_OF_SOUND_M_S,
): RoomMode[] {
  const { lengthM: Lx, widthM: Ly, heightM: Lz } = dims;
  if (Lx <= 0 || Ly <= 0 || Lz <= 0) return [];
  const out: RoomMode[] = [];
  for (let nx = 0; nx <= maxAxis; nx++) {
    for (let ny = 0; ny <= maxAxis; ny++) {
      for (let nz = 0; nz <= maxAxis; nz++) {
        if (nx === 0 && ny === 0 && nz === 0) continue;
        out.push({
          nx,
          ny,
          nz,
          hz: modeFrequency(nx, ny, nz, Lx, Ly, Lz, c),
        });
      }
    }
  }
  out.sort((a, b) => a.hz - b.hz || a.nx - b.nx || a.ny - b.ny || a.nz - b.nz);
  return out;
}
