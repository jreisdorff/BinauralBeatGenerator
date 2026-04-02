import { Reveal } from "../components/Reveal";
import { AudioPlayer } from "../components/AudioPlayer";
import { ANCIENT_TRACKS, MIDI_DOWNLOAD } from "../constants/tracks";

export function AncientSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden py-[clamp(3rem,8vw,6rem)] px-[clamp(1.25rem,5vw,3rem)]"
      style={{
        background:
          "linear-gradient(180deg, #0f0842 0%, #1a237e 22%, #4e342e 55%, #3e2723 100%)",
      }}
      id="ancient"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, #d4af37 0 1px, transparent 1px 48px),
            repeating-linear-gradient(0deg, rgba(244,228,188,0.15) 0 1px, transparent 1px 64px)`,
        }}
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-[900px] text-[#f4e4bc]">
        <Reveal>
          <h2 className="mb-2 font-cinzel text-[clamp(1.75rem,4vw,2.6rem)] font-bold tracking-[-0.02em] text-[#f4e4bc] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
            Old Babylonian tuning
          </h2>
          <p className="mb-7 text-[0.95rem] opacity-[0.88]">
            Philology first · Cambridge <em>Iraq</em> corpus
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mb-5 rounded-[14px] border border-[rgba(212,175,55,0.35)] bg-[rgba(244,228,188,0.1)] px-[1.4rem] py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <p className="mb-[0.9rem] leading-[1.65] last:mb-0">
              Cuneiform sources such as <strong>UET VII 74</strong> and{" "}
              <strong>UET VI/3 899</strong> describe how a nine-string{" "}
              <em>sammu</em> moves through named heptachords by tightening or loosening
              string pairs — a <strong>modulation cycle</strong>, not a modern “scale in
              Hz.”
            </p>
            <p className="mb-[0.9rem] leading-[1.65] last:mb-0">
              The code models <strong>fourteen string-pair intervals</strong> (CBS 10996
              tradition) and the <strong>tightening tour</strong> from Crickmore’s
              tabulation of the tablet logic.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <h3 className="mb-3 mt-8 text-[1.15rem]">Listen · tightening cycle</h3>
          <p className="mb-4 max-w-[52ch] text-[0.85rem] leading-normal opacity-[0.85] [&_code]:text-[0.8em]">
            Binaural rendering of the seven-step cycle (headphones). MIDI is a separate
            download — browsers don’t play <code>.mid</code> reliably.
          </p>
          <div className="my-4 flex flex-wrap gap-4">
            {ANCIENT_TRACKS.map((t) => (
              <AudioPlayer key={t.id} track={t} variant="ancient" />
            ))}
          </div>
          <a
            className="inline-block rounded-full border-none bg-gradient-to-br from-[#d4af37] to-[#a67c00] px-5 py-[0.65rem] text-[0.88rem] font-semibold text-[#1a0a2e] no-underline shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:brightness-110"
            href={MIDI_DOWNLOAD.file}
            download
          >
            Download {MIDI_DOWNLOAD.title}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
