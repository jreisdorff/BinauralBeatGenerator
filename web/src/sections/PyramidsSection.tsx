import { Reveal } from "../components/Reveal";
import { UltrasonicLevitationDemo } from "../components/UltrasonicLevitationDemo";
import { TechWalkthroughLink } from "../components/TechWalkthroughLink";
import { cn } from "@/lib/cn";

/** Decorative hieroglyph texture (Unicode Egyptian Hieroglyphs block; font renders glyphs). */
const HIERO_TEXTURE =
  "𓀀𓀁𓀂𓉐𓊽𓏏𓂀𓇋𓈖𓎼𓐍𓊹𓁹𓃭𓆣𓇳𓉔𓊨𓏲𓐍𓂋𓈗𓊖𓏤𓃀𓅓𓆑𓇋𓏠𓈎𓅱𓃭𓇳𓊹𓀀𓂀𓉔𓊨𓏏𓆓𓂧𓅱𓇳𓊨𓁹𓃭𓎛𓇋𓏏𓊤𓏏𓊨𓏲𓊹𓁹𓇋𓈖𓊹𓊨𓏏𓉐𓏤𓊖𓏏𓊨𓂋𓈖𓆓𓂧𓅱𓇋𓈖𓎼𓂋𓇋𓊨𓏏𓉐𓊽𓏏𓂀𓇋𓈖𓎼𓐍𓊹𓁹𓃭𓆣𓇳𓉔𓊨𓀀𓀁𓀂𓉐𓊽𓏏𓂀𓇋𓈖𓎼𓐍𓊹𓁹𓃭𓆣𓇳𓉔𓊨";

const sectionBg =
  "linear-gradient(185deg, #1a0f3e 0%, #2d1b4e 18%, #5c3d2e 42%, #8b6914 58%, #c9a86a 72%, #d4b896 88%, #e8d4b8 100%)";

const pyramidBase =
  "relative flex-shrink-0 bg-[repeating-linear-gradient(180deg,#c4a574_0px,#c4a574_3px,#a68452_3px,#a68452_7px,#8b6f47_7px,#8b6f47_10px)] shadow-[inset_-8px_0_24px_rgba(0,0,0,0.22),4px_8px_32px_rgba(0,0,0,0.35)] [clip-path:polygon(50%_0%,100%_100%,0%_100%)]";

function CssPyramid({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  return (
    <div className={cn(pyramidBase, className)} title={title}>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.22)_0%,transparent_42%,rgba(0,0,0,0.18)_100%)] [clip-path:polygon(50%_0%,100%_100%,0%_100%)]"
        aria-hidden
      />
    </div>
  );
}

const desertCard =
  "mb-5 rounded-[14px] border border-[rgba(212,175,55,0.35)] bg-[rgba(12,8,28,0.55)] px-[1.4rem] py-5 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-[12px] [&_p]:mb-[0.9rem] [&_p]:leading-[1.65] [&_p:last-child]:mb-0";

