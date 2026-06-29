"use client";

/**
 * HeroFilm — a self-contained, continuously-looping animated "film" for the top
 * of the landing page. Real drone climbing footage flows into a motion-graphics
 * sequence:
 *
 *   0. THE CLIMB   — drone shot of a climber; the traits fade in (HARD WORK,
 *                    DEDICATION, FEAR, GRIT) and resolve into EXPERIENCE
 *   1. PACK IN     — the whole climb (the "experience") shrinks down into the box
 *   2. OPEN        — the box pops open
 *   3. UNPACK      — the cards & components burst out and fan around it
 *   4. SETTLE      — a quick EVEREST CONQUEST beat, then the loop restarts
 *
 * It plays in a contained 16:9 frame; the page heading and everything else sit
 * below it. Respects prefers-reduced-motion (shows a static open-box frame).
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Box3D from "./Box3D";

/** Traits that fade in over the climb. */
const WORDS = [
  { t: "HARD WORK", x: "30%", y: "32%", delay: 0.2 },
  { t: "DEDICATION", x: "68%", y: "46%", delay: 1.0 },
  { t: "FEAR", x: "26%", y: "62%", delay: 1.7 },
  { t: "GRIT", x: "72%", y: "26%", delay: 2.3 },
];

/** Cards that burst out of the box (the game's real decks). */
const CARDS = [
  { label: "Equipment", tone: "#ff6b6b", emoji: "🪜", x: -230, y: -36, r: -20 },
  { label: "Movement", tone: "#4aa3df", emoji: "🎿", x: -140, y: -150, r: -10 },
  { label: "Wild Card", tone: "#ff8a3d", emoji: "⚡", x: -34, y: -196, r: -3 },
  { label: "Immunity", tone: "#3fb27f", emoji: "🛡️", x: 70, y: -188, r: 6 },
  { label: "Rescue", tone: "#e85d75", emoji: "🚁", x: 165, y: -120, r: 15 },
  { label: "Energy", tone: "#7c6cf0", emoji: "🥤", x: 232, y: -20, r: 22 },
];

/** Phase durations in ms. */
const PHASE_MS = [4200, 1500, 1500, 3200, 1900];

