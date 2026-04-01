import { Reveal } from "../components/Reveal";
import { AudioPlayer } from "../components/AudioPlayer";
import { ANCIENT_TRACKS, MIDI_DOWNLOAD } from "../constants/tracks";
import "./sections.css";

export function AncientSection() {
  return (
    <section className="section section--ancient" id="ancient">
      <div className="section--ancient__pattern" aria-hidden />
      <div className="section__inner section--ancient__inner">
        <Reveal>
          <h2 className="section__title section__title--serif">Old Babylonian tuning</h2>
          <p className="section__kicker">Philology first · Cambridge <em>Iraq</em> corpus</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card card--papyrus">
            <p>
              Cuneiform sources such as <strong>UET VII 74</strong> and{" "}
              <strong>UET VI/3 899</strong> describe how a nine-string{" "}
              <em>sammu</em> moves through named heptachords by tightening or loosening
              string pairs — a <strong>modulation cycle</strong>, not a modern “scale
              in Hz.”
            </p>
            <p>
              The code models <strong>fourteen string-pair intervals</strong> (CBS 10996
              tradition) and the <strong>tightening tour</strong> from Crickmore’s
              tabulation of the tablet logic.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <h3 className="section__h3">Listen · tightening cycle</h3>
          <p className="section__note">
            Binaural rendering of the seven-step cycle (headphones). MIDI is a separate
            download — browsers don’t play <code>.mid</code> reliably.
          </p>
          <div className="player-row">
            {ANCIENT_TRACKS.map((t) => (
              <AudioPlayer key={t.id} track={t} variant="ancient" />
            ))}
          </div>
          <a className="btn btn--gold" href={MIDI_DOWNLOAD.file} download>
            Download {MIDI_DOWNLOAD.title}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
