import type { CSSProperties } from "react";
import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { AudioPlayer } from "../components/AudioPlayer";
import { BeatFrequencyGuide } from "../components/BeatFrequencyGuide";
import { MandalaLayer } from "../components/MandalaLayer";
import { BINAURAL_TRACKS } from "../constants/tracks";
import "./sections.css";

export function BinauralSection() {
  const [speed, setSpeed] = useState(1);

  return (
    <section
      className="section section--binaural"
      id="binaural"
      style={
        {
          "--mandala-speed": String(speed),
        } as CSSProperties
      }
    >
      <MandalaLayer speedScale={1 / Math.max(0.35, speed)} />
      <div className="section__inner section--binaural__inner">
        <Reveal>
          <h2 className="section__title section__title--psyche">
            Binaural beats & presets
          </h2>
          <p className="section__kicker section__kicker--bright">
            Headphones · interaural pitch offset · explore carriers & beats
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="card card--glass">
            <p>
              Each ear gets a sin(e) tone; the <strong>difference in Hz</strong> is what
              many people perceive as a “beat.” Presets under <code>presets/</code> are
              labeled <strong>non-historical</strong> (432 culture, solfeggio lists,
               chakra tables).
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="control-tile">
            <label htmlFor="mandala-speed" className="control-tile__label">
              Mandala animation speed (visual only)
            </label>
            <input
              id="mandala-speed"
              type="range"
              min={0.35}
              max={2.5}
              step={0.05}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
            <span className="control-tile__val">{speed.toFixed(2)}×</span>
          </div>
        </Reveal>

        <Reveal delay={0.11}>
          <BeatFrequencyGuide />
        </Reveal>

        <Reveal delay={0.12}>
          <h3 className="section__h3 section__h3--light">Preset gallery</h3>
          <p className="section__note section__note--binaural">
            Each card summarizes what <strong>that file’s beat rate</strong> is often used
            for in apps and informal listening—not guaranteed outcomes.
          </p>
          <div className="player-grid">
            {BINAURAL_TRACKS.map((t) => (
              <AudioPlayer key={t.id} track={t} variant="binaural" />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
