import type { CSSProperties } from "react";
import "./MandalaLayer.css";

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
      className="mandala-layer"
      aria-hidden
      style={
        {
          "--m-d1": `${dur}s`,
          "--m-d2": `${dur2}s`,
          "--m-d3": `${dur3}s`,
        } as CSSProperties
      }
    >
      <div className="mandala mandala--1" />
      <div className="mandala mandala--2" />
      <div className="mandala mandala--3" />
      <div className="mandala mandala--4" />
      <div className="mandala mandala--5" />
    </div>
  );
}
