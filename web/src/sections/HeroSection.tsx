import { motion } from "framer-motion";
import { HeroEarth } from "../components/HeroEarth";

export function HeroSection() {
  return (
    <header className="section section--hero">
      <div className="section--hero__bg" />
      <div className="section__inner hero__layout">
        <HeroEarth />
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>SoundWorld</h1>
          <p className="hero__lead">
            Scroll through what this repository explores: Mesopotamian tuning theory,
            binaural experiments, and room acoustics — with players where we have WAV
            files.
          </p>
          <motion.div
            className="hero__scroll"
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
