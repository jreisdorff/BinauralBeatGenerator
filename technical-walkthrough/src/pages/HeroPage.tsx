import { BlockMath, InlineMath } from "../components/Tex";
import { CodeBlock } from "../components/CodeBlock";

export function HeroPage() {
  return (
    <>
      <h1>Hero — globe texture scroll</h1>
      <p>
        The main site renders a spherical visual with an equirectangular texture. One
        implementation pattern is to map screen UV coordinates to longitude, sample a
        repeating horizontal strip, and animate texture offset over time.
      </p>

      <h2>Equirectangular mapping (sketch)</h2>
      <p>
        For normalized coordinates{" "}
        <InlineMath tex="u,v \in [0,1]" /> on the texture, longitude and latitude:
      </p>
      <BlockMath tex="\lambda = 2\pi(u-\tfrac12), \quad \phi = \pi(v-\tfrac12)" />

      <h2>Horizontal scroll in UV space</h2>
      <p>
        If the animation advances the texture by phase{" "}
        <InlineMath tex="\psi(t)=\omega t" /> (radians per second times time), the
        sampled column shifts modulo 1:
      </p>
      <BlockMath tex="u'(t) = (u + \psi(t)/(2\pi)) \bmod 1" />

      <h2>CSS / motion alternative</h2>
      <p>
        The production site may use CSS <code>transform</code> on a wide strip or WebGL;
        the continuous model above is the continuous analogue of “sliding” bitmap
        columns.
      </p>

      <CodeBlock
        title="TypeScript: modulo UV offset (conceptual)"
        children={`const TWO_PI = Math.PI * 2;

export function scrollU(u: number, omega: number, tSec: number): number {
  const psi = omega * tSec;
  let up = u + psi / TWO_PI;
  up -= Math.floor(up);
  return up;
}`}
      />

      <div className="note">
        Frame rate and <code>requestAnimationFrame</code> discretize{" "}
        <InlineMath tex="t" />; the scroll is piecewise-linear in wall-clock time between
        frames.
      </div>
    </>
  );
}
