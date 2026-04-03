import Link from "next/link";

const mono =
  "font-[family-name:'Courier_New',Courier,'Liberation_Mono',monospace]";

/**
 * Right half of the hero: B/W Courier headline; entire surface links to /technical.
 */
export function HeroTechnicalAsciiPanel() {
  return (
    <Link
      href="/technical"
      className={`group relative flex min-h-[min(40vh,320px)] w-full flex-col items-center justify-center gap-8 border-t border-black bg-white px-[clamp(1rem,4vw,2.5rem)] py-10 text-center text-black transition-colors [text-decoration:none] hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-black lg:min-h-[100svh] lg:w-1/2 lg:flex-1 lg:border-l lg:border-t-0 ${mono}`}
      aria-label="Open technical walkthrough (companion documentation site)"
    >
      <div className="flex w-full max-w-[min(96vw,40rem)] flex-col items-center">
        <p className="m-0 text-[clamp(0.78rem,2.4vw,1.35rem)] font-bold uppercase leading-[1.35] tracking-[0.42em] text-black">
          Technical walkthrough
        </p>
        <p className="mt-6 m-0 max-w-[22rem] text-[0.72rem] leading-snug tracking-wide text-neutral-600">
          Formulas, code sketches, and bundled docs — monospace companion to this scroll
          experience.
        </p>
        <p className="mt-5 m-0 text-[0.65rem] uppercase tracking-[0.32em] text-neutral-500 group-hover:text-black">
          Click to enter →
        </p>
      </div>
    </Link>
  );
}
