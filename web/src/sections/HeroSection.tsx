import { motion } from "framer-motion";
import { HeroEarth } from "../components/HeroEarth";
import { HeroTechnicalAsciiPanel } from "../components/HeroTechnicalAsciiPanel";

export function HeroSection() {
  return (
    <header className="section section--hero relative isolate flex min-h-[100svh] flex-col overflow-hidden lg:flex-row">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0b1c30] via-[#0a1628] to-[#050810]"
        aria-hidden
      />

      <div className="relative z-[1] flex min-h-[min(60svh,720px)] flex-1 flex-col items-center justify-center px-[clamp(1rem,4vw,2rem)] py-[clamp(2rem,6vw,4rem)] lg:min-h-[100svh] lg:w-1/2">
        <HeroEarth />
        <motion.div
          className="hero__content mt-[clamp(1.25rem,4vw,2.5rem)] flex w-full max-w-[min(420px,88vw)] flex-col lg:max-w-[min(380px,42vw)]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-5xl text-[#e8e6e3]">SoundWorld</div>
          <p className="hero__lead mt-4 text-[clamp(0.95rem,2.2vw,1.08rem)] leading-[1.55] text-[rgba(232,230,227,0.88)]">
            Scroll through what this repository explores: Mesopotamian tuning theory,
            binaural experiments, and room acoustics — with players where we have WAV
            files.
          </p>
          <motion.div
            className="hero__scroll mt-8 text-[0.82rem] tracking-wide text-[rgba(232,230,227,0.55)]"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            aria-hidden
          >
            ↓ Scroll
          </motion.div>
        </motion.div>
      </div>

      <HeroTechnicalAsciiPanel />
    </header>
  );
}
