"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

const EARTH =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/1600px-Equirectangular_projection_SW.jpg";

type Props = {
  className?: string;
};

export function HeroEarth({ className }: Props) {
  return (
    <motion.div
      className={cn(
        "relative aspect-square w-full max-w-[min(420px,88vw)] lg:max-w-[min(380px,42vw)]",
        className,
      )}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute -inset-[14%] rounded-full blur-[18px]"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, rgba(130,190,255,0.22) 0%, rgba(50,90,180,0.06) 50%, transparent 72%)",
        }}
      />
      <div className="relative h-full w-full rounded-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]">
        <div className="relative isolate aspect-square h-auto w-full overflow-hidden rounded-full bg-[#0d1b2a]">
          <div
            className="absolute left-0 top-0 h-full w-[200%] animate-hero-earth will-change-transform motion-reduce:translate-x-[-15%] motion-reduce:animate-none"
            style={{
              backgroundColor: "#1b4f72",
              backgroundImage: `url("${EARTH}")`,
              backgroundSize: "50% 100%",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "0 50%",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_-28px_0_56px_rgba(0,0,0,0.5),inset_10px_8px_40px_rgba(255,255,255,0.06)]"
            style={{
              background:
                "radial-gradient(ellipse 92% 92% at 30% 28%, transparent 0%, transparent 42%, rgba(0,0,0,0.15) 72%, rgba(0,0,0,0.55) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(120,180,255,0.18)]" />
        </div>
      </div>
    </motion.div>
  );
}
