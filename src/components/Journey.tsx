"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flag, MapPin } from "lucide-react";
import { JOURNEY } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const common = {
        trigger: line.current!,
        start: "top 65%",
        end: "bottom 75%",
        scrub: 0.6,
      };
      gsap.fromTo(fill.current, { height: "0%" }, { height: "100%", ease: "none", scrollTrigger: common });
      gsap.fromTo(
        marker.current,
        { top: "0%" },
        { top: "100%", ease: "none", scrollTrigger: common }
      );

      gsap.utils.toArray<HTMLElement>(".stop-card").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={root}
      className="relative overflow-hidden bg-gradient-to-b from-navy via-navy-2 to-navy px-5 py-24 text-white sm:py-32"
    >
      {/* faint snow specks */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(white_1px,transparent_1.5px)] [background-size:42px_42px]" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
            The Adventure to the Top
          </p>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">
            From Kathmandu to <span className="text-gradient-orange">8,848 m</span>
          </h2>
          <p className="mt-5 text-white/70">
            Every camp brings a new gamble — weather, oxygen, money and nerve.
            Scroll to follow the climb.
          </p>
        </div>

        {/* timeline */}
        <div ref={line} className="relative mt-16 pl-12 sm:pl-0">
          {/* track */}
          <div className="absolute left-5 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-white/15 sm:left-1/2" />
          {/* progress fill */}
          <div
            ref={fill}
            className="gradient-orange absolute left-5 top-0 w-1 -translate-x-1/2 rounded-full sm:left-1/2"
            style={{ height: "0%" }}
          />
          {/* climber marker */}
          <div
            ref={marker}
            className="absolute left-5 z-20 -translate-x-1/2 -translate-y-1/2 sm:left-1/2"
            style={{ top: "0%" }}
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-orange/40" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
              <div className="gradient-orange relative flex h-11 w-11 items-center justify-center rounded-full text-white shadow-card ring-4 ring-navy">
                <Flag className="h-5 w-5" />
              </div>
            </div>
          </div>

          <ul className="space-y-10">
            {JOURNEY.map((stop, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={stop.name}
                  className="relative flex sm:justify-center"
                >
                  {/* node dot */}
                  <span className="absolute left-5 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-navy bg-gold sm:left-1/2" />
                  <div
                    className={`stop-card w-full rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm sm:w-[44%] ${
                      left ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        left ? "sm:justify-end" : ""
                      }`}
                    >
                      <MapPin className="h-4 w-4 text-gold" />
                      <span className="text-xs font-bold uppercase tracking-widest text-gold">
                        {stop.stage}
                      </span>
                    </div>
                    <h3 className="font-display mt-2 text-2xl text-white">{stop.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {stop.note}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
