import { BlockMath, InlineMath } from "../components/Tex";
import { CodeBlock } from "../components/CodeBlock";
import { DocLink } from "../components/DocLink";

export function PyramidsPage() {
  return (
    <>
      <h1>Pyramids & sound — measurable vs claimed</h1>
      <p>
        Large stone enclosures have reflections, reverberation, and possibly strong modal
        behaviour. That is ordinary room acoustics applied to masonry — it does not, by
        itself, establish ancient use of ultrasound for construction.
      </p>

      <h2>Geometric spreading (order of magnitude)</h2>
      <p>
        For a point source in free space, intensity scales roughly with distance{" "}
        <InlineMath tex="r" /> as
      </p>
      <BlockMath tex="I \propto \frac{1}{r^2}" />
      <p>
        Coupling that power into multi-tonne blocks is not comparable to laboratory
        ultrasonic levitation of milligram-scale objects.
      </p>

      <h2>Standing wave spacing in air</h2>
      <p>
        Wavelength <InlineMath tex="\lambda = c/f" />. Adjacent pressure nodes in a
        simple 1-D standing pattern are separated by roughly{" "}
        <InlineMath tex="\lambda/2" />.
      </p>
      <BlockMath tex="\lambda = \frac{c}{f},\qquad \Delta x \approx \frac{\lambda}{2}" />

      <CodeBlock
        title="Numerical example (TypeScript)"
        children={`const C_AIR = 343; // m/s, approximate

export function wavelengthM(fHz: number): number {
  return C_AIR / fHz;
}

export function halfWavelengthMm(fHz: number): number {
  return (wavelengthM(fHz) / 2) * 1000;
}

// f = 40e3 -> half wavelength ~ 4.3 mm in air
console.log(halfWavelengthMm(40_000));`}
      />

      <h2>Ultrasonic levitation (laboratory)</h2>
      <p>
        Opposing transducers form a standing field; small particles can sit near nodes
        where time-averaged radiation force balances weight. The scale is set by{" "}
        <InlineMath tex="\lambda" />, not by musical pitch.
      </p>

      <div className="note">
        See <DocLink slug="pyramids-sound-and-claims" /> in the repository for prose
        references and cautious wording.
      </div>
    </>
  );
}
