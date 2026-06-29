import Reveal from "./Reveal";

export default function HowToPlay() {
  return (
    <section id="how-to-play" className="topo relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
            Learn the Ropes
          </p>
          <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
            How to play
          </h2>
          <p className="mt-5 text-lg text-white/85">
            Watch the full how-to-play walkthrough to master every expedition.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border-4 border-white bg-navy shadow-card">
            <video
              className="aspect-video w-full"
              controls
              preload="metadata"
              poster="/images/promo-race.jpeg"
            >
              <source src="/video/how-to-play.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
