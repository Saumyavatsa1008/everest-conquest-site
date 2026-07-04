import Reveal from "./Reveal";
import FlipCard from "./FlipCard";
import { CARDS, INSIDE_BOX } from "@/lib/site";

export default function GameComponents() {
  return (
    <section id="components" className="gradient-ice relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-lg font-extrabold uppercase tracking-[0.18em] text-orange sm:text-xl">
            What&apos;s inside the box?
          </p>
          <h2 className="font-display mt-4 text-3xl text-white sm:text-5xl">
            Everything you need for the climb
          </h2>
        </Reveal>

        {/* real game cards — continuous right-to-left marquee */}
        <div className="marquee-pause relative mt-14 overflow-hidden">
          {/* soft fade at both edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-dusk-3 to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-dusk-3 to-transparent sm:w-28" />
          <div className="flex w-max animate-marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-5 pr-5" aria-hidden={dup === 1}>
                {CARDS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={dup === 0 ? "Everest Conquest game card" : ""}
                    className="h-52 w-auto drop-shadow-2xl sm:h-64"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* flip cards — tap to flip and watch each component in action */}
        <Reveal className="mt-20">
          <p className="text-center text-base text-white/80">
            Tap any card to flip it and see the real thing in action.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {INSIDE_BOX.map((item) => (
              <FlipCard key={item.title} {...item} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
