import type { CSSProperties } from "react";
import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { AudioPlayer } from "../components/AudioPlayer";
import { BeatFrequencyGuide } from "../components/BeatFrequencyGuide";
import { MandalaLayer } from "../components/MandalaLayer";
import { BINAURAL_TRACKS } from "../constants/tracks";
import { TechWalkthroughLink } from "../components/TechWalkthroughLink";

export function BinauralSection() {
  const [speed, setSpeed] = useState(1);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#2d0a3d_0%,#12051f_50%,#050308_100%)] py-[clamp(3rem,8vw,6rem)] px-[clamp(1.25rem,5vw,3rem)] text-[#f5e6ff]"
      id="binaural"
      style={{ "--mandala-speed": String(speed) } as CSSProperties}
    >
      <MandalaLayer speedScale={1 / Math.max(0.35, speed)} />
      <div className="relative z-[1] mx-auto max-w-[900px]">
        <Reveal>
          <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
            <h2 className="bg-gradient-to-r from-white via-[#ff9ecd] to-[#9bf6ff] bg-clip-text text-[clamp(1.75rem,4vw,2.6rem)] font-bold tracking-[-0.02em] text-transparent drop-shadow-[0_0_20px_rgba(255,0,180,0.35)]">
              Binaural beats & presets
            </h2>
            <TechWalkthroughLink
              segment="binaural"
              className="mt-1 shrink-0 rounded-full border border-[rgba(255,158,220,0.45)] bg-[rgba(0,0,0,0.25)] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-[#fce8ff] no-underline hover:border-[#ff6ec7]/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6ec7]"
            >
              Tech notes
            </TechWalkthroughLink>
          </div>
          <p className="mb-7 text-[0.95rem] text-[#e8d4ff] opacity-[0.88]">
            Headphones · interaural pitch offset · explore carriers & beats
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mb-5 rounded-[14px] border border-[rgba(255,120,220,0.25)] bg-[rgba(40,10,60,0.45)] px-[1.4rem] py-5 backdrop-blur-[10px]">
            <p className="m-0 leading-[1.65]">
              Each ear gets a sin(e) tone; the <strong>difference in Hz</strong> is what
              many people perceive as a “beat.” Presets under <code>presets/</code> are
              labeled <strong>non-historical</strong> (432 culture, solfeggio lists, chakra
              tables).
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="my-6 rounded-xl border border-white/10 bg-black/35 px-5 py-4">
            <label
              htmlFor="mandala-speed"
              className="mb-2 block text-[0.85rem] text-[#e8c4ff]"
            >
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
              className="max-w-[320px] w-full accent-[#ff6ec7]"
            />
            <span className="ml-3 inline-block text-[0.9rem] tabular-nums opacity-90">
              {speed.toFixed(2)}×
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.11}>
          <BeatFrequencyGuide />
        </Reveal>

        <Reveal delay={0.12}>
          <h3 className="mb-3 mt-8 text-[1.15rem] text-[#fcefff]">Preset gallery</h3>
          <p className="mb-4 max-w-[62ch] text-[0.85rem] leading-normal text-[#e0c8f0] opacity-[0.85] [&_code]:text-[0.8em]">
            Each card summarizes what <strong>that file’s beat rate</strong> is often used
            for in apps and informal listening—not guaranteed outcomes.
          </p>
          <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {BINAURAL_TRACKS.map((t) => (
              <AudioPlayer key={t.id} track={t} variant="binaural" />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
