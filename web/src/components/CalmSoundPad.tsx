"use client";

import { useEffect, useRef, useState } from "react";
import {
  type CalmPreset,
  type CalmSoundEngine,
  createCalmSoundEngine,
} from "@/lib/calmSoundEngine";
import { cn } from "@/lib/cn";

const PRESETS: readonly {
  id: CalmPreset;
  label: string;
  hint: string;
}[] = [
  {
    id: "pink",
    label: "Pink noise",
    hint: "Gentle, even hiss — often used for masking and steady background.",
  },
  {
    id: "brown",
    label: "Brown noise",
    hint: "Deeper rumble — can feel grounding for some listeners.",
  },
  {
    id: "drone",
    label: "Soft drones",
    hint: "Very quiet A–E–A sine tones — minimal, slow harmony.",
  },
  {
    id: "layer",
    label: "Noise + drones",
    hint: "Light pink noise under soft drones.",
  },
];

type Props = {
  /** Visible section heading id (section owns the title). */
  headingId: string;
};

export function CalmSoundPad({ headingId }: Props) {
  const engineRef = useRef<CalmSoundEngine | null>(null);
  const [preset, setPreset] = useState<CalmPreset>("pink");
  const [playing, setPlaying] = useState(false);
  const [level, setLevel] = useState(0.55);

  useEffect(() => {
    engineRef.current = createCalmSoundEngine();
    return () => engineRef.current?.dispose();
  }, []);

  useEffect(() => {
    if (playing) engineRef.current?.setLevel(level);
  }, [level, playing]);

  const toggle = async () => {
    const eng = engineRef.current;
    if (!eng) return;
    if (playing) {
      eng.stop();
      setPlaying(false);
      return;
    }
    await eng.start(preset);
    eng.setLevel(level);
    setPlaying(true);
  };

  const changePreset = async (p: CalmPreset) => {
    setPreset(p);
    if (!engineRef.current || !playing) return;
    await engineRef.current.start(p);
    engineRef.current.setLevel(level);
  };

  return (
    <div
      role="region"
      aria-labelledby={headingId}
      className="rounded-2xl border border-sky-400/25 bg-gradient-to-br from-slate-900/75 via-indigo-950/65 to-violet-950/70 p-[1.35rem] shadow-[0_24px_80px_rgba(30,27,75,0.45),inset_0_1px_0_rgba(147,197,253,0.12)] backdrop-blur-[14px] sm:p-7"
    >
      <p className="mb-5 max-w-[60ch] font-sans text-[0.82rem] leading-relaxed text-indigo-100/80">
        Simple Web Audio textures for relaxation or focus.{" "}
        <strong className="font-medium text-sky-100/95">Not medical care</strong> — if
        anxiety is severe or persistent, talk with a qualified clinician.
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => void changePreset(p.id)}
            title={p.hint}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-sans text-[0.78rem] font-medium transition",
              preset === p.id
                ? "border-sky-300/55 bg-gradient-to-r from-sky-500/25 to-violet-500/25 text-sky-50 shadow-[0_0_24px_rgba(99,102,241,0.25)]"
                : "border-indigo-300/20 bg-indigo-950/40 text-indigo-100/85 hover:border-sky-300/35 hover:bg-indigo-900/50",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => void toggle()}
          className="rounded-full bg-gradient-to-r from-sky-500/35 to-violet-500/35 px-6 py-2.5 font-sans text-[0.88rem] font-semibold text-sky-50 ring-1 ring-sky-300/40 transition hover:from-sky-500/45 hover:to-violet-500/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/80"
        >
          {playing ? "Stop" : "Play"}
        </button>

        <label className="flex min-w-0 flex-1 flex-col gap-1 font-sans text-[0.75rem] text-indigo-200/70">
          <span className="flex justify-between text-indigo-100/85">
            <span>Level</span>
            <span className="tabular-nums">{Math.round(level * 100)}%</span>
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            disabled={!playing}
            className="w-full accent-[#7dd3fc] disabled:opacity-40"
          />
        </label>
      </div>

      <p className="mt-4 font-sans text-[0.72rem] leading-snug text-indigo-300/65">
        Filtered noise and/or low-volume sine oscillators. Start quiet; avoid headphones at
        high level.
      </p>
    </div>
  );
}
