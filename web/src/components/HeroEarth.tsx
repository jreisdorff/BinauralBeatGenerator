"use client";

import { motion } from "framer-motion";

/**
 * Front-facing globe: equirectangular texture scrolls inside a circular mask.
 * Heavy 3D tilts break this trick (flat map ≠ sphere); a light rim + shading reads as a ball.
 */
export function HeroEarth() {
  return (
    <motion.div
      className="hero-earth"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      aria-hidden
    >
      <div className="hero-earth__glow" />
      <div className="hero-earth__stage">
        <div className="hero-earth__sphere">
          <div className="hero-earth__map" />
          <div className="hero-earth__shade" />
          <div className="hero-earth__rim" />
        </div>
      </div>
    </motion.div>
  );
}
