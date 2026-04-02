import { Reveal } from "../components/Reveal";

/** Decorative hieroglyph texture (Unicode Egyptian Hieroglyphs block; font renders glyphs). */
const HIERO_TEXTURE =
  "𓀀𓀁𓀂𓉐𓊽𓏏𓂀𓇋𓈖𓎼𓐍𓊹𓁹𓃭𓆣𓇳𓉔𓊨𓏲𓐍𓂋𓈗𓊖𓏤𓃀𓅓𓆑𓇋𓏠𓈎𓅱𓃭𓇳𓊹𓀀𓂀𓉔𓊨𓏏𓆓𓂧𓅱𓇳𓊨𓁹𓃭𓎛𓇋𓏏𓊤𓏏𓊨𓏲𓊹𓁹𓇋𓈖𓊹𓊨𓏏𓉐𓏤𓊖𓏏𓊨𓂋𓈖𓆓𓂧𓅱𓇋𓈖𓎼𓂋𓇋𓊨𓏏𓉐𓊽𓏏𓂀𓇋𓈖𓎼𓐍𓊹𓁹𓃭𓆣𓇳𓉔𓊨𓀀𓀁𓀂𓉐𓊽𓏏𓂀𓇋𓈖𓎼𓐍𓊹𓁹𓃭𓆣𓇳𓉔𓊨";

export function PyramidsSection() {
  return (
    <section className="section section--pyramids" id="pyramids" aria-labelledby="pyramids-heading">
      <div className="pyramids-scene" aria-hidden>
        <div className="pyramids-scene__sky-glow" />
        <div className="pyramids-scene__sun" />
        <p className="pyramids-scene__hieroglyphs">{HIERO_TEXTURE.repeat(6)}</p>
        <div className="pyramids-scene__ground" />
        <div className="pyramids-scene__dune" />
        <div className="pyramids-scene__pyramids">
          <div className="css-pyramid css-pyramid--menkaure" title="Stylized pyramid silhouette (CSS)" />
          <div className="css-pyramid css-pyramid--khufu" title="Stylized pyramid silhouette (CSS)" />
          <div className="css-pyramid css-pyramid--satellite" title="Stylized pyramid silhouette (CSS)" />
        </div>
      </div>

      <div className="section__inner section--pyramids__inner">
        <Reveal>
          <h2 id="pyramids-heading" className="section__title section__title--serif">
            Pyramids &amp; sound
          </h2>
          <p className="section__kicker pyramids-section__kicker">
            From <code>docs/pyramids-sound-and-claims.md</code>
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="pyramids-doc-ref">
            People often link <strong>pyramids</strong> to <strong>sound</strong>: resonant chambers,{" "}
            <strong>Hz</strong> that “activate” stone, or acoustic levitation as the “real” way blocks
            were raised. Below is how those ideas line up with <strong>physics</strong>,{" "}
            <strong>archaeology</strong>, and <strong>what we can measure</strong> — same themes as the
            markdown doc.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card card--desert-glass">
            <h3 className="section__h3 section__h3--light pyramids-card__h3">
              Is there any real connection?
            </h3>
            <p>
              <strong>Yes</strong>, any large <strong>stone enclosure</strong> has{" "}
              <strong>acoustics</strong>—reflections, reverberation, possibly strong{" "}
              <strong>modes</strong> if the geometry and materials support them. That is ordinary{" "}
              <strong>room acoustics</strong> applied to ancient masonry.
            </p>
            <p>
              So: <strong>pyramids + sound</strong> can mean <strong>measurable acoustics of real spaces</strong>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card card--desert-glass">
            <h3 className="section__h3 section__h3--light pyramids-card__h3">
              Archaeology &amp; archaeoacoustics
            </h3>
            <p>
              Researchers have <strong>measured</strong> claps, speech, and tones in{" "}
              <strong>chambers</strong> and at <strong>monuments</strong> (not only pyramids). Interesting
              results include <strong>long reverberation</strong>, <strong>focused reflections</strong>, or{" "}
              <strong>coupling</strong> between spaces. We can hear what the space does; proving{" "}
              <strong>intent</strong> (“they designed it for this note”) is harder and is argued case by case
              in the literature.
            </p>
            <p>
              For <strong>Egyptian pyramids</strong> specifically, articles sometimes highlight{" "}
              <strong>narrow shafts</strong> or <strong>granite chambers</strong> and speculate about{" "}
              <strong>resonance</strong>. Even when measurements exist, they support claims like{" "}
              <q>this room rings or sustains certain bands</q>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="card card--desert-glass">
            <h3 className="section__h3 section__h3--light pyramids-card__h3">
              Modern “sound techniques”
            </h3>
            <p>
              Techniques such as <strong>Chladni figures</strong>, <strong>cymatics</strong>,{" "}
              <strong>binaural beats</strong>, and <strong>sin(e) sweeps</strong> are{" "}
              <strong>real</strong> in their domains (vibration visualization, psychoacoustics, etc.). They
              illustrate <strong>waves, modes, and perception</strong>. They do not by themselves establish
              that ancient builders used those lab demonstrations as <strong>construction</strong> or{" "}
              <strong>power</strong> technology.
            </p>
            <p>
              <strong>Ultrasonic levitation</strong> can suspend <strong>small</strong> objects in controlled
              setups—very different from music-range sound and from multi-ton masonry.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="card card--desert-glass">
            <h3 className="section__h3 section__h3--light pyramids-card__h3">
              Short answers
            </h3>
            <div className="pyramids-table-wrap">
              <table className="pyramids-table">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Practical answer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Could pyramid interiors respond to sound?</td>
                    <td>
                      <strong>Yes</strong>—like any rigid cavity; sometimes studied.
                    </td>
                  </tr>
                  <tr>
                    <td>Did sound replace ramps, levers, and labor at scale?</td>
                    <td>Maybe</td>
                  </tr>
                  <tr>
                    <td>Do Hz lists or “solfeggio” maps prove pyramid acoustics?</td>
                    <td>Maybe</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="card card--desert-glass">
            <h3 className="section__h3 section__h3--light pyramids-card__h3">
              Read further
            </h3>
            <ul className="footer-list pyramids-read-list">
              <li>
                Peer-reviewed <strong>archaeoacoustics</strong> on <strong>specific</strong> monuments
                (methods, measurements, cautious interpretation).
              </li>
              <li>
                <strong>Egyptology</strong> and engineering history on <strong>quarrying, transport, and ramp</strong>{" "}
                models—still the usual framework for how large stonework was built.
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
