import { BlockMath, InlineMath } from "../components/Tex";
import { CodeBlock } from "../components/CodeBlock";

export function CalmPage() {
  return (
    <>
      <h1>Calm sound — Web Audio synthesis</h1>
      <p>
        The main site generates noise and sine drones in-browser using{" "}
        <code>AudioContext</code>, <code>OscillatorNode</code>, filtered noise buffers,
        and a master gain. Convolution with a room impulse (elsewhere) uses{" "}
        <code>ConvolverNode</code>.
      </p>

      <h2>White noise buffer</h2>
      <p>
        For length <InlineMath tex="N" /> samples, independent uniform draws{" "}
        <InlineMath tex="u_n\sim\mathrm{Unif}(-1,1)" /> approximate white noise. Power
        spectral density is flat in expectation before filtering.
      </p>

      <h2>First-order low-pass (recurrence)</h2>
      <p>
        Exponential smoothing with coefficient{" "}
        <InlineMath tex="r\in(0,1)" /> (derived from cutoff <InlineMath tex="f_c" /> and
        rate <InlineMath tex="f_s" />):
      </p>
      <BlockMath tex="y_n = r y_{n-1} + (1-r)\,x_n" />

      <CodeBlock
        title="Pink-ish stack (two cascaded one-poles, conceptual)"
        children={`function onePoleLP(x: Float32Array, r: number): Float32Array {
  const y = new Float32Array(x.length);
  let s = 0;
  for (let i = 0; i < x.length; i++) {
    s = r * s + (1 - r) * x[i]!;
    y[i] = s;
  }
  return y;
}`}
      />

      <h2>Convolution reverberator</h2>
      <p>
        If <InlineMath tex="h[n]" /> is an impulse response and{" "}
        <InlineMath tex="x[n]" /> the dry signal,
      </p>
      <BlockMath tex="y[n] = \sum_{k} x[k]\,h[n-k]" />
      <p>
        The Web Audio API implements this with <code>ConvolverNode</code> (FFT-based
        internally in typical engines).
      </p>

      <h2>Damped mode sum (shoebox pedagogy)</h2>
      <p>
        A crude tail model sums sinusoids at room-mode frequencies{" "}
        <InlineMath tex="f_m" /> with exponential envelope{" "}
        <InlineMath tex="e^{-\alpha t}" />:
      </p>
      <BlockMath tex="h(t) \approx \sum_m C_m \sin(2\pi f_m t + \phi_m)\,e^{-\alpha t}" />

      <div className="note">
        T60-linked <InlineMath tex="\alpha" /> and random <InlineMath tex="\phi_m" /> are
        chosen for audible plausibility, not boundary-element accuracy.
      </div>
    </>
  );
}
