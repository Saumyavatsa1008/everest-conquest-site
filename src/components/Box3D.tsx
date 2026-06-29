"use client";

/**
 * Box3D — a real CSS-3D Everest Conquest box whose lid hinges open at the back
 * edge (verified geometry: a centred 6-face box viewed at rotateX(-22) rotateY(28),
 * lid pivots about its back edge from 0° closed to -118° open).
 */

import { motion } from "framer-motion";

export default function Box3D({ open }: { open: boolean }) {
  return (
    <div className="b3d-scene">
      <div className="b3d-box">
        <div className="b3d-face b3d-front">
          <span className="b3d-fronttext">
            DO YOU HAVE WHAT IT TAKES&nbsp;<b>?</b>
          </span>
        </div>
        <div className="b3d-face b3d-back" />
        <div className="b3d-face b3d-right" />
        <div className="b3d-face b3d-left" />
        <div className="b3d-face b3d-bottom" />

        {/* hinge wrapper places the lid where the top face is; lid rotates about its back edge */}
        <div className="b3d-face b3d-hinge">
          <motion.div
            className="b3d-lid"
            initial={false}
            animate={{ rotateX: open ? -118 : 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="b3d-lf b3d-top" />
            <div className="b3d-lf b3d-under" />
          </motion.div>
        </div>
      </div>

      <style>{`
        .b3d-scene{
          --w: clamp(168px, 27vw, 292px);
          --h: calc(var(--w) * 0.30);
          --d: calc(var(--w) * 0.66);
          width: var(--w); height: var(--h);
          perspective: 1200px;
        }
        .b3d-box{
          position:relative; width:var(--w); height:var(--h);
          transform-style:preserve-3d;
          transform: translateZ(-30px) rotateX(-22deg) rotateY(28deg);
        }
        .b3d-face{ position:absolute; top:50%; left:50%; transform-style:preserve-3d; box-sizing:border-box; }
        .b3d-front{
          width:var(--w); height:var(--h);
          transform: translate(-50%,-50%) translateZ(calc(var(--d)/2));
          background:linear-gradient(#163a5b,#0e2c47); border:2px solid #cdebfb;
          display:flex; align-items:center; justify-content:center;
        }
        .b3d-fronttext{ color:#fff; font-weight:800; letter-spacing:.5px;
          font-size: clamp(9px, 1.4vw, 14px); white-space:nowrap; }
        .b3d-fronttext b{ color:var(--orange,#ff7a18); }
        .b3d-back{ width:var(--w); height:var(--h);
          transform: translate(-50%,-50%) translateZ(calc(var(--d)/-2)) rotateY(180deg); background:#0c2438; }
        .b3d-right{ width:var(--d); height:var(--h);
          transform: translate(-50%,-50%) rotateY(90deg) translateZ(calc(var(--w)/2)); background:linear-gradient(#0c344f,#08202f); }
        .b3d-left{ width:var(--d); height:var(--h);
          transform: translate(-50%,-50%) rotateY(-90deg) translateZ(calc(var(--w)/2)); background:linear-gradient(#0c344f,#08202f); }
        .b3d-bottom{ width:var(--w); height:var(--d);
          transform: translate(-50%,-50%) rotateX(-90deg) translateZ(calc(var(--h)/2));
          background:#eaf7ff;
          background-image:
            repeating-linear-gradient(0deg,rgba(43,111,147,.12) 0 1px,transparent 1px 18px),
            repeating-linear-gradient(90deg,rgba(43,111,147,.12) 0 1px,transparent 1px 18px);
          box-shadow:inset 0 0 26px rgba(14,44,71,.4); }
        .b3d-hinge{ width:var(--w); height:var(--d);
          transform: translate(-50%,-50%) rotateX(90deg) translateZ(calc(var(--h)/2)); }
        .b3d-lid{ position:absolute; inset:0; transform-style:preserve-3d; transform-origin:bottom center; }
        .b3d-lf{ position:absolute; inset:0; backface-visibility:hidden; box-sizing:border-box; border-radius:2px; }
        .b3d-top{ background:#fff url('/images/box-cover.jpg') center/cover no-repeat;
          border:3px solid #fff; box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); }
        .b3d-under{ transform:rotateX(180deg);
          background:repeating-linear-gradient(45deg,#f4fbff 0 12px,#e6f5fe 12px 24px); border:3px solid #cdebfb; }
      `}</style>
    </div>
  );
}
