"use client";

import { ChevronDown, ShoppingCart, ShoppingBag, Flag } from "lucide-react";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="relative w-full overflow-hidden">
      {/* sky gradient + drifting clouds */}
      <div className="gradient-sky-hero absolute inset-0" />
      <Clouds />

      {/* Hero photo shown in full at the top, exactly as-is (no cropping) */}
      <img
        src="/images/hero.jpg"
        alt="Everest Conquest board game box resting in fresh mountain snow"
        className="relative z-10 block h-auto w-full"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-10 sm:pt-12">
        {/* Everything written sits below the photo */}
        <div className="flex flex-col items-center text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal shadow-soft backdrop-blur">
            <Flag className="h-3.5 w-3.5" /> {SITE.designedBy}
          </span>

          <h1 className="font-display text-5xl leading-[0.95] text-white drop-shadow-md sm:text-7xl lg:text-8xl">
            EVEREST <span className="text-gradient-orange">CONQUEST</span>
          </h1>

          <p className="mt-6 max-w-xl text-base font-medium text-white/85 sm:text-lg">
            {SITE.subtitle}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={SITE.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-orange flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-bold text-white shadow-card transition-transform hover:scale-105"
            >
              <ShoppingCart className="h-5 w-5" /> Buy on Amazon
            </a>
            <a
              href={SITE.flipkartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#2874f0] px-7 py-3.5 text-base font-bold text-white shadow-card transition-transform hover:scale-105"
            >
              <ShoppingBag className="h-5 w-5" /> Buy on Flipkart
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm font-bold text-white/80">
            <span>2–6 Players</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>Ages 14+</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>60–120 min</span>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        className="relative z-10 mx-auto mb-6 flex w-fit text-white/70 transition-colors hover:text-orange"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8 animate-bob" />
      </a>
    </section>
  );
}

function Clouds() {
  const clouds = [
    { top: "8%", size: 150, dur: 60, delay: 0, op: 0.85 },
    { top: "18%", size: 90, dur: 85, delay: -20, op: 0.6 },
    { top: "4%", size: 110, dur: 72, delay: -45, op: 0.7 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: c.top,
            left: 0,
            opacity: c.op,
            animation: `drift ${c.dur}s linear ${c.delay}s infinite`,
          }}
        >
          <Cloud w={c.size} />
        </div>
      ))}
    </div>
  );
}

function Cloud({ w }: { w: number }) {
  return (
    <svg width={w} height={w * 0.6} viewBox="0 0 100 60" fill="#ffffff">
      <ellipse cx="30" cy="40" rx="26" ry="18" />
      <ellipse cx="52" cy="32" rx="30" ry="22" />
      <ellipse cx="74" cy="42" rx="22" ry="16" />
      <rect x="20" y="40" width="60" height="16" rx="8" />
    </svg>
  );
}
