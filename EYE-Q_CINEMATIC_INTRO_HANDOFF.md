# Eye-Q Website — Cinematic Intro Rebuild + Strict B/W Apple Theme
## Execution brief for the next coding agent

---

## 0. How to use this document

This is a direct, execute-top-to-bottom brief. Repo: `Next.js 14.2 / React 18 / TypeScript / Tailwind 3 / Framer Motion / GSAP+ScrollTrigger / Lenis / @react-three/fiber`. It targets the actual files in this repo — every instruction below has been verified against the current codebase, not assumed.

**Two prior handoff docs already exist in the repo root** (`prompt.md` and `EYE-Q_APPLE_REDESIGN_HANDOFF.md`). Some of their asks are **already done** — verify before redoing:
- ✅ Design tokens consolidated into `tailwind.config.ts` (fontSize scale, `rhythm-*` spacing all present).
- ✅ Custom SVG icon set exists (`src/components/icons.tsx`); zero emoji remain in `LiveDemo.tsx` (verified by repo-wide grep).
- ✅ `CanvasScrub.tsx` already uses `forwardRef` + `useImperativeHandle` correctly (the ref-plumbing bug described in the old handoff is fixed — `LiveDemo.tsx`'s `StateGlasses`/`StateWatch` correctly call `scrubRef.current?.scrubTo(frame)`).
- ✅ Live Demo is already scroll-driven via `ScrollTrigger.create({ pin, scrub })`, not click-gated, and already sits mid-page (`Hero → Problem → Idea → LiveDemo → USP → TargetAudience → PhoneFirst → OfflineFirst → BuildStatus → Team → Footer`).

**Still open / not done** (confirmed by direct file inspection — this is what this document is actually about):
- ❌ There is no cinematic full-bleed opening sequence. `Hero.tsx` is a single static section with a background PNG, not the "specs backdrop → watch backdrop → side-by-side + phone" opening the requester wants.
- ❌ The site is **not** black/white. `tailwind.config.ts` / `globals.css` define `teal (#1c8267)`, `teal-light (#24a883)`, `amber (#b9862f)` as active, frequently-used colors — teal text gradients, teal glows, teal buttons, teal progress bars are everywhere. This must be stripped to a true Apple-style near-black/white monochrome system.
- ❌ `Team.tsx` still ships literal placeholder content (`Team Member 1`, bare `linkedin.com`/`github.com` links ×3). `Footer.tsx` still ships placeholder links for GitHub Repo / Demo Video / Architecture Doc.
- ❌ `Hero.tsx` background image (`public/phone-hero.png`, 1376×768) is a generic AI-rendered phone-with-glowing-circuit graphic, not real/convincing iQOO 15 product photography — it is currently reused 3× across the site (Hero, PhoneFirst, LiveDemo) and is the weakest asset in the repo.

---

## 1. The core ask — cinematic opening sequence (highest priority, this is the main deliverable)

Replace the current static `Hero.tsx` with a **three-act, scroll-pinned cinematic opener** that plays before any other content, styled like an Apple product film (think iPhone/Vision Pro launch page), using assets **already in the repo** — no new video/3D work required, only restructuring.

### Available assets (verified present, do not re-source)
- `public/sequences/glasses/glasses_001.jpg` … `glasses_070.jpg` — 70-frame scrub sequence, 1280×720 each.
- `public/sequences/watch/watch_001.jpg` … `watch_070.jpg` — 70-frame scrub sequence, 1280×720 each.
- `public/videos/glasses-orbit.mp4`, `public/videos/watch-orbit.mp4` — already used as the mobile fallback in `CanvasScrub.tsx` when `window.innerWidth < 768`.
- `src/components/demo/CanvasScrub.tsx` — reusable, working, scroll/imperative-ready scrub component (`forwardRef` + `useImperativeHandle`, exposes `scrubTo(frame)`). **Reuse this component directly** for both acts below; do not fork or rebuild it.
- `public/phone-hero.png` — current phone asset. **Flagged as sub-par** (see §3.1) — swap it as part of this work, don't build the intro around a weak hero image.

### Act structure (build as one new component, e.g. `src/components/sections/CinematicIntro.tsx`, replacing `Hero.tsx` as the first thing rendered in `page.tsx`)

**Act 1 — Specs (glasses) as full-bleed backdrop**
- `CanvasScrub sequence="glasses" frameCount={70}` rendered **full-viewport** (`w-full h-screen`, `object-cover`-equivalent — `CanvasScrub`'s internal `drawFrame` already does cover-fit math, just size the container to `100vh`/`100vw`), not the current constrained `max-w-[500px]` card treatment used in `LiveDemo.tsx`.
- Pin this act with `ScrollTrigger` (`pin: true, scrub: 0.6`) across roughly the first `100–150vh` of scroll. Map scroll progress directly to `scrubRef.current.scrubTo(progress * 69)` — i.e., the frame sequence should be **scroll-driven**, not auto-looping on a `setInterval` the way `LiveDemo.tsx`'s `StateGlasses`/`StateWatch` currently do it. This is the single most important interaction change: scrubbing tied to the user's scroll gesture is what makes it read as an Apple product film instead of a looping GIF.
- Overlay copy, kept minimal per Apple restraint: a short eyebrow line (e.g. `IQOO HACKATHON 2026 · PHONE-FIRST AI`) and one line introducing the wearable form factor, both fading out as the act completes so the visual stays dominant. Do not stack more than 2 short text elements over this frame.

**Act 2 — Watch as full-bleed backdrop**
- Same pattern, `CanvasScrub sequence="watch" frameCount={70}`, its own pinned `ScrollTrigger` segment immediately following Act 1 (roughly the next `100–150vh`).
- Transition between Act 1 → Act 2 should be a clean opacity/scale crossfade driven by the same scroll timeline, not a hard cut and not a route/section change — the two acts should feel like one continuous film reel.
- Overlay copy: one short line establishing "same brain, different form" (this idea already exists as caption text in `LiveDemo.tsx`'s `states` array at `id: 2` — reuse/adapt that line rather than inventing new copy from scratch).

**Act 3 — Side-by-side reveal + phone hero + quote (the "punchline" frame)**
- Both scrub sequences settle to their **final frame** (frame 70/glasses, frame 70/watch) and animate from full-bleed down into two smaller side-by-side panels (CSS grid or flex, roughly 40/40vw with a gap, both vertically centered) — a scale+reposition transition, not a fade-and-replace.
- Between/behind them, bring in the iQOO 15 product image (see §1.1 below for exactly which image) as the visual anchor — this is the "phone first" payoff after two wearable-form acts.
- Below or beside the trio, set one strong pull-quote line establishing the phone-first thesis. Do not fabricate a quote and attribute it to a real person or to iQOO/vivo (see copyright/misattribution rule in §5). Use an **unattributed original tagline** in Eye-Q's own voice instead — this repo already has strong, on-brand lines to draw from or adapt, e.g. the existing Hero headline *"Your phone was always smart enough"* or the existing LiveDemo closing caption *"Eye-Q. Proof that a phone alone can give someone their independence back."* Pick one, or write one new short original line in the same voice — large type (`text-hero` or `text-section` scale), centered, single accent word treatment maximum (see §2 for what "accent" means in the new B/W system).
- End this act with the existing `See it work` CTA (currently in `Hero.tsx`), scrolling to `#live-demo` as it does today.

### §1.1 — iQOO 15 product image sourcing (flagged decision point, do not skip)

The requester asked for "iQOO 15 best image from the web or from the available media." Two real options — **do not silently pick one**, surface this choice to the requester before finalizing:

1. **Use the existing in-repo asset** (`public/phone-hero.png`) — fastest, zero licensing risk, but it is a generic AI-rendered phone graphic, not real iQOO 15 photography, and is explicitly flagged as the weakest asset in the repo by the prior handoff doc (`prompt.md §3`). Using it here undercuts the exact "premium Apple showcase" effect this section is meant to deliver.
2. **Source official iQOO 15 press imagery.** iQOO 15 is a real, currently-shipping flagship (Snapdragon 8 Elite Gen 5, launched globally starting Nov 2025/India Nov 26) with an official product page and press kit at `https://www.iqoo.com/en/products/iQOO-15` (or the India variant `iqoo.com/in/products/param/iqoo15`) and official launch photography from PRNewswire/iQOO's own press materials. **Do not scrape or hotlink random web images** — go to iQOO's own product/press pages, confirm usage rights for a hackathon/non-commercial student project (or get explicit written permission — this is a real brand, not a fictional one), and download a studio product shot with the same lighting language as Apple keynote hero shots (single key light, near-black background, sharp reflection). If usage rights can't be confirmed in time, fall back to option 1 but flag it as a known compromise, don't silently ship a possibly-unlicensed brand photo.

**Recommendation**: pursue option 2 first since this is explicitly a phone-first, phone-brand-sponsored hackathon submission — showing the actual real device will land far better than an AI-rendered stand-in — but get sign-off on licensing before shipping it live.

---

## 2. Apple black/white theme conversion (repo-wide, mandatory, second priority)

Current theme is **not** black/white — it's near-black with an active teal/amber accent system used throughout. Convert to genuine Apple grammar: near-black + white/warm-white only, with at most one restrained accent used sparingly for interactive/data elements.

### 2.1 Token changes — `tailwind.config.ts`
Current:
```ts
'near-black': '#0a0a0a',
'dark-teal': '#0f2f2b',
'teal': '#1c8267',
'teal-light': '#24a883',
'amber': '#b9862f',
'warm-white': '#f7f5f2',
```
Action: keep `near-black` and `warm-white` as the two base tones (this already matches Apple's off-black/off-white pairing — don't change these two). Replace the teal/amber system with a genuine near-monochrome ramp plus **one** small accent, e.g.:
```ts
'near-black': '#0a0a0a',
'warm-white': '#f7f5f2',
'graphite': '#1d1d1f',   // Apple's actual dark UI gray — use for elevated surfaces instead of dark-teal
'silver': '#86868b',      // Apple's actual secondary-text gray — use instead of teal for de-emphasized copy
'accent': '#1c8267',      // keep ONE accent color (or swap for pure white-on-black if the requester wants zero color at all — flag this choice, see §2.3)
```
Then repo-wide find/replace `teal`/`teal-light`/`dark-teal`/`amber` class usages (`text-teal`, `bg-teal/…`, `border-teal/…`, `text-gradient-teal`, `.tag-optional` amber styling, etc.) — grep confirms these appear in: `Hero.tsx`, `Idea.tsx`, `PhoneFirst.tsx`, `OfflineFirst.tsx`, `Footer.tsx`, `LiveDemo.tsx`, `globals.css` (`.text-gradient-teal`, `.btn-primary`, `.tag-optional`, progress bar, active nav dot), `ParticleField.tsx`. Do this as one pass with `grep -rn "teal\|amber" src/` to catch every instance — do not rely on memory of which files use it.

### 2.2 `globals.css`
`:root` currently defines `--color-teal`, `--color-teal-light`, `--color-amber` as raw hex, duplicated from `tailwind.config.ts` (already flagged as a drift risk in `prompt.md §2` — this conversion is the moment to actually fix that duplication, not just rename it). Update the CSS custom properties to match the new token set above and audit every raw `rgba(28, 130, 103, …)` (that's teal's RGB) hardcoded inline style across the section components (`Hero.tsx`, `PhoneFirst.tsx`, `LiveDemo.tsx` all have inline `style={{ background: 'radial-gradient(…rgba(28,130,103…))' }}`) — these won't be caught by a Tailwind class grep, search for the literal RGB triplet too.

### 2.3 — Flag this decision explicitly to the requester before executing
"Apple brand theme colors" most commonly means **near-black / white / one restrained gray scale, zero saturated accent color at all** (see apple.com's actual product pages — CTAs are white-on-black or black-on-white, not colored). The current repo's single-accent-teal approach is closer to how Vision Pro's page uses a hint of blue, which is defensible but is a **design decision, not a neutral default**. Recommend confirming with the requester: (a) true zero-color monochrome, or (b) monochrome base + one small restrained accent for interactive elements (buttons, active states, data highlights) as outlined above. Do not assume — pick (b) only if no answer is given, since a 100%-gray UI with zero focal color can hurt usability for CTAs/links, but note this is a judgment call, not fact.

---

## 3. Other required fixes — flagged without bias, in priority order

These are called out because they materially affect quality/credibility and were found during this pass, not because the requester asked for each by name.

### 3.1 — P0: Placeholder content still in production code
- `src/components/sections/Team.tsx`: all three members are literal `Team Member 1/2/3`, roles are generic, `linkedin`/`github` fields point to bare `https://linkedin.com` / `https://github.com` (not real profile URLs) for all three entries.
- `src/components/sections/Footer.tsx`: `GitHub Repo`, `Demo Video`, `Architecture Doc` links point to bare `github.com` / `youtube.com` / `docs.google.com`, not real URLs.
- **This blocks shipping regardless of visual polish.** Get real names/roles/profile URLs and real repo/demo/doc links from the requester before this section can go live. If headshots exist, use them (consistent crop/grade) instead of icon-avatar placeholders — this alone will read far more premium.

### 3.2 — P1: `phone-hero.png` reuse across 3 sections
Beyond the Act 3 sourcing question in §1.1, this same image is reused unchanged in `PhoneFirst.tsx` and twice more in `LiveDemo.tsx` (`StatePhoneReveal`, `StateClose`). If it gets replaced for the cinematic intro, replace it everywhere it's used for visual consistency — don't end up with a premium new hero image next to the old AI-rendered one three scrolls later.

### 3.3 — P1: Auto-looping scrub in `LiveDemo.tsx` should also become scroll/drag-driven
`StateGlasses`/`StateWatch` inside `LiveDemo.tsx` currently auto-loop the same 70-frame sequences on a fixed `setInterval(…, 80)` — a flipbook, not an interactive product view. Once Act 1/2 of the new intro proves out scroll-linked scrubbing (§1), apply the same scroll-linked (or pointer-drag) pattern here for consistency, so the two places in the site that use `CanvasScrub` behave the same way. Low effort since the underlying component already supports it via `scrubTo`.

### 3.4 — P2: Performance — two new full-viewport 70-frame preloads
The intro will preload 140 JPEGs total (70 glasses + 70 watch) at full-bleed resolution before the page even begins normal scroll — on top of whatever `LiveDemo.tsx` already preloads for the same sequences later on the page. Recommendations:
- Share a single preload/cache across both usages (intro + `LiveDemo`) rather than loading the same 140 images twice — consider lifting the `<img>` preload into a shared context/hook keyed by `sequence` name instead of each `CanvasScrub` instance loading its own copy.
- Confirm the mobile fallback (`isMobile` branch in `CanvasScrub.tsx`, already present) applies to the new full-bleed intro sizing too — at `100vh` height instead of `aspect-video`, verify the mobile `<video>` fallback still looks intentional, not stretched.
- Show a real loading state for the intro specifically (a branded loader, not the current generic spinner) since this is now the very first thing a visitor sees — a blank flash before 70 images finish loading would be a bad first impression.

### 3.5 — P2: `prefers-reduced-motion`
Any new pinned/scrubbed `ScrollTrigger` timeline must respect `prefers-reduced-motion` the same way `LiveDemo.tsx` already does (`if (prefersReducedMotion) return` before creating the trigger). For the new cinematic intro specifically, decide and implement a static fallback (e.g., show Act 3's settled frame directly, skip Acts 1–2 pinning) rather than leaving reduced-motion users on a half-broken pin.

### 3.6 — P2: Navbar overlap
`Navbar.tsx` renders fixed/sticky above `<main>` in `layout.tsx` for every page including the new full-bleed intro. Verify the navbar reads correctly (transparent or blurred backing) over three different full-bleed frame images rather than clashing, and that its `navLinks` scroll-spy IDs still resolve correctly once `Hero.tsx` is replaced (its section `id`s are referenced by `Navbar.tsx`'s `IntersectionObserver` — if the new component changes the `id="hero"` anchor or removes it, check nothing else links to `#hero`).

---

## 4. File-by-file task list

| File | Change |
|---|---|
| `src/components/sections/CinematicIntro.tsx` (new) | Build the 3-act sequence described in §1, replacing `Hero.tsx`'s role as the first section. |
| `src/components/sections/Hero.tsx` | Either delete and fully fold its content/CTA into `CinematicIntro.tsx`'s Act 3, or keep as a thin wrapper — pick one, don't leave duplicate hero logic in two files. |
| `src/app/page.tsx` | Swap `<Hero />` for `<CinematicIntro />` as the first rendered section. |
| `src/components/demo/CanvasScrub.tsx` | No structural change needed — reuse as-is for the intro. Only touch if implementing the shared-preload-cache optimization in §3.4. |
| `src/components/demo/LiveDemo.tsx` | Apply scroll/drag-driven scrubbing to `StateGlasses`/`StateWatch` per §3.3; update any teal color usage per §2. |
| `tailwind.config.ts` | Token conversion per §2.1. |
| `src/app/globals.css` | Token/CSS-var conversion per §2.2; audit hardcoded teal RGB triplets. |
| `src/components/sections/PhoneFirst.tsx` | Update `phone-hero.png` reference if replaced (§3.2); remove teal-tinted radial glow per §2. |
| `src/components/ParticleField.tsx` | Confirm color usage matches new monochrome token set. |
| `src/components/sections/Team.tsx` | **Blocked on real data** — see §3.1. |
| `src/components/sections/Footer.tsx` | **Blocked on real links** — see §3.1. |
| `public/phone-hero.png` | Replace per §1.1 decision (requester sign-off needed on licensing route). |

---

## 5. Guardrails while executing

- Do not fabricate a quote and attribute it to a real person, to iQOO, or to vivo. Use an original Eye-Q-voice line (§1, Act 3) or a clearly-marked, verified official iQOO tagline if one is sourced from their real press materials — never invent one and present it as theirs.
- Do not silently pick between the two `phone-hero.png` sourcing options in §1.1 — that's a licensing/brand-usage decision, surface it.
- Do not silently pick between "zero-color monochrome" vs. "monochrome + one accent" in §2.3 — surface it, default to the accent version only if unanswered.
- Keep all narrative copy already written in `LiveDemo.tsx`'s `states` array and `Hero.tsx`'s existing headline — reuse/adapt, don't rewrite from scratch; it's already good per the prior handoff's own assessment.
- Test the finished intro by actually scrolling through it (not just visually inspecting a static screenshot) before calling this done — this repo has shipped visually-plausible-but-functionally-broken scroll interactions before (see the now-fixed bug documented in `EYE-Q_APPLE_REDESIGN_HANDOFF.md §2`).

## 6. Acceptance checklist

- [ ] Landing on the site, the very first thing visible is the glasses scrub sequence full-bleed, responding to scroll (not auto-looping).
- [ ] Continuing to scroll transitions cleanly into the watch scrub sequence full-bleed.
- [ ] Continuing to scroll resolves into glasses + watch side-by-side with the iQOO 15 image and one strong original tagline, then the existing `See it work` CTA.
- [ ] No teal/amber colors remain anywhere in the site outside of whatever single accent was agreed in §2.3; base palette is near-black/white throughout.
- [ ] Team and Footer either ship real data or are explicitly still marked as blocked/pending in the handoff back to the requester — not silently left as placeholders.
- [ ] Reduced-motion users get a sensible static fallback for the new intro.
- [ ] Mobile shows the existing `-orbit.mp4` fallback treatment at full-bleed sizing, not stretched/cropped incorrectly.
- [ ] No performance regression from double-loading the same 140 frames (intro + LiveDemo) unless explicitly deferred as a follow-up.
