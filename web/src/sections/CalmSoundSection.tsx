import { Reveal } from "../components/Reveal";
import { CalmSoundPad } from "../components/CalmSoundPad";
import { TechWalkthroughLink } from "../components/TechWalkthroughLink";

export function CalmSoundSection() {
  return (
    <section
      className="relative isolate min-h-screen overflow-hidden py-[clamp(3rem,8vw,6rem)] px-[clamp(1.25rem,5vw,3rem)] text-[#e8ecff]"
      id="calm"
      aria-labelledby="calm-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 10% 20%, rgba(96, 165, 250, 0.22) 0%, transparent 55%),
            radial-gradient(ellipse 90% 70% at 90% 10%, rgba(167, 139, 250, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59, 130, 246, 0.12) 0%, transparent 45%),
            linear-gradient(168deg, #0f172a 0%, #1e1b4b 28%, #312e81 52%, #1e3a5f 78%, #172554 100%)
          `,
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.2)_0%,transparent_35%,transparent_65%,rgba(30,27,75,0.35)_100%)]" aria-hidden />
      <div
        className="pointer-events-none absolute -left-[20%] top-1/3 h-[min(55vw,420px)] w-[min(55vw,420px)] rounded-full bg-sky-500/15 blur-[80px] motion-reduce:animate-none"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[15%] bottom-1/4 h-[min(50vw,380px)] w-[min(50vw,380px)] rounded-full bg-violet-500/20 blur-[90px] motion-reduce:animate-none"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-[900px]">
        <Reveal>
          <p className="mb-2 font-sans text-[0.75rem] font-medium uppercase tracking-[0.22em] text-sky-200/75">
            Browser generator
          </p>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2
              id="calm-heading"
              className="font-calm text-[clamp(2.1rem,5vw,3rem)] font-medium italic leading-tight tracking-[-0.02em] text-[#f0f4ff] [text-shadow:0_2px_40px_rgba(99,102,241,0.35)]"
            >
              Calm sound
            </h2>
            <TechWalkthroughLink
              segment="calm"
              className="mt-2 shrink-0 rounded-full border border-sky-300/40 bg-[rgba(15,23,42,0.45)] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-sky-100 no-underline hover:border-sky-200/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              Tech notes
            </TechWalkthroughLink>
          </div>
          <p className="mt-3 max-w-[56ch] font-sans text-[0.95rem] leading-relaxed text-[#c7d2fe]/90">
            Soft noise and drones generated in your browser — a quiet break after binaural
            listening. No files required; use a low level first.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8">
            <CalmSoundPad headingId="calm-heading" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
