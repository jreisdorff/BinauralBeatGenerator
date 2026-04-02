import { motion } from "framer-motion";
import { HeroEarth } from "../components/HeroEarth";

export function HeroSection() {
  return (
    <header className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_20%,#2a2a38_0%,#0c0c0f_55%)] py-[clamp(3rem,8vw,6rem)] px-[clamp(1.25rem,5vw,3rem)]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 70%, rgba(212,175,55,0.08), transparent 45%),
            radial-gradient(circle at 70% 40%, rgba(100,120,200,0.06), transparent 40%)`,
        }}
      />
      <div className="relative z-[1] mx-auto flex w-full max-w-[1100px] flex-col items-center gap-[clamp(2rem,5vw,3rem)] px-[clamp(1.25rem,4vw,2rem)] min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-center min-[900px]:gap-[clamp(2.5rem,6vw,4rem)]">
        <div className="flex w-full justify-center min-[900px]:order-1 min-[900px]:w-auto min-[900px]:shrink-0">
          <HeroEarth />
        </div>
        <motion.div
          className="w-full max-w-[640px] text-center min-[900px]:order-0 min-[900px]:min-w-0 min-[900px]:max-w-[520px] min-[900px]:flex-1 min-[900px]:text-left"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="mb-4 font-cinzel text-[clamp(2rem,5.5vw,3.2rem)] font-semibold leading-[1.15] text-[#f0e6d8]">
            SoundWorld
          </h1>
          <p className="mb-10 text-[1.05rem] leading-[1.65] opacity-[0.82]">
            Scroll through what this repository explores: Mesopotamian tuning theory,
            binaural experiments, and room acoustics — with players where we have WAV
            files.
          </p>
          <motion.div
            className="text-[0.85rem] tracking-[0.08em] opacity-50"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            aria-hidden
          >
            ↓ Scroll
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
