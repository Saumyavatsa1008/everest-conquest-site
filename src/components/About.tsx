import { Mountain, Dices, Trophy } from "lucide-react";
import Reveal from "./Reveal";
import { PILLARS } from "@/lib/site";

const ICONS = { mountain: Mountain, dice: Dices, trophy: Trophy };

export default function About() {
  return (
    <section id="about" className="topo relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
            The Expedition Begins
          </p>
          <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
            Do you have what it takes to climb Mount Everest?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            It&apos;s a thrilling journey from Kathmandu that mirrors real-time
            challenges as you navigate icy crevasses, battle avalanches, and make
            life-or-death decisions while climbing toward the towering summit of
            Everest. Risk, strategy and triumph await.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = ICONS[p.icon as keyof typeof ICONS];
            return (
              <Reveal
                key={p.title}
                delay={(i + 1) as 1 | 2 | 3}
                className="group rounded-3xl border border-ice-200 bg-white p-8 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-card"
              >
                <div className="gradient-orange mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-soft transition-transform group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl text-navy">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-navy-2/75">{p.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