export default function HeroFilm() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [loop, setLoop] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Loop the scripted timeline forever (timer callbacks only — no sync setState).
  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    let acc = 0;
    PHASE_MS.forEach((d, i) => {
      acc += d;
      timers.push(
        window.setTimeout(() => {
          if (i + 1 < PHASE_MS.length) setPhase(i + 1);
          else {
            setPhase(0);
            setLoop((l) => l + 1);
          }
        }, acc)
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduce, loop]);

  // Restart the climb footage at the top of every loop.
  useEffect(() => {
    if (phase !== 0) return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [phase, loop]);

  const packed = phase >= 1; // climb has collapsed into the box
  const open = phase >= 2;

  return (
    <div className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-[28px] bg-navy shadow-card ring-1 ring-white/10">
      {/* branded stage behind everything (shown once the footage collapses) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#1b5a82_0%,#0e2c47_60%,#08192a_100%)]" />

      {/* The climb footage (persistent layer; collapses into the box) */}
      <motion.video
        ref={videoRef}
        src="/video/drone-climb.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transformOrigin: "50% 44%" }}
        animate={
          packed
            ? { scale: 0.04, opacity: 0, filter: "blur(6px)" }
            : { scale: 1, opacity: 1, filter: "blur(0px)" }
        }
        transition={{ duration: packed ? 1.2 : 0.5, ease: [0.6, 0, 0.4, 1] }}
      />

      {/* darken the footage so the words read; fades as we leave the climb */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55"
        animate={{ opacity: packed ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* ---------- Phase 0: the traits ---------- */}
      {!reduce && phase === 0 && (
        <div key={`words-${loop}`} className="absolute inset-0">
          {WORDS.map((w) => (
            <motion.span
              key={w.t}
              className="font-display absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white"
              style={{
                left: w.x,
                top: w.y,
                fontSize: "clamp(0.9rem,2.6vw,1.8rem)",
                textShadow: "0 3px 18px rgba(0,0,0,0.6)",
              }}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.9], filter: "blur(0px)" }}
              transition={{ duration: 1.7, delay: w.delay, times: [0, 0.2, 0.75, 1] }}
            >
              {w.t}
            </motion.span>
          ))}
          {/* the traits resolve into EXPERIENCE */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.4, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 3.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-display text-gradient-orange text-3xl sm:text-5xl"
              style={{ filter: "drop-shadow(0 8px 30px rgba(255,122,24,0.5))" }}
            >
              EXPERIENCE
            </span>
          </motion.div>
        </div>
      )}

      {/* ---------- Phases 1+: the box ---------- */}
      {(reduce || phase >= 1) && (
        <div className="absolute inset-0 flex items-center justify-center">
          {/* EXPERIENCE token diving into the box (phase 1) */}
          <AnimatePresence>
            {!reduce && phase === 1 && (
              <motion.span
                key={`tok-${loop}`}
                className="font-display text-gradient-orange absolute z-30 text-2xl sm:text-4xl"
                style={{ filter: "drop-shadow(0 6px 24px rgba(255,122,24,0.6))" }}
                initial={{ y: -130, scale: 1, opacity: 0 }}
                animate={{ y: 24, scale: 0.12, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.3, ease: [0.6, 0, 0.4, 1], times: [0, 0.25, 0.7, 1] }}
              >
                EXPERIENCE
              </motion.span>
            )}
          </AnimatePresence>

          {/* glow */}
          <motion.div
            className="absolute h-1/2 w-1/2 rounded-full"
            style={{ background: "radial-gradient(circle,rgba(255,122,24,0.45),transparent 70%)" }}
            animate={{
              scale: open ? [1, 1.5, 1.2] : [0.7, 1, 0.7],
              opacity: open ? 0.9 : 0.45,
            }}
            transition={{ duration: open ? 0.8 : 1.2, ease: "easeOut" }}
          />

          {/* cards bursting out (phase 3+) */}
          <AnimatePresence>
            {!reduce &&
              phase >= 3 &&
              CARDS.map((c, i) => (
                <motion.div
                  key={`${c.label}-${loop}`}
                  className="absolute z-40 flex h-[19%] w-[8.5%] min-w-[42px] flex-col items-center justify-between rounded-md border border-white bg-white p-1 shadow-card"
                  initial={{ x: 0, y: 10, scale: 0.2, opacity: 0, rotate: 0 }}
                  animate={{ x: c.x, y: c.y, scale: 1, opacity: 1, rotate: c.r }}
                  transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 120, damping: 13 }}
                >
                  <span
                    className="w-full truncate rounded-[3px] py-0.5 text-center text-[6px] font-bold uppercase tracking-wide text-white sm:text-[8px]"
                    style={{ background: c.tone }}
                  >
                    {c.label}
                  </span>
                  <span className="text-base sm:text-xl">{c.emoji}</span>
                  <span className="h-0.5 w-5 rounded-full" style={{ background: c.tone }} />
                </motion.div>
              ))}
          </AnimatePresence>

          {/* the real CSS-3D box — lid hinges open */}
          <motion.div
            className="relative z-20"
            initial={{ scale: 0.15, y: 16, opacity: 0 }}
            animate={{
              scale: open ? 1.06 : 0.96,
              y: 0,
              opacity: 1,
              x: phase === 2 ? [0, -5, 5, -3, 3, 0] : 0,
            }}
            transition={{ duration: open ? 0.6 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Box3D open={open} />
          </motion.div>

          {/* settle beat */}
          <AnimatePresence>
            {!reduce && phase === 4 && (
              <motion.div
                key={`title-${loop}`}
                className="absolute bottom-[8%] z-40 text-center"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="font-display text-lg text-white drop-shadow-lg sm:text-2xl">
                  EVEREST <span className="text-gradient-orange">CONQUEST</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* subtle vignette + frame sheen */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
