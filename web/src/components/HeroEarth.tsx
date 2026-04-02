"use client";

import { motion } from "framer-motion";

/**
 * 3D-tilted globe: perspective + oblique axis, texture scroll simulates daily rotation.
 * Texture: equirectangular Earth (Wikimedia Commons, public domain).
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
      <div className="hero-earth__pivot">
        <div className="hero-earth__axis">
          <div className="hero-earth__stage">
            <div className="hero-earth__sphere">
              <div className="hero-earth__map" />
              <div className="hero-earth__terminator" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
