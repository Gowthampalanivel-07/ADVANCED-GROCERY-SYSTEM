'use client';

import { motion } from 'framer-motion';

const marqueeText =
  '🍃 Thank you for choosing organic & natural • 🌿 Health & Happiness Always • 🥦 Food is medicine • 🌱 Healthy food from healthy soil • 🚜 Farming is woven into the fabric of our communities • 🍎 Fresh from farm to your table every day • ';

const marqueeTextReverse =
  '🥭 Alphonso Mangoes from GI-tagged farms • 🏺 Vedic Bilona Ghee, hand-churned • 🌾 Ancient grains for modern wellness • 🫙 100% pesticide-free ingredients • 🌻 Sourced from certified organic farms • 🌿 Supporting sustainable agriculture • ';

// Duplicate text for seamless loop
const trackContent = Array(6).fill(marqueeText).join('');
const trackContentReverse = Array(6).fill(marqueeTextReverse).join('');

export function Marquee() {
  return (
    <div className="w-full overflow-hidden select-none border-y border-primary/10">
      {/* Row 1 — scrolls left */}
      <div className="bg-primary py-2.5 overflow-hidden relative flex">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        <div className="marquee-track-left text-white font-bold text-xs sm:text-sm tracking-wide uppercase whitespace-nowrap">
          {trackContent}
          {trackContent}
        </div>
      </div>

      {/* Row 2 — scrolls right (opposite), accent-colored */}
      <div className="bg-accent/90 py-2 overflow-hidden relative flex">
        {/* fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-accent/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-accent/90 to-transparent z-10 pointer-events-none" />

        <div className="marquee-track-right text-white font-semibold text-[11px] sm:text-xs tracking-wide uppercase whitespace-nowrap">
          {trackContentReverse}
          {trackContentReverse}
        </div>
      </div>
    </div>
  );
}
