import Counter from "./Counter";
import Reveal from "./Reveal";
import { STATS } from "@/lib/site";

export default function Stats() {
  return (
    <section className="relative z-20 -mt-8 px-5">
      <div className="mx-auto max-w-5xl">
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ice-200 shadow-card md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white px-5 py-8 text-center">
              <div className="font-display text-3xl text-navy sm:text-4xl">
                <Counter
                  value={s.value}
                  from={s.from}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                />
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-teal">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
