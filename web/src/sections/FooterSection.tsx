import { motion } from "framer-motion";
import { TechWalkthroughLink } from "../components/TechWalkthroughLink";
import { GITHUB_REPO_URL } from "../constants/repo";

export function FooterSection() {
  return (
    <footer
      className="relative min-h-0 overflow-hidden border-t border-white/[0.06] bg-[#0a0a0d] pb-16 pt-[clamp(3rem,8vw,6rem)] px-[clamp(1.25rem,5vw,3rem)]"
      id="more"
    >
      <div className="relative z-[1] mx-auto max-w-[900px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-[-0.02em]">CLI & docs</h2>
            <TechWalkthroughLink
              segment="reference"
              className="mt-0.5 shrink-0 rounded-full border border-white/25 bg-white/[0.06] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-wide text-[#e8e6e3]/95 no-underline hover:border-white/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            >
              Tech notes
            </TechWalkthroughLink>
          </div>
          <p className="mb-3 text-[0.88rem] leading-relaxed opacity-[0.82]">
            <a
              href={GITHUB_REPO_URL}
              className="underline decoration-white/35 underline-offset-[3px] hover:decoration-[#d4af37]/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub: jreisdorff/BinauralBeatGenerator
            </a>
            . Run the commands below from the repo root unless noted.
          </p>
          <ul className="mb-6 list-outside list-disc pl-5 text-[0.92rem] leading-[1.9] opacity-[0.88] [&_code]:text-[0.85em]">
            <li>
              <code>npm start</code> — corpus summary in the Node project root
            </li>
            <li>
              <code>npm run midi:tightening</code> ·{" "}
              <code>npm run audio:binaural</code> · <code>npm run audio:beat</code>
            </li>
            <li>
              <code>npm run audio:preset:all</code> ·{" "}
              <code>npm run acoustics:demo</code>
            </li>
            <li>
              Read <code>docs/philology-iraq-sources.md</code>,{" "}
              <code>docs/sound-and-built-environment.md</code>, and{" "}
              <code>docs/pyramids-sound-and-claims.md</code>
            </li>
          </ul>
          <p className="max-w-[52ch] text-[0.82rem] opacity-[0.65] [&_code]:text-[0.85em]">
            This page is a front-end shell; audio files live in{" "}
            <code>web/public/audio</code> after <code>npm run copy-assets</code> in the{" "}
            <a
              href={GITHUB_REPO_URL}
              className="underline decoration-white/30 underline-offset-[3px] hover:decoration-[#d4af37]/70"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub checkout
            </a>
            .
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
