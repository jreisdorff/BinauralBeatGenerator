import type { CSSProperties } from "react";

type Props = {
  /** Multiplier for animation duration (higher = slower spin). */
  speedScale?: number;
};

export function MandalaLayer({ speedScale = 1 }: Props) {
  const dur = 24 * speedScale;
  const dur2 = 18 * speedScale;
  const dur3 = 32 * speedScale;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.55]"
      aria-hidden
      style={
        {
          "--m-d1": `${dur}s`,
          "--m-d2": `${dur2}s`,
          "--m-d3": `${dur3}s`,
        } as CSSProperties
      }
    >
      <div
        className="animate-mandala-1 absolute left-1/2 top-[42%] h-[min(140vw,900px)] w-[min(140vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,#ff006e,#ffbe0b,#8338ec,#3a86ff,#06ffa5,#ff006e)] opacity-[0.35] mix-blend-screen blur-[2px] motion-reduce:animate-none"
      />
      <div
        className="animate-mandala-2 absolute left-1/2 top-[42%] h-[min(95vw,620px)] w-[min(95vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[repeating-conic-gradient(from_45deg,#ff00aa_0deg_12deg,transparent_12deg_24deg)] opacity-[0.25] mix-blend-screen motion-reduce:animate-none"
      />
      <div
        className="animate-mandala-3 absolute left-1/2 top-[42%] h-[min(70vw,480px)] w-[min(70vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,transparent_30%,rgba(255,200,0,0.15)_31%,transparent_32%),repeating-conic-gradient(from_0deg,rgba(0,255,200,0.2)_0deg_8deg,transparent_8deg_16deg)] opacity-40 mix-blend-screen motion-reduce:animate-none"
      />
      <div
        className="animate-mandala-4 absolute left-1/2 top-[42%] h-[min(50vw,340px)] w-[min(50vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-dashed border-white/25 mix-blend-screen motion-reduce:animate-none"
      />
      <div
        className="animate-mandala-5 absolute left-1/2 top-[42%] h-[min(120vw,720px)] w-[min(120vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[repeating-radial-gradient(circle_at_center,rgba(131,56,236,0.12)_0px,rgba(131,56,236,0.12)_14px,transparent_14px,transparent_28px)] opacity-50 mix-blend-screen motion-reduce:animate-none"
      />
    </div>
  );
}
