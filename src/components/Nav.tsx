"use client";

import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, ShoppingBag } from "lucide-react";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "The Climb" },
  { href: "#components", label: "What's Inside" },
  { href: "#how-to-play", label: "How to Play" },
  { href: "#gallery", label: "Gallery" },
  { href: "#preorder", label: "Get It" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-soft py-2" : "py-4 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5 text-navy">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.png" alt="Everest Conquest logo" className="h-9 w-9 object-contain" />
          <span className="font-display text-lg tracking-tight">
            EVEREST CONQUEST
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold text-navy-2/80 transition-colors hover:text-orange"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <a
            href={SITE.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-orange hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 sm:flex"
          >
            <ShoppingCart className="h-4 w-4" />
            Amazon
          </a>
          <a
            href={SITE.flipkartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#2874f0] px-4 py-2 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 sm:flex"
          >
            <ShoppingBag className="h-4 w-4" />
            Flipkart
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full p-2 text-navy lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      {open && (
        <div className="glass mx-4 mt-2 rounded-2xl p-4 shadow-card lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 font-semibold text-navy-2 hover:bg-ice-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={SITE.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-orange mt-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-white"
              >
                <ShoppingCart className="h-4 w-4" /> Buy on Amazon
              </a>
            </li>
            <li>
              <a
                href={SITE.flipkartUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#2874f0] px-4 py-3 font-bold text-white"
              >
                <ShoppingBag className="h-4 w-4" /> Buy on Flipkart
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
