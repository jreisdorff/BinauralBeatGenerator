"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const W = 420;
const H = 196;
const X0 = 62;
const X1 = W - 62;
const L = X1 - X0;

/** Schematic: two beams interfere → standing wave; particle sits near a pressure node (educational, not to scale). */
export function UltrasonicLevitationDemo() {
  const reduceMotion = useReducedMotion();
  const [tMs, setTMs] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;
    const start = performance.now();
    const tick = () => {
      setTMs(performance.now() - start);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduceMotion]);

  const t = reduceMotion ? 0 : tMs / 1000;
  const omega = 7;
  const k = (4 * Math.PI) / L;
  const nBars = 52;
  const barW = L / nBars - 1;

  const bars: { x: number; h: number }[] = [];
  for (let i = 0; i < nBars; i++) {
    const x = X0 + ((i + 0.5) / nBars) * L;
    const standing = Math.sin(k * (x - X0)) * Math.cos(omega * t);
    const h = Math.abs(standing) * 52 + 5;
    bars.push({ x, h });
  }

  const cx = X0 + L / 2;
  const bob = reduceMotion ? 0 : Math.sin(omega * t * 1.25) * 3;
  const cy = 124 + bob;

  const travel = omega * 28;
  const shim = reduceMotion ? 0 : Math.sin(t * travel * 0.08) * 2;

  const wavePts = (fromLeft: boolean) => {
    const pts: string[] = [];
    const steps = 64;
    const yMid = 36;
    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const x = X0 + u * L;
      const phase = fromLeft
        ? k * (x - X0) - travel * t
        : k * (X1 - x) - travel * t;
      const y = yMid + 10 * Math.sin(phase);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };

  return (
    <figure
      className="mt-4 overflow-hidden rounded-xl border border-[rgba(212,175,55,0.28)] bg-[rgba(0,0,0,0.35)]"
      aria-label="Schematic animation of ultrasonic standing wave levitation"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full max-h-[220px] text-[#e8d4f8]"
        role="img"
      >
        <title>Ultrasonic standing wave and levitated particle</title>
        <desc>
          Waves travel inward from left and right transducers. Their interference
          forms a standing pattern along the axis. A small disk hovers near the
          center node where radiation force can balance gravity in real lab setups.
        </desc>

        <defs>
          <linearGradient id="ultra-bar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(131,56,236,0.25)" />
            <stop offset="100%" stopColor="rgba(255,182,193,0.85)" />
          </linearGradient>
          <linearGradient id="ultra-wave-l" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(100,200,255,0.9)" />
            <stop offset="100%" stopColor="rgba(100,200,255,0.05)" />
          </linearGradient>
          <linearGradient id="ultra-wave-r" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,150,220,0.9)" />
            <stop offset="100%" stopColor="rgba(255,150,220,0.05)" />
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill="rgba(12,8,28,0.6)" />

        <text x={X0 - 2} y={18} fill="rgba(244,228,188,0.75)" fontSize={10}>
          ← beam
        </text>
        <text x={X1 - 48} y={18} fill="rgba(244,228,188,0.75)" fontSize={10}>
          beam →
        </text>

        <polyline
          fill="none"
          stroke="url(#ultra-wave-l)"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.85}
          points={wavePts(true)}
          transform={`translate(${shim},0)`}
        />
        <polyline
          fill="none"
          stroke="url(#ultra-wave-r)"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.85}
          points={wavePts(false)}
          transform={`translate(${-shim},0)`}
        />

        <text x={X0} y={92} fill="rgba(244,228,188,0.55)" fontSize={9}>
          pressure along axis (standing part)
        </text>

        {bars.map((b, i) => (
          <rect
            key={i}
            x={b.x - barW / 2}
            y={158 - b.h}
            width={barW}
            height={b.h}
            rx={1}
            fill="url(#ultra-bar)"
            opacity={0.92}
          />
        ))}

        <rect
          x={X0 - 44}
          y={68}
          width={36}
          height={44}
          rx={6}
          fill="rgba(60,40,90,0.9)"
          stroke="rgba(212,175,55,0.45)"
          strokeWidth={1}
        />
        <rect
          x={X1 + 8}
          y={68}
          width={36}
          height={44}
          rx={6}
          fill="rgba(60,40,90,0.9)"
          stroke="rgba(212,175,55,0.45)"
          strokeWidth={1}
        />
        <text
          x={X0 - 26}
          y={94}
          textAnchor="middle"
          fill="rgba(244,228,188,0.9)"
          fontSize={11}
        >
          ⇤
        </text>
        <text
          x={X1 + 26}
          y={94}
          textAnchor="middle"
          fill="rgba(244,228,188,0.9)"
          fontSize={11}
        >
          ⇥
        </text>

        <line
          x1={cx}
          y1={cy + 14}
          x2={cx}
          y2={168}
          stroke="rgba(212,175,55,0.35)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />

        <circle
          cx={cx}
          cy={cy}
          r={9}
          fill="rgba(244,228,188,0.95)"
          stroke="rgba(212,175,55,0.9)"
          strokeWidth={1.5}
        />
        <circle cx={cx - 3} cy={cy - 3} r={3} fill="rgba(255,255,255,0.35)" />

        <text
          x={cx}
          y={cy + 28}
          textAnchor="middle"
          fill="rgba(244,228,188,0.7)"
          fontSize={9}
        >
          tiny object
        </text>
      </svg>
      <figcaption className="border-t border-[rgba(212,175,55,0.15)] px-3 py-2 text-center text-[0.72rem] leading-snug text-[rgba(232,220,248,0.82)]">
        Schematic (not to scale): counter-propagating waves interfere; quiet
        nodes along the axis are where light objects can be trapped.
        {reduceMotion ? " Animation paused — reduced motion is on." : null}
      </figcaption>
    </figure>
  );
}
