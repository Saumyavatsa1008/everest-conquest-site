import { ShoppingCart, ShoppingBag } from "lucide-react";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy-2 px-5 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm text-center md:text-left">
            <div className="flex items-center justify-center gap-2.5 md:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-mark-white.png" alt="Everest Conquest logo" className="h-9 w-9 object-contain" />
              <span className="font-display text-lg">
                EVEREST CONQUEST
              </span>
            </div>
            <p className="mt-4 text-sm text-white/60">{SITE.subtitle}</p>
            <p className="mt-3 text-xs uppercase tracking-widest text-gold">
              {SITE.designedBy}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
              <a
                href={SITE.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-orange inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
              >
                <ShoppingCart className="h-4 w-4" /> Buy on Amazon
              </a>
              <a
                href={SITE.flipkartUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#2874f0] px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
              >
                <ShoppingBag className="h-4 w-4" /> Buy on Flipkart
              </a>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/70">
              <a href="#about" className="hover:text-gold">About</a>
              <a href="#journey" className="hover:text-gold">The Climb</a>
              <a href="#how-to-play" className="hover:text-gold">How to Play</a>
              <a href="#preorder" className="hover:text-gold">Get It</a>
              <a href="#contact" className="hover:text-gold">Contact</a>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Everest Conquest. All rights reserved. Race to the top — victory awaits.
        </div>
      </div>
    </footer>
  );
}
