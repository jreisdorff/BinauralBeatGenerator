"use client";

import { HeroSection } from "@/sections/HeroSection";
import { AncientSection } from "@/sections/AncientSection";
import { BinauralSection } from "@/sections/BinauralSection";
import { AcousticsSection } from "@/sections/AcousticsSection";
import { PyramidsSection } from "@/sections/PyramidsSection";
import { FooterSection } from "@/sections/FooterSection";

export function SoundLabPage() {
  return (
    <div className="app">
      <nav className="nav-rail" aria-label="Section jump links">
        <a href="#ancient" className="nav-rail__dot" title="Ancient tuning">
          <span />
        </a>
        <a href="#binaural" className="nav-rail__dot" title="Binaural">
          <span />
        </a>
        <a href="#acoustics" className="nav-rail__dot" title="Acoustics">
          <span />
        </a>
        <a href="#pyramids" className="nav-rail__dot" title="Pyramids & sound">
          <span />
        </a>
        <a href="#more" className="nav-rail__dot" title="More">
          <span />
        </a>
      </nav>
      <main>
        <HeroSection />
        <AncientSection />
        <BinauralSection />
        <AcousticsSection />
        <PyramidsSection />
        <FooterSection />
      </main>
    </div>
  );
}
