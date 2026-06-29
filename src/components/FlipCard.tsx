"use client";

import { useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

type Props = {
  title: string;
  image: string;
  video: string;
};

export default function FlipCard({ title, image, video }: Props) {
  const [flipped, setFlipped] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function toggle() {
    const next = !flipped;
    setFlipped(next);
    const v = videoRef.current;
    if (!v) return;
    if (next) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${title} — tap to ${flipped ? "close" : "play"} video`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className="group aspect-[3/4] w-full cursor-pointer [perspective:1200px]"
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 ease-out [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* front — product image */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-ice-200 bg-white shadow-soft transition-shadow group-hover:shadow-card [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
          <div className="flex min-h-0 flex-[3] items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-1 px-2 pb-3 text-center">
            <h3 className="font-display text-base leading-tight text-navy sm:text-lg">
              {title}
            </h3>
            <p className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-orange">
              <Play className="h-3 w-3 fill-current" /> Tap to play
            </p>
          </div>
        </div>

        {/* back — video clip of the real component */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy shadow-card [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex flex-1 items-center justify-center bg-black">
            <video
              ref={videoRef}
              src={video}
              className="h-full w-full object-contain"
              playsInline
              loop
              muted
              preload="none"
            />
          </div>
          <div className="flex items-center justify-center gap-1.5 px-3 py-3 text-center">
            <RotateCcw className="h-3.5 w-3.5 text-gold" />
            <h3 className="font-display text-base text-white">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