export function PyramidsSection() {
  return (
    <section
      className="relative isolate min-h-screen overflow-hidden py-[clamp(3rem,8vw,6rem)] px-[clamp(1.25rem,5vw,3rem)] text-[#f8f0e0]"
      style={{ background: sectionBg }}
      id="pyramids"
      aria-labelledby="pyramids-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-x-[-10%] bottom-[35%] top-[-20%]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 72% 18%, rgba(255, 220, 140, 0.45) 0%, rgba(255, 140, 80, 0.12) 35%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-[12%] top-[8%] h-[min(18vmin,120px)] w-[min(18vmin,120px)] rounded-full opacity-90 shadow-[0_0_60px_rgba(255,200,100,0.55)]"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #fff8e0 0%, #ffd54f 35%, #ff8f00 70%, transparent 72%)",
          }}
        />
        <p
          className="absolute -inset-[5%] select-none break-all text-justify font-hiero text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.35] tracking-[0.08em] text-[rgba(20,12,40,0.14)] mix-blend-multiply [transform:rotate(-2deg)_scale(1.02)]"
        >
          {HIERO_TEXTURE.repeat(6)}
        </p>
        <div
          className="absolute bottom-0 left-0 right-0 h-[38%]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(92, 71, 48, 0.35) 25%, rgba(74, 55, 38, 0.85) 100%)",
          }}
        />
        <div
          className="absolute -left-[10%] -right-[10%] bottom-0 h-[22%]"
          style={{
            background:
              "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(180, 140, 90, 0.5) 0%, transparent 65%)",
          }}
        />
        <div className="absolute bottom-[12%] left-1/2 flex w-[min(96vw,720px)] -translate-x-1/2 items-end justify-center gap-[min(4vw,2.5rem)]">
          <CssPyramid
            className="mb-0.5 h-[min(15vmin,95px)] w-[min(18vmin,115px)] opacity-88"
            title="Stylized pyramid silhouette (CSS)"
          />
          <CssPyramid
            className="-mb-px h-[min(36vmin,220px)] w-[min(42vmin,260px)]"
            title="Stylized pyramid silhouette (CSS)"
          />
          <CssPyramid
            className="h-[min(19vmin,118px)] w-[min(22vmin,140px)] opacity-92 brightness-94"
            title="Stylized pyramid silhouette (CSS)"
          />
        </div>
      </div>

      <div className="relative z-[1] mx-auto max-w-[900px]">
        <Reveal>
          <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
            <h2
              id="pyramids-heading"
              className="font-cinzel text-[clamp(1.75rem,4vw,2.6rem)] font-bold tracking-[-0.02em] text-[#f4e4bc] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
            >
              Pyramids &amp; sound
            </h2>
            <TechWalkthroughLink
              segment="pyramids"
              className="mt-1 shrink-0 rounded-full border border-[rgba(212,175,55,0.45)] bg-[rgba(12,8,28,0.45)] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-[#f4e4bc] no-underline hover:bg-[rgba(212,175,55,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
            >
              Tech notes
            </TechWalkthroughLink>
          </div>
          <p className="mb-7 text-[0.95rem] text-[rgba(248,240,224,0.82)]">
            From <code className="text-[0.82em]">docs/pyramids-sound-and-claims.md</code>
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mb-5 text-[0.85rem] leading-normal opacity-85">
            People often link <strong>pyramids</strong> to <strong>sound</strong>: resonant
            chambers, <strong>Hz</strong> that “activate” stone, or acoustic levitation as
            the “real” way blocks were raised. Below is how those ideas line up with{" "}
            <strong>physics</strong>, <strong>archaeology</strong>, and{" "}
            <strong>what we can measure</strong> — same themes as the markdown doc.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className={desertCard}>
            <h3 className="mb-3 mt-0 text-[1.15rem] text-[#fcefff]">
              Is there any real connection?
            </h3>
            <p>
              <strong>Yes</strong>, any large <strong>stone enclosure</strong> has{" "}
              <strong>acoustics</strong>—reflections, reverberation, possibly strong{" "}
              <strong>modes</strong> if the geometry and materials support them. That is
              ordinary <strong>room acoustics</strong> applied to ancient masonry.
            </p>
            <p>
              So: <strong>pyramids + sound</strong> can mean{" "}
              <strong>measurable acoustics of real spaces</strong>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={desertCard}>
            <h3 className="mb-3 mt-0 text-[1.15rem] text-[#fcefff]">
              Archaeology &amp; archaeoacoustics
            </h3>
            <p>
              Researchers have <strong>measured</strong> claps, speech, and tones in{" "}
              <strong>chambers</strong> and at <strong>monuments</strong> (not only
              pyramids). Interesting results include <strong>long reverberation</strong>,{" "}
              <strong>focused reflections</strong>, or <strong>coupling</strong> between
              spaces. We can hear what the space does; proving <strong>intent</strong>
              (“they designed it for this note”) is harder and is argued case by case in the
              literature.
            </p>
            <p>
              For <strong>Egyptian pyramids</strong> specifically, articles sometimes
              highlight <strong>narrow shafts</strong> or <strong>granite chambers</strong>{" "}
              and speculate about <strong>resonance</strong>. Even when measurements exist,
              they support claims like{" "}
              <q>this room rings or sustains certain bands</q>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className={desertCard}>
            <h3 className="mb-3 mt-0 text-[1.15rem] text-[#fcefff]">
              Modern “sound techniques”
            </h3>
            <p>
              Techniques such as <strong>Chladni figures</strong>, <strong>cymatics</strong>,{" "}
              <strong>binaural beats</strong>, and <strong>sin(e) sweeps</strong> are{" "}
              <strong>real</strong> in their domains (vibration visualization,
              psychoacoustics, etc.). They illustrate <strong>waves, modes, and perception</strong>.
              They do not by themselves establish that ancient builders used those lab
              demonstrations as <strong>construction</strong> or <strong>power</strong>{" "}
              technology.
            </p>
            <p>
              <strong>Ultrasonic levitation</strong> can suspend <strong>small</strong>{" "}
              objects in controlled setups—very different from music-range sound and from
              multi-ton masonry. Usually a <strong>standing wave</strong> is formed between
              opposing high-frequency beams (or a transducer and reflector); light particles
              sit in stable zones where <strong>acoustic radiation force</strong> balances
              gravity, spaced by roughly <strong>half a wavelength</strong> (millimeters in
              air at tens of kHz).
            </p>
            <UltrasonicLevitationDemo />
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className={desertCard}>
            <h3 className="mb-3 mt-0 text-[1.15rem] text-[#fcefff]">Short answers</h3>
            <div className="mt-2 overflow-x-auto rounded-xl border border-[rgba(212,175,55,0.28)]">
              <table className="w-full border-collapse text-left text-[0.88rem] [&_tbody_tr:last-child_td]:border-b-0">
                <thead>
                  <tr>
                    <th className="bg-black/35 px-3 py-[0.55rem] font-semibold text-[#f4e4bc]">
                      Question
                    </th>
                    <th className="bg-black/35 px-3 py-[0.55rem] font-semibold text-[#f4e4bc]">
                      Practical answer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-white/[0.08] px-3 py-[0.55rem] align-top">
                      Could pyramid interiors respond to sound?
                    </td>
                    <td className="border-b border-white/[0.08] px-3 py-[0.55rem] align-top">
                      <strong>Yes</strong>—like any rigid cavity; sometimes studied.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-white/[0.08] px-3 py-[0.55rem] align-top">
                      Did sound replace ramps, levers, and labor at scale?
                    </td>
                    <td className="border-b border-white/[0.08] px-3 py-[0.55rem] align-top">
                      Maybe
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-white/[0.08] px-3 py-[0.55rem] align-top">
                      Do Hz lists or “solfeggio” maps prove pyramid acoustics?
                    </td>
                    <td className="border-b border-white/[0.08] px-3 py-[0.55rem] align-top">
                      Maybe
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className={desertCard}>
            <h3 className="mb-3 mt-0 text-[1.15rem] text-[#fcefff]">Read further</h3>
            <ul className="mb-0 list-disc pl-[1.2rem] text-[0.92rem] leading-[1.9] opacity-88 [&_code]:text-[0.85em]">
              <li>
                Peer-reviewed <strong>archaeoacoustics</strong> on <strong>specific</strong>{" "}
                monuments (methods, measurements, cautious interpretation).
              </li>
              <li>
                <strong>Egyptology</strong> and engineering history on{" "}
                <strong>quarrying, transport, and ramp</strong> models—still the usual
                framework for how large stonework was built.
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
