"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import Reveal from "./Reveal";
import { GALLERY } from "@/lib/site";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="gradient-ice relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
            See It in Action
          </p>
          <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">Gallery</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.src}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className={i === 0 || i === 4 ? "col-span-2 md:col-span-1" : ""}
            >
              <button
                onClick={() => setActive(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl shadow-soft"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/15" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-7 w-7" />
          </button>
          <div className="relative max-h-[85vh] w-full max-w-4xl">
            <Image
              src={GALLERY[active].src}
              alt={GALLERY[active].alt}
              width={1400}
              height={1000}
              className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain shadow-card"
            />
          </div>
        </div>
      )}
    </section>
  );
}
