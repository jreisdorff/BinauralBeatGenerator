"use client";

import { HeroSection } from "@/sections/HeroSection";
import { AncientSection } from "@/sections/AncientSection";
import { BinauralSection } from "@/sections/BinauralSection";
import { CalmSoundSection } from "@/sections/CalmSoundSection";
import { AcousticsSection } from "@/sections/AcousticsSection";
import { PyramidsSection } from "@/sections/PyramidsSection";
import { FooterSection } from "@/sections/FooterSection";

const NAV_LINKS = [
  ["#ancient", "Ancient tuning"],
  ["#binaural", "Binaural"],
  ["#calm", "Calm sound"],
  ["#acoustics", "Acoustics"],
  ["#pyramids", "Pyramids & sound"],
  ["#more", "More"],
] as const;

export function SoundWorldPage() {
  return (
    <div className="relative min-h-screen">
      <nav
        className="fixed right-[clamp(0.5rem,2vw,1.25rem)] top-1/2 z-50 flex max-h-[90vh] -translate-y-1/2 flex-col items-center gap-3 overflow-y-auto max-[520px]:hidden"
        aria-label="Section jump links"
      >
        <div className="flex flex-col gap-[0.65rem]">
          {NAV_LINKS.map(([href, title]) => (
            <a
              key={href}
              href={href}
              className="block p-1 no-underline focus-visible:rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
              title={title}
            >
              <span className="block h-2.5 w-2.5 rounded-full border border-white/35 bg-white/25 transition duration-200 ease-out hover:scale-125 hover:bg-[rgba(212,175,55,0.85)] focus-visible:scale-125 focus-visible:bg-[rgba(212,175,55,0.85)]" />
            </a>
          ))}
        </div>
      </nav>

      <main>
        <HeroSection />
        <AncientSection />
        <BinauralSection />
        <CalmSoundSection />
        <AcousticsSection />
        <PyramidsSection />
        <FooterSection />
      </main>
    </div>
  );
}
