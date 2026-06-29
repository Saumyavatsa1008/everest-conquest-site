"use client";

import { useState } from "react";
import { Check, Loader2, ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import { FAQ } from "@/lib/site";

type Status = "idle" | "loading" | "ok" | "error";

export default function Contact() {
  return (
    <section id="contact" className="topo relative px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
            Questions?
          </p>
          <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
            Frequently asked
          </h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <Faq key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-ice-200 bg-white shadow-soft">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-navy"
      >
        {q}
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-teal transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-navy-2/75">{a}</p>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("ok");
        setMsg(data.message);
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    }
  };

  if (status === "ok") {
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-3xl border border-ice-200 bg-white p-10 text-center shadow-card">
        <div className="gradient-orange mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl text-navy">Message sent!</h3>
        <p className="mt-2 text-navy-2/75">{msg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-ice-200 bg-white p-7 shadow-card sm:p-9">
      <h3 className="font-display text-2xl text-navy">Send us a message</h3>
      <div className="mt-6 space-y-4">
        <input
          required
          value={form.name}
          onChange={set("name")}
          placeholder="Your name"
          className="cf-input"
        />
        <input
          required
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="Your email"
          className="cf-input"
        />
        <textarea
          required
          value={form.message}
          onChange={set("message")}
          placeholder="How can we help?"
          rows={5}
          className="cf-input resize-none"
        />
      </div>
      {status === "error" && <p className="mt-4 text-sm font-semibold text-red-500">{msg}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="gradient-orange mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-[1.02] disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send message"}
      </button>

      <style jsx>{`
        :global(.cf-input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--ice-300);
          background: #fff;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: var(--navy);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.cf-input:focus) {
          border-color: var(--orange);
          box-shadow: 0 0 0 3px rgba(255, 122, 24, 0.15);
        }
      `}</style>
    </form>
  );
}
