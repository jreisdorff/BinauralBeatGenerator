import { BlockMath, InlineMath } from "@/technical/components/Tex";
import { CodeBlock } from "@/technical/components/CodeBlock";

export function BinauralContent() {
  return (
    <>
      <h1>Binaural beats — stereo difference tone</h1>
      <p>
        Headphones deliver distinct waveforms to each ear. When
      </p>
      <BlockMath tex="x_L(t) = A\cos(2\pi f_L t),\quad x_R(t) = A\cos(2\pi f_R t)" />
      <p>
        the <strong>perceived beat rate</strong> (envelope periodicity) is often discussed
        as
      </p>
      <BlockMath tex="f_{\mathrm{beat}} = |f_L - f_R|" />
      <p>
        (small <InlineMath tex="|f_L-f_R|" /> relative to carrier; large offsets behave
        differently perceptually).
      </p>

      <h2>Sum-to-product identity</h2>
      <BlockMath tex="\cos a + \cos b = 2\cos\frac{a+b}{2}\cos\frac{a-b}{2}" />
      <p>
        Inside the head-related processing chain, interaural interaction is not a literal
        voltage sum, but the identity motivates why a <strong>slow amplitude modulation
        near <InlineMath tex="|f_L-f_R|" /></strong> appears in psychoacoustic models.
      </p>

      <h2>Discrete-time oscillator</h2>
      <p>
        Digital audio uses sample index <InlineMath tex="n" />, step{" "}
        <InlineMath tex="\theta = 2\pi f / f_s" />:
      </p>
      <BlockMath tex="x[n] = A\cos(n\theta + \varphi)" />

      <CodeBlock
        title="Phase increment per sample"
        children={`export function phaseIncrementHz(hz: number, sampleRate: number): number {
  return (2 * Math.PI * hz) / sampleRate;
}

export function monoSineFrame(
  freqHz: number,
  sampleRate: number,
  phase: number,
  nFrames: number,
): { samples: Float32Array; phaseOut: number } {
  const d = phaseIncrementHz(freqHz, sampleRate);
  const samples = new Float32Array(nFrames);
  let p = phase;
  for (let i = 0; i < nFrames; i++) {
    samples[i] = Math.sin(p);
    p += d;
  }
  return { samples, phaseOut: p };
}`}
      />

      <h2>Beat bands (informal taxonomy)</h2>
      <table className="simple">
        <thead>
          <tr>
            <th>Band (Hz)</th>
            <th>Label (informal)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>~1–4</td>
            <td>delta (very slow pulse)</td>
          </tr>
          <tr>
            <td>~4–8</td>
            <td>theta</td>
          </tr>
          <tr>
            <td>~8–12</td>
            <td>alpha</td>
          </tr>
          <tr>
            <td>~12–30</td>
            <td>beta</td>
          </tr>
        </tbody>
      </table>
      <div className="note">
        Popular-science framing only; not clinical guidance.
      </div>
    </>
  );
}
