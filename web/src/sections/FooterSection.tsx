import { motion } from "framer-motion";

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
          <h2 className="mb-2 text-2xl font-bold tracking-[-0.02em]">CLI & docs</h2>
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
            <code>web/public/audio</code> after <code>npm run copy-assets</code>.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
