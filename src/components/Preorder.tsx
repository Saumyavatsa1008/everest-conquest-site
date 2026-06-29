"use client";

import { useState } from "react";
import { ShoppingCart, ShoppingBag, Check, Loader2, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

type Status = "idle" | "loading" | "ok" | "error";

export default function Preorder() {
  return (
    <section id="preorder" className="relative overflow-hidden bg-navy px-5 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(white_1px,transparent_1.5px)] [background-size:48px_48px]" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
          Begin Your Ascent
        </p>
        <h2 className="font-display mt-4 text-4xl sm:text-5xl">
          Get <span className="text-gradient-orange">Everest Conquest</span>
        </h2>
        <p className="mt-5 max-w-xl text-white/70">
          Available now on Amazon and Flipkart — order your copy and start your
          climb to the summit.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={SITE.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-orange flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-card transition-transform hover:scale-105 sm:w-auto"
          >
            <ShoppingCart className="h-5 w-5" /> Buy on Amazon
          </a>
          <a
            href={SITE.flipkartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2874f0] px-8 py-4 text-base font-bold text-white shadow-card transition-transform hover:scale-105 sm:w-auto"
          >
            <ShoppingBag className="h-5 w-5" /> Buy on Flipkart
          </a>
        </div>

        <div className="mt-12 w-full max-w-md">
          <NewsletterInline />
        </div>
      </div>
    </section>
  );
}

function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.ok ? "ok" : "error");
      setMsg(data.ok ? data.message : data.error);
    } catch {
      setStatus("error");
      setMsg("Network error.");
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white/60">
        Expedition newsletter
      </p>
      {status === "ok" ? (
        <p className="flex items-center gap-2 font-semibold text-gold">
          <Check className="h-5 w-5" /> {msg}
        </p>
      ) : (
        <form onSubmit={submit} className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-9 pr-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="gradient-orange rounded-full px-5 py-3 text-sm font-bold text-white disabled:opacity-70"
          >
            {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && <p className="mt-2 text-sm text-red-300">{msg}</p>}
    </div>
  );
}
