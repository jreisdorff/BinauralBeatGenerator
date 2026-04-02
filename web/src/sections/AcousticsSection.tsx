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
    <section className="section section--acoustics" id="acoustics">
      <TriangleMesh />
      <div className="section__inner section--acoustics__inner">
        <Reveal>
          <h2 className="section__title">Room modes & patterns</h2>
          <p className="section__kicker section__kicker--muted">
            Ideal box · {SPEED_OF_SOUND_M_S} m/s · pedagogy
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card card--slate">
            <p>
              Enclosed air has <strong>standing-wave resonances</strong> that depend on
              geometry. The doc <code>sound-and-built-environment.md</code> separates
              real acoustics from myths about cities “built with sound.”
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="acoustics-interactive">
            <h3 className="section__h3">Interactive room (metres)</h3>
            <div className="dim-sliders">
              <label>
                Length L
                <input
                  type="range"
                  min={2}
                  max={30}
                  step={0.5}
                  value={L}
                  onChange={(e) => setL(Number(e.target.value))}
                />
                <span>{L} m</span>
              </label>
              <label>
                Width W
                <input
                  type="range"
                  min={2}
                  max={24}
                  step={0.5}
                  value={W}
                  onChange={(e) => setW(Number(e.target.value))}
                />
                <span>{W} m</span>
              </label>
              <label>
                Height H
                <input
                  type="range"
                  min={2}
                  max={12}
                  step={0.25}
                  value={H}
                  onChange={(e) => setH(Number(e.target.value))}
                />
                <span>{H} m</span>
              </label>
            </div>
            <div className="modes-table-wrap">
              <table className="modes-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>(nx, ny, nz)</th>
                    <th>Hz</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((m, i) => (
                    <tr key={`${m.nx}-${m.ny}-${m.nz}-${i}`}>
                      <td>{i + 1}</td>
                      <td>
                        ({m.nx},{m.ny},{m.nz})
                      </td>
                      <td>{m.hz.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <h3 className="section__h3">Chladni-style preview (from repo demo)</h3>
          <p className="section__note">
            Run <code>npm run acoustics:demo</code> then{" "}
            <code>npm run copy-assets</code> in <code>web/</code> to refresh SVGs.
          </p>
          <div className="chladni-frame">
            <img
              src="/images/chladni-mode-3-4.svg"
              alt="Simulated plate mode 3,4 nodal pattern"
              width={360}
              height={360}
              loading="lazy"
              className="chladni-img"
            />
            <img
              src="/images/chladni-mode-2-5.svg"
              alt="Simulated plate mode 2,5 nodal pattern"
              width={360}
              height={360}
              loading="lazy"
              className="chladni-img"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
