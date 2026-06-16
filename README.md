# AURUM — Luxury Dental Clinic

A flagship, award-grade digital experience for a fictional ultra-premium dental clinic.
Built as a fully static, Netlify-ready Next.js 15 application with cinematic 3D, GSAP
scroll choreography, and a concierge-style booking flow.

> **Self-contained by design.** The 3D tooth is generated procedurally and lit by
> in-scene `Lightformer`s, so there are **no external GLB/HDRI fetches** — the site
> builds and runs fully offline and exports as static HTML.

---

## ✦ Tech Stack

| Layer            | Technology                                            |
| ---------------- | ----------------------------------------------------- |
| Framework        | Next.js 15 (App Router, `output: 'export'`)           |
| Language         | TypeScript                                            |
| Styling          | Tailwind CSS (custom luxury design system)            |
| 3D / WebGL       | Three.js · React Three Fiber · Drei                   |
| Motion           | GSAP + ScrollTrigger · Framer Motion                  |
| Smooth scroll    | Lenis (synced to the GSAP ticker)                     |
| Icons            | React Icons                                           |
| Fonts            | Cormorant Garamond (serif) + Inter (sans) via `next/font` |

---

## ✦ Project Structure

```
aurum-dental/
├── app/
│   ├── globals.css          # Design tokens, components layer, grain, scrollbar
│   ├── layout.tsx           # Fonts, metadata/SEO, SmoothScroll provider
│   ├── page.tsx             # Home — assembles every section
│   └── not-found.tsx        # Styled 404
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky nav + fullscreen mobile menu
│   │   └── Footer.tsx       # CTA, links, oversized wordmark
│   ├── providers/
│   │   └── SmoothScroll.tsx # Lenis + ScrollTrigger integration
│   ├── three/
│   │   ├── HeroScene.tsx    # Canvas, lighting, Lightformer environment
│   │   ├── Tooth.tsx        # Procedural pearlescent tooth sculpture
│   │   └── Particles.tsx    # Champagne dust particle field
│   ├── sections/
│   │   ├── Hero.tsx         # Cinematic 3D hero + entrance timeline
│   │   ├── Intro.tsx        # Philosophy + animated stat counters
│   │   ├── Services.tsx     # Interactive morphing service explorer
│   │   ├── Doctor.tsx       # Executive profile + scroll-drawn timeline
│   │   ├── Technology.tsx   # Product-launch showcase + hotspots
│   │   ├── Gallery.tsx      # Draggable before/after comparison slider
│   │   ├── Testimonials.tsx # Auto-advancing cinematic quotes
│   │   └── Booking.tsx      # 3-step concierge form (Netlify Forms ready)
│   └── ui/
│       ├── AnimatedText.tsx # GSAP word-mask reveal
│       ├── Reveal.tsx       # Framer in-view reveal
│       ├── Magnetic.tsx     # Magnetic hover wrapper
│       ├── SectionLabel.tsx # Editorial section eyebrow
│       ├── ScrollProgress.tsx
│       └── Cursor.tsx       # Trailing luxury cursor
├── hooks/
│   ├── useMousePosition.ts
│   ├── useReducedMotion.ts
│   └── useIsomorphicLayoutEffect.ts
├── lib/
│   ├── constants.ts         # All copy & data (single source of truth)
│   └── utils.ts             # cn, lerp, clamp, mapRange
├── next.config.js           # Static export config
├── netlify.toml             # Netlify build + headers + redirects
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ✦ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000

# 3. Production build (static export → ./out)
npm run build
```

The build emits a fully static site to `./out`.

---

## ✦ Deploy to Netlify

### Option A — Git (recommended)
1. Push this folder to a Git repository.
2. In Netlify: **Add new site → Import an existing project**.
3. Netlify auto-detects `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
4. Deploy. Done.

### Option B — Drag & Drop
```bash
npm run build
```
Then drag the generated **`out/`** folder onto the Netlify dashboard drop zone.

### Option C — Netlify CLI
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=out
```

---

## ✦ Booking Form (Netlify Forms)

The concierge form in `components/sections/Booking.tsx` is wired for **Netlify Forms**:
- A hidden static `<form name="consultation" data-netlify="true">` lets Netlify detect
  fields at build time.
- Submissions POST to `/` as `application/x-www-form-urlencoded`.
- Submissions appear under **Netlify → Forms → consultation**.

No backend required. If you deploy elsewhere, swap the `submit()` handler in `Booking.tsx`
for your own endpoint (e.g. Formspree, Resend, a serverless function).

---

## ✦ Customisation

- **All copy & data** live in `lib/constants.ts` — clinic name, services, timeline,
  technologies, cases, testimonials.
- **Palette & type scale** live in `tailwind.config.ts`.
- **3D sculpture** is tuned in `components/three/Tooth.tsx` (material + geometry).
  To use a real GLB model instead, drop it in `public/` and load with Drei's `useGLTF`.

---

## ✦ Performance Notes

- The WebGL `Canvas` is `dynamic`-imported with `ssr: false` and a black fallback, so it
  never blocks first paint.
- `PerformanceMonitor` + `AdaptiveDpr` automatically scale render resolution to the device.
- `prefers-reduced-motion` disables Lenis and heavy motion.
- Fonts are self-hosted via `next/font`; images are unoptimized (static export) — replace
  CSS-composed visuals with optimized assets in `public/` for production photography.

---

## ✦ Credits & Licensing

- **3D tooth** — generated procedurally in `components/three/Tooth.tsx` (no external
  model/asset, no third-party license to track).
- **Fonts** — Cormorant Garamond & Inter (Google Fonts, OFL), self-hosted via `next/font`.

---

© AURUM. Odontología con calidez en Buenos Aires.
