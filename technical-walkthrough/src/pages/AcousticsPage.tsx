import { BlockMath, InlineMath } from "../components/Tex";
import { CodeBlock } from "../components/CodeBlock";
import { DocLink } from "../components/DocLink";

export function AcousticsPage() {
  return (
    <>
      <h1>Acoustics — room modes & Chladni ansatz</h1>

      <h2>Rectangular room (rigid idealization)</h2>
      <p>
        For a box of lengths{" "}
        <InlineMath tex="L_x,L_y,L_z" /> (metres) and sound speed{" "}
        <InlineMath tex="c" /> (m/s), axial indices{" "}
        <InlineMath tex="n_x,n_y,n_z\in\mathbb{Z}_{\ge 0}" />, not all zero:
      </p>
      <BlockMath tex="f = \frac{c}{2}\sqrt{\Big(\frac{n_x}{L_x}\Big)^2+\Big(\frac{n_y}{L_y}\Big)^2+\Big(\frac{n_z}{L_z}\Big)^2}" />

      <p>
        The interactive site uses <InlineMath tex="c=343" /> m/s unless overridden.
      </p>

      <CodeBlock
        title="Mode frequency (TypeScript, matches web/lib/roomModes.ts)"
        children={`export const SPEED_OF_SOUND_M_S = 343;

export function modeFrequency(
  nx: number,
  ny: number,
  nz: number,
  Lx: number,
  Ly: number,
  Lz: number,
  c: number,
): number {
  const a = (nx / Lx) ** 2 + (ny / Ly) ** 2 + (nz / Lz) ** 2;
  return (c / 2) * Math.sqrt(a);
}`}
      />

      <h2>Chladni-style plate (separable toy model)</h2>
      <p>
        On the unit square <InlineMath tex="(x,y)\in[0,1]^2" />, the demo plots
      </p>
      <BlockMath tex="w(x,y)=\sin(n\pi x)\sin(m\pi y)" />
      <p>
        Nodal lines occur where <InlineMath tex="w=0" />. The SVG rasterizes{" "}
        <InlineMath tex="|w|" /> to grayscale cells.
      </p>

      <CodeBlock
        title="Displacement sample (repo chladniApprox.ts)"
        children={`function displacement(n: number, m: number, x: number, y: number): number {
  return Math.sin(n * Math.PI * x) * Math.sin(m * Math.PI * y);
}`}
      />

      <h2>Example: mode (4,4)</h2>
      <p>
        Zeros when <InlineMath tex="\sin(4\pi x)=0" /> or{" "}
        <InlineMath tex="\sin(4\pi y)=0" />, i.e.{" "}
        <InlineMath tex="x\in\{0,\tfrac14,\tfrac12,\tfrac34,1\}" /> (and similarly for{" "}
        <InlineMath tex="y" />), producing a grid of nodal lines.
      </p>

      <div className="note">
        Real plates: Kirchhoff–Love theory, boundary conditions, and driving position
        alter patterns; see <DocLink slug="sound-and-built-environment" /> for how this
        repo frames plates, room modes, and Chladni (“pedagogy only”).
      </div>
    </>
  );
}
