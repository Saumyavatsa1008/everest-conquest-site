# 🏔️ Everest Conquest — Official Website

A full-stack, 3D, animated marketing site for the **Everest Conquest** strategy board game.

Built with **Next.js 16 (App Router)**, **React Three Fiber** (3D mountain + falling snow),
**GSAP ScrollTrigger** (scroll-driven climb), scroll reveals, and **Tailwind CSS v4**.

---

## ▶️ Run it (the easy way)

Double-click **`START-WEBSITE.bat`**.
It installs everything on the first run, starts the server, and opens
<http://localhost:3000> in your browser. Keep the window open while you use the site.

## ▶️ Run it (manual)

```bash
npm install        # first time only
npm run dev        # start dev server  ->  http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

---

## 🧩 What's inside

| Section | Highlight |
| --- | --- |
| **Hero** | Real-time 3D Mount Everest (procedural low-poly peaks + live falling snow), drifting clouds, parallax |
| **Stats** | Count-up animations (8,848 m, 2–6 players, Ages 14+, 60–120 min) |
| **About** | The expedition pitch + three pillars |
| **The Climb** | GSAP scroll-driven route from Kathmandu → Summit with an ascending climber marker |
| **What's Inside** | Floating card deck + 3D tilt feature cards using your product photos |
| **How to Play** | Embedded how-to-play video + the four core rules |
| **Gallery** | Click-to-zoom lightbox of product images |
| **Get It** | Buy-on-Amazon + waitlist + newsletter (full-stack forms) |
| **Contact** | FAQ accordion + contact form (full-stack) |

## 🔌 Backend (full-stack)

Three API route handlers store submissions as JSON:

- `POST /api/preorder`  → `data/preorders.json`
- `POST /api/newsletter` → `data/newsletter.json`
- `POST /api/contact`   → `data/messages.json`

The `data/` folder is created automatically on the first submission (git-ignored).

> **Production note:** serverless hosts (Vercel) have a read-only file system, so the
> store falls back to a temp directory there. For durable production storage, replace the
> body of `readAll`/`append` in `src/lib/store.ts` with a real database — the rest of the
> app doesn't change.

## ☁️ Deploy to Vercel (free)

```bash
npm i -g vercel
vercel            # follow the prompts
```

Or push this folder to GitHub and "Import Project" at vercel.com. No config needed.

## ✏️ Editing content

All copy, stats, journey stops, rules, FAQ and image lists live in
**`src/lib/site.ts`** — edit there and everything updates.
Product images are in `public/images/`, the video in `public/video/`.
