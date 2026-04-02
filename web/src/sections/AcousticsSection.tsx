import { useMemo, useState } from "react";
import { Reveal } from "../components/Reveal";
import { TriangleMesh } from "../components/TriangleMesh";
import {
  rectangularRoomModes,
  SPEED_OF_SOUND_M_S,
} from "../lib/roomModes";

export function AcousticsSection() {
  const [L, setL] = useState(12);
  const [W, setW] = useState(8);
  const [H, setH] = useState(3);

  const modes = useMemo(
    () => rectangularRoomModes({ lengthM: L, widthM: W, heightM: H }, 8),
    [L, W, H],
  );
  const preview = modes.slice(0, 18);

  return (
    <section
      className="relative min-h-screen overflow-hidden py-[clamp(3rem,8vw,6rem)] px-[clamp(1.25rem,5vw,3rem)] text-[#d8dee6]"
      style={{
        background:
          "linear-gradient(165deg, #2c3540 0%, #3d4a5c 40%, #2a323c 100%)",
      }}
      id="acoustics"
    >
      <TriangleMesh />
      <div className="relative z-[1] mx-auto max-w-[920px]">
        <Reveal>
          <h2 className="mb-2 text-[clamp(1.75rem,4vw,2.6rem)] font-bold tracking-[-0.02em]">
            Room modes & patterns
          </h2>
          <p className="mb-7 text-[0.95rem] text-[#a8b8c8] opacity-[0.88]">
            Ideal box · {SPEED_OF_SOUND_M_S} m/s · pedagogy
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mb-5 rounded-[14px] border border-[rgba(140,160,180,0.22)] bg-[rgba(30,38,48,0.65)] px-[1.4rem] py-5">
            <p className="m-0 leading-[1.65]">
              Enclosed air has <strong>standing-wave resonances</strong> that depend on
              geometry. The doc <code>sound-and-built-environment.md</code> separates real
              acoustics from myths about cities “built with sound.”
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-2">
            <h3 className="mb-3 mt-8 text-[1.15rem]">Interactive room (metres)</h3>
            <div className="my-4 flex max-w-[420px] flex-col gap-4">
              <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 text-[0.88rem]">
                Length L
                <span className="tabular-nums opacity-85">{L} m</span>
                <input
                  type="range"
                  min={2}
                  max={30}
                  step={0.5}
                  value={L}
                  onChange={(e) => setL(Number(e.target.value))}
                  className="col-span-2 w-full accent-[#8fa8c2]"
                />
              </label>
              <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 text-[0.88rem]">
                Width W
                <span className="tabular-nums opacity-85">{W} m</span>
                <input
                  type="range"
                  min={2}
                  max={24}
                  step={0.5}
                  value={W}
                  onChange={(e) => setW(Number(e.target.value))}
                  className="col-span-2 w-full accent-[#8fa8c2]"
                />
              </label>
              <label className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 text-[0.88rem]">
                Height H
                <span className="tabular-nums opacity-85">{H} m</span>
                <input
                  type="range"
                  min={2}
                  max={12}
                  step={0.25}
                  value={H}
                  onChange={(e) => setH(Number(e.target.value))}
                  className="col-span-2 w-full accent-[#8fa8c2]"
                />
              </label>
            </div>
            <div className="max-h-[280px] overflow-x-auto overflow-y-auto rounded-[10px] border border-[rgba(140,160,180,0.2)]">
              <table className="w-full border-collapse text-[0.82rem]">
                <thead>
                  <tr>
                    <th className="sticky top-0 bg-[rgba(25,32,40,0.95)] px-[0.65rem] py-[0.45rem] text-left font-semibold">
                      #
                    </th>
                    <th className="sticky top-0 bg-[rgba(25,32,40,0.95)] px-[0.65rem] py-[0.45rem] text-left font-semibold">
                      (nx, ny, nz)
                    </th>
                    <th className="sticky top-0 bg-[rgba(25,32,40,0.95)] px-[0.65rem] py-[0.45rem] text-left font-semibold">
                      Hz
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((m, i) => (
                    <tr key={`${m.nx}-${m.ny}-${m.nz}-${i}`}>
                      <td className="border-b border-white/[0.06] px-[0.65rem] py-[0.45rem] text-left">
                        {i + 1}
                      </td>
                      <td className="border-b border-white/[0.06] px-[0.65rem] py-[0.45rem] text-left">
                        ({m.nx},{m.ny},{m.nz})
                      </td>
                      <td className="border-b border-white/[0.06] px-[0.65rem] py-[0.45rem] text-left">
                        {m.hz.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <h3 className="mb-3 mt-8 text-[1.15rem]">Chladni-style preview (from repo demo)</h3>
          <p className="mb-4 max-w-[52ch] text-[0.85rem] leading-normal opacity-[0.85] [&_code]:text-[0.8em]">
            Run <code>npm run acoustics:demo</code> then{" "}
            <code>npm run copy-assets</code> in <code>web/</code> to refresh SVGs.
          </p>
          <div className="mt-3 flex flex-wrap gap-4">
            <img
              src="https://dz3nuqtm6hedggvw.public.blob.vercel-storage.com/chladni-mode-3-4.svg"
              alt="Simulated plate mode 3,4 nodal pattern"
              width={360}
              height={360}
              loading="lazy"
              className="h-auto max-w-full rounded-[10px] border border-[rgba(140,160,180,0.25)] bg-[#1a1f26]"
            />
            <img
              src="https://dz3nuqtm6hedggvw.public.blob.vercel-storage.com/chladni-mode-2-5.svg"
              alt="Simulated plate mode 2,5 nodal pattern"
              width={360}
              height={360}
              loading="lazy"
              className="h-auto max-w-full rounded-[10px] border border-[rgba(140,160,180,0.25)] bg-[#1a1f26]"
            />
            <img
              src="https://dz3nuqtm6hedggvw.public.blob.vercel-storage.com/chladni-mode-4-4.svg"
              alt="Simulated plate mode 4,4 nodal pattern"
              width={360}
              height={360}
              loading="lazy"
              className="h-auto max-w-full rounded-[10px] border border-[rgba(140,160,180,0.25)] bg-[#1a1f26]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
