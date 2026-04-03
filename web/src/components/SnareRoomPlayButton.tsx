"use client";

import { useCallback, useRef, useState } from "react";
import {
  createShoeboxImpulseBuffer,
  createSnareHitBuffer,
} from "@/lib/shoeboxImpulse";

type Props = {
  lengthM: number;
  widthM: number;
  heightM: number;
};

export function SnareRoomPlayButton({ lengthM, widthM, heightM }: Props) {
  const ctxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(async () => {
    try {
      sourceRef.current?.stop();
      sourceRef.current = null;

      const ctx = ctxRef.current ?? new AudioContext();
      ctxRef.current = ctx;
      if (ctx.state === "suspended") await ctx.resume();

      await new Promise<void>((r) => requestAnimationFrame(() => r()));

      const ir = createShoeboxImpulseBuffer(ctx, {
        lengthM,
        widthM,
        heightM,
      });
      const snare = createSnareHitBuffer(ctx);

      const convolver = ctx.createConvolver();
      convolver.buffer = ir;
      convolver.normalize = false;

      const out = ctx.createGain();
      out.gain.value = 0.78;

      const src = ctx.createBufferSource();
      src.buffer = snare;
      src.connect(convolver);
      convolver.connect(out);
      out.connect(ctx.destination);

      src.onended = () => {
        sourceRef.current = null;
        setPlaying(false);
        try {
          src.disconnect();
          convolver.disconnect();
          out.disconnect();
        } catch {
          /* ignore */
        }
      };

      sourceRef.current = src;
      setPlaying(true);
      src.start();
    } catch {
      setPlaying(false);
      sourceRef.current = null;
    }
  }, [lengthM, widthM, heightM]);

  return (
    <div className="mt-5 max-w-[52ch]">
      <button
        type="button"
        onClick={() => void play()}
        disabled={playing}
        className="rounded-full border border-[rgba(140,160,180,0.45)] bg-[rgba(55,71,90,0.55)] px-4 py-2.5 text-[0.85rem] font-semibold text-[#e8eef6] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:border-[rgba(143,168,194,0.65)] hover:bg-[rgba(65,82,102,0.65)] disabled:cursor-wait disabled:opacity-70"
      >
        {playing ? "Playing…" : "Play snare in this room"}
      </button>
      <p className="mt-2 text-[0.72rem] leading-relaxed text-[#98a8b8]">
        Procedural snare burst convolved with a{" "}
        <strong className="font-medium text-[#b8c8d8]">pedagogical shoebox</strong> tail
        (damped sum of low axial modes for your L × W × H). Not a full wave simulation —
        useful for hearing how size changes colour and decay.
      </p>
    </div>
  );
}
