# Eye-Q Website — Apple-Level Redesign Handoff

## 0. How to use this document
This is a direct execution brief for a coding agent. Every section below maps to real files in this repo (`Next.js 14 / App Router / TypeScript / Tailwind / Framer Motion / GSAP / R3F`). Work top-to-bottom by phase. Each issue has: **what's wrong → why it breaks the "Apple" feel → exact fix → files to touch**. Do not redesign the information architecture — the section order and copy are fine. This is a *craft and polish* pass, not a rewrite.

**Stack recap (already in repo, don't change unless noted):**
- Next.js 14.2, React 18, TypeScript, Tailwind 3
- Fonts: Space Grotesk (headline) + Inter (body), loaded via `@import` in `globals.css`
- Motion: Framer Motion (LiveDemo, micro-interactions) + GSAP/ScrollTrigger (`ScrollReveal.tsx`) + Lenis (smooth scroll, `LenisProvider.tsx`)
- 3D: `@react-three/fiber` for `ParticleField.tsx`
- Design tokens exist but are **duplicated and drifting**: `src/lib/design-tokens.ts` (unused JS object) vs `tailwind.config.ts` (actually used) vs raw hex in `globals.css` `:root`. Three sources of truth for the same 8 colors — this is the first thing to fix (§1).

---

## 1. Root cause: why this doesn't feel premium yet

Apple's site works because of **restraint applied consistently**: one accent color used sparingly, one type system with a strict scale, generous and *consistent* whitespace rhythm, cinematic photography with no baked-in text, and motion that's felt more than seen. Going through this codebase, the gaps are:

1. **Imagery is the single biggest problem.** The visual assets are inconsistent in style and several are actively anti-premium:
   - `public/phone-hero.png` (used in Hero, PhoneFirst, LiveDemo) is a generic AI-generated "phone with glowing circuit board" render — not a real iQOO 15, doesn't look like real product photography, reads as stock/AI art next to real photography elsewhere. This is the **hero image** — first impression — and it undercuts credibility immediately.
   - `public/problem-solution.jpeg` is a baked marketing infographic (headline text, price tags, icon bullet lists, comparison callouts *rendered into the image itself*). Apple never ships imagery with UI/text baked in — everything is live text over clean photography. This image is used full-width in the `Problem` section and looks like a hackathon pitch-deck slide dropped into a website.
   - `public/accessibility-illustration.jpeg` is a flat-illustration style, while `public/lifestyle.png` is photorealistic. Mixing illustration and photography styles in the same two-card grid (`TargetAudience.tsx`) reads as inconsistent/unfinished.
   - `public/product-lineup.jpeg` and `public/lifestyle.png` are genuinely good — high production value, correct lighting, editorial framing. Use these as the *bar* for every other image.
   → **Fix direction:** replace/regenerate `phone-hero.png` and `problem-solution.jpeg`; regenerate or restyle `accessibility-illustration.jpeg` to match photographic treatment; see §3 for exact specs.

2. **No consistent spatial rhythm.** `spacing.sectionPadding` exists as a token (`clamp(120px, 15vw, 220px)`) but several sections eyeball their own gaps (`gap-16`, `mb-20`, `mt-16`) with no shared vertical rhythm scale. Apple's sections feel intentional because spacing steps follow a strict scale (e.g. 8/16/24/40/64/96/160). Right now spacing is "roughly fine" instead of "precise."

3. **Type scale is good on paper, inconsistently applied.** `text-hero`, `text-section`, `text-subheadline`, `text-eyebrow` are defined in Tailwind config — good. But body copy sizes are hardcoded ad hoc per component (`text-lg`, `text-[16px]`, `text-[15px]`, `text-[14px]`) instead of pulling from a shared scale. Apple's type system has ~6 sizes total, used with zero deviation.

4. **Motion is decorative, not purposeful.** `ScrollReveal` fades everything up by 60px on every section with near-identical timing — it becomes wallpaper rather than emphasis. Apple uses restrained, varied motion: large hero text often has no reveal at all (it's just there), while a specific number or product shot gets a signature moment. Right now every single block gets the same treatment, so nothing feels special.

5. **Glass/glow effects are applied inconsistently and can look "gamer-RGB" rather than premium.** `.glow-teal` (a 60px+120px teal box-shadow bloom) is used on the `Problem` section image and pulsing borders in `PhoneFirst`. Apple almost never uses colored glow/bloom on static content — glow reads as "gaming laptop," not "Apple." Where used, it should be extremely subtle (opacity ≤0.08, no double-layered shadow) or removed in favor of clean drop shadows.

6. **Copy hierarchy competes with itself.** Several headlines split into `text-warm-white` + `text-gradient-teal` spans (Hero, Idea, PhoneFirst, OfflineFirst, Footer) — a good Apple pattern *when used once per page for the single most important line*. Here it's used 6+ times, so the color emphasis stops meaning anything.

7. **Unfinished placeholder content ships in the current build**: `Team.tsx` has literal `[TEAM MEMBER 1 NAME]` / `[ROLE]` and `href="#"` socials; `Footer.tsx` has `href="#"` for GitHub Repo / Demo Video / Architecture Doc. These read immediately as "unfinished hackathon project," which is the opposite of "polished product site" regardless of how good the CSS is.

8. **Live Demo section (`LiveDemo.tsx`, 620 lines) is functionally the most complex part of the site but visually the least "Apple."** It uses emoji as icons (`☕ Coffee cup`, `📸 Take a photo`), which instantly reads as prototype/hackathon rather than shipped product. Apple never uses emoji in UI chrome — always custom line icons (like the ones already hand-drawn in `Navbar.tsx` and `Idea` section's checkmark icon).

---

## 2. Design tokens — fix the source of truth first

**Problem:** `src/lib/design-tokens.ts` is dead code (nothing imports it — verify with a repo-wide search before deleting). Real values live in `tailwind.config.ts` `theme.extend` and are re-declared as raw hex again in `globals.css` `:root`. Any future color/spacing change requires editing 2–3 places and they can drift out of sync (they already have slightly different amber values: `#b9862f` vs `#d4a243` used inconsistently).

**Action:**
1. Delete `src/lib/design-tokens.ts` if confirmed unused (`grep -r "design-tokens" src/`).
2. Make `tailwind.config.ts` the single source of truth for color/spacing/type tokens.
3. In `globals.css`, keep only the CSS custom properties Tailwind *can't* express as utility classes (e.g. values used inside raw `background: linear-gradient(...)` in `.text-gradient-teal`) — derive those from the same hex values as `tailwind.config.ts`, with a comment noting they must stay in sync.
4. Add two new tokens to `tailwind.config.ts` `theme.extend.spacing` for a real 8-point rhythm scale so every section can stop hardcoding `mb-16`, `mb-20`, `gap-16` etc.:
   ```ts
   spacing: {
     ...(existing),
     'rhythm-xs': '16px',
     'rhythm-sm': '24px',
     'rhythm-md': '40px',
     'rhythm-lg': '64px',
     'rhythm-xl': '96px',
     'rhythm-2xl': '160px',
   }
   ```
5. Refactor body-copy font sizes into the Tailwind `fontSize` scale (currently only `hero`, `section`, `subheadline`, `eyebrow` exist). Add:
   ```ts
   fontSize: {
     ...(existing),
     'body-lg': 'clamp(17px, 1.3vw, 19px)',
     'body': 'clamp(15px, 1.05vw, 16px)',
     'body-sm': '14px',
     'caption': '12px',
   }
   ```
   Then replace every hardcoded `text-lg`, `text-[16px]`, `text-[15px]`, `text-[14px]`, `text-[13px]` in section components with the matching scale token so the whole site pulls from one ruler.

---

## 3. Imagery pass (highest priority — do this before any CSS polish)

| File | Used in | Problem | Required fix |
|---|---|---|---|
| `public/phone-hero.png` | `Hero.tsx` (full-bleed bg), `PhoneFirst.tsx`, `LiveDemo.tsx` (×2) | Generic AI-rendered phone silhouette with glowing circuit-board screen; doesn't read as a real iQOO 15; looks like a stock "AI chip" image, not a hero product shot | Replace with a real or convincingly real studio product shot of an iQOO 15 (dark background, single dramatic rim-light, phone at a slight angle, screen showing an actual Eye-Q UI mock — not an abstract chip graphic). If a physical device isn't available, commission/generate a photoreal 3D render matching Apple keynote hero-shot lighting: single key light top-left, soft reflection below, pure black-to-near-black background, no lens flare, no glowing circuitry motif on the screen |
| `public/problem-solution.jpeg` | `Problem.tsx` (full-width, 16:9, has `.glow-teal`) | Baked-in headline text, price tag graphic, bullet icon list, "ONE CORE. MULTIPLE MODES." footer strip — this is a finished infographic slide, not a photograph. Never usable as premium web imagery because the text can't be re-typeset, isn't accessible, and doesn't match on-page type | Stop using this file as a section image entirely. Rebuild `Problem.tsx` as **live HTML/Tailwind**, not an image: keep the two big headline lines already in the component (`The real fix isn't new hardware.` / `It's smarter use of the phone already in your hand.`), and in between render either (a) a clean side-by-side comparison built from `product-lineup.jpeg`-style real photography with live text captions, or (b) a minimal custom SVG/line-diagram (glasses price tag vs. modular sensor) drawn in the site's own line-icon language (see `Navbar` logo mark and `OfflineFirst` info icon for the existing icon style to match) |
| `public/accessibility-illustration.jpeg` | `TargetAudience.tsx` (paired against `lifestyle.png` in a 2-col grid) | Flat vector-illustration style clashes with the photoreal `lifestyle.png` right next to it | Either (a) regenerate as photoreal editorial photography matching `lifestyle.png`'s lighting/color grade (soft neutral interior or outdoor daylight, real person, teal-accent wardrobe/prop only), or (b) if illustration must stay, restyle `lifestyle.png` down to match a matching illustration style — but photography is the stronger direction since 80% of the site's other imagery is photographic |
| `public/lifestyle.png`, `public/product-lineup.jpeg` | `TargetAudience.tsx`, `LiveDemo.tsx` intro | Good — keep as the visual quality bar | No change needed |
| `public/kannada-sign.jpeg` | `LiveDemo.tsx` FeatureOCR | Fine, functional, low visual weight in a phone-mockup frame | No change needed |
| `public/section-divider.png`, `Section divider texture.png`, `Ambient particle texture.png`, `particle-reference.png` | Background textures at low opacity | Verify these aren't adding visible noise/grain that reads as "cheap"; if they contain any visible pattern repeat or JPEG artifacting at the low opacities used (`opacity-20`–`opacity-40`), replace with a subtle radial-gradient CSS vignette instead of a raster texture — cheaper to render and guaranteed noise-free | Audit visually at real opacity in browser; likely simplify to CSS gradients |
| Multiple unused `WhatsApp Image *.jpeg` files in `/public` | Not referenced in any `.tsx` (confirm with `grep -rl "WhatsApp" src/`) | Dead weight in the repo, bad practice, bloats deploy | Delete unused files from `/public` after confirming zero references |

**General imagery rules to apply everywhere:**
- No baked-in text/UI in any photographic asset — all copy must be live HTML.
- No emoji used as iconography anywhere (see §6).
- Every photographic asset should sit on the same color grade family: desaturated warm neutrals + the site's teal, consistent with `lifestyle.png` and `product-lineup.jpeg`.
- Compress/convert all `public/*.png` product shots to optimized `.webp` (phone-hero.png is 616K, lifestyle.png is 1.5MB, section-divider.png is 1.1MB — these are heavy for a scroll-driven site with Lenis smooth-scroll; large paint costs will cause jank). Use `next/image` (already in use) but confirm `sizes` props are correct on every instance and add `priority` only on true above-the-fold images (currently only `Hero.tsx` has it — correct, leave as-is; double check no other component wrongly sets `priority`).

---

## 4. Component-by-component fix list

### `src/app/globals.css`
- Move the `@import url('https://fonts.googleapis.com/...')` for Google Fonts to `next/font/google` instead (Next.js 14 supports this natively and it's already partially set up — note `src/app/fonts/GeistVF.woff` / `GeistMonoVF.woff` exist in the repo but are **unused**, from the default Next.js template, and should be deleted since the site uses Space Grotesk/Inter, not Geist). Using `next/font` removes the render-blocking `@import`, self-hosts the fonts, eliminates FOUC/CLS from the Google Fonts CDN roundtrip, and is a meaningful, measurable "feels premium" fix (Apple's site never has visible font-swap flash).
- Reduce `.glow-teal` intensity: current `0 0 60px rgba(28,130,103,0.15), 0 0 120px rgba(28,130,103,0.05)` reads as a bloom/glow effect (gaming aesthetic). Change to a single, tight, low-opacity shadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 1px rgba(28,130,103,0.2)` — shadow should ground the element, not make it glow.
- `.btn-primary` hover uses a colored box-shadow glow too (`0 0 30px rgba(28,130,103,0.3)`) — soften to a subtle lift only (`transform: translateY(-1px)` is good, keep; drop or heavily reduce the glow opacity to ~0.12 max).

### `src/components/Navbar.tsx`
- Logo mark (concentric circles SVG) is genuinely nice — keep.
- Nav links use `text-[14px] text-warm-white/50` — fine, but add an active-section indicator (a small underline or dot) driven by scroll position/IntersectionObserver so users always know where they are on the page — small detail, high perceived polish.
- The scrolled-state background (`bg-near-black/90 backdrop-blur-xl`) is correct Apple pattern (translucent blurred nav) — keep, just confirm `backdrop-blur-xl` renders smoothly (test on Safari/iOS — backdrop-filter perf can vary).

### `src/components/sections/Hero.tsx`
- Replace `phone-hero.png` per §3.
- Headline is good: `Your phone was always smart enough.` — one accent span, correct restraint. Keep this pattern as the reference for how gradient-text spans should be used elsewhere (i.e., dial back gradient text usage in *other* sections to match this level of restraint).
- `ParticleField` overlay at `opacity=0.25` — test whether it's additive or distracting against the new hero image; if the new hero photography is dramatic enough on its own, consider removing the particle field from Hero entirely (reserve it for `Idea`/`PhoneFirst` only) — Apple hero sections are almost always static/clean, motion is reserved for scroll-triggered reveals, not ambient background animation on the very first screen.

### `src/components/sections/Problem.tsx`
- Full rebuild per §3 — remove the baked-infographic image, replace with live-coded comparison content.
- Remove `.glow-teal` from this section once it's no longer a single big image block (glow was compensating for a flat image; a well-composed live layout won't need it).

### `src/components/sections/Idea.tsx`
- Fine as-is structurally. Reduce `ParticleField` opacity slightly (0.15 → 0.08–0.10) so it reads as ambient texture, not a visible animated element competing with the headline.

### `src/components/sections/USP.tsx`
- Three-column feature grid with text only — very "Apple feature grid" already. Add a small custom line-icon (16–20px, teal stroke, matching the `Navbar` logo and `OfflineFirst` info-icon style) above each of the three headlines. Right now it's text-only, which is fine but a one-line icon per card will lift perceived craft substantially for very little effort. Do **not** use emoji.

### `src/components/sections/TargetAudience.tsx`
- Fix the illustration/photography mismatch per §3.
- `group-hover:scale-105` image zoom on hover is a nice Apple-catalog touch — keep, but slow the duration slightly (`duration-700` → `duration-1000`, `ease-out`) so it feels closer to Apple's very slow, deliberate hover zooms rather than a quick pop.

### `src/components/sections/PhoneFirst.tsx`
- Remove `animate-pulse-glow` ring around the phone image (`bg-teal/5 animate-pulse-glow`) — pulsing glow rings read as "loading spinner" / sci-fi UI, not premium product photography. A static, very subtle radial gradient behind the phone (no animation) will look calmer and more expensive.
- Background `section-divider.png` at `opacity-40` layered with `bg-near-black/60` — check this doesn't create visible muddy/noisy midtones; consider replacing with a CSS radial gradient per §3.

### `src/components/sections/OfflineFirst.tsx`
- Good — the amber callout box for the one online-dependent feature is a nice, honest, restrained detail. No major changes; just make sure amber usage here is the *only* place amber appears prominently (it currently also appears in `tag-optional` in LiveDemo — confirm that's intentional and not accidental over-use of a second accent color. Apple sites use one accent color at a time per context; amber-as-secondary-accent is fine but should stay rare).

### `src/components/sections/BuildStatus.tsx`
- This section ("Researched & validated" vs "Built in the 30 hours") is inherently hackathon-status content, not customer-facing product marketing. Confirm with stakeholder whether this section should even ship on a "premium product site" — if the intent is to impress hackathon judges, keep it; if the intent is a general-audience premium landing page, consider moving this to a separate `/behind-the-scenes` route or footer link so the main scroll stays pure product storytelling. Flag this decision back to the requester rather than assuming.

### `src/components/sections/Team.tsx`
- **Blocking issue, not a style issue:** `[TEAM MEMBER 1 NAME]`, `[ROLE]`, and `href="#"` are literal placeholders shipping to production. This must be filled with real names/roles/links before this is presentable at all, regardless of CSS polish. Flag as P0.
- Once real data is in, keep the current layout — placeholder avatar circle with person-icon is a clean fallback if photos aren't available, but real headshots (grayscale, consistent crop/lighting) will look far more premium than icon avatars. Recommend real photography if available.

### `src/components/sections/Footer.tsx`
- Same blocking issue: `href="#"` on GitHub Repo / Demo Video / Architecture Doc — must be wired to real URLs before ship. Flag as P0.
- Content and typography here are good, minimal, on-brand — no structural changes needed once links are real.

### `src/components/demo/LiveDemo.tsx` (620 lines — largest component, most changes needed)
- **Remove all emoji** (`☕ 📱 🪴 📖 💡 📸 ◀️ 🏠` etc. — search this file for any Unicode emoji characters) and replace with the same custom SVG line-icon language used in `Navbar.tsx` / `OfflineFirst.tsx`. This is the single highest-impact fix in this file for making the demo feel like a real product feature rather than a hackathon prototype screen.
- The phone-mockup mini-UI states (`FeatureSceneDescription`, `FeatureOCR`, `FeatureVoiceControl`, `FeatureNPUPerformance`, etc.) are a strong Apple-style pattern (small device-frame UI vignettes narrating a feature) — keep this structure, just clean up the icon/emoji issue and confirm `PhoneMockup.tsx` frame styling (bezel, corner radius, notch) reads as a premium device frame and not a generic rounded rectangle.
- Progress bar + counter (`01 / 12`) and keyboard-nav hint are good, quiet UI details — keep.
- Confirm the 12-state manual-advance format (Back/Next buttons) doesn't feel like extra friction before the payoff — consider whether some low-value states (e.g. `StateIntro`, `StateClose`) can be merged or auto-advanced so the demo doesn't feel like 12 clicks are required to see the story. This is a UX judgment call — flag to requester, don't unilaterally cut content.

### `src/components/demo/CanvasScrub.tsx` + `public/sequences`
- Verify the image-sequence scrub (glasses/watch, 70 frames each) is using correctly compressed/sized frames — check `public/sequences` folder size vs. viewport size actually rendered (`max-w-[500px]`); if frames are larger than needed, downscale to cut payload (5.7MB sequences directory is a lot for a 500px-wide scrub animation).

### `src/components/ParticleField.tsx`
- Technically solid (R3F point cloud with proximity-based connecting lines) but visually this is a very "generic AI startup" motif (glowing particle network = "we do AI," seen on thousands of pitch-deck sites). It doesn't clash with Apple's aesthetic outright, but it's not distinctly *this brand* either. Recommend: keep it but push opacity down further site-wide (current 0.15–0.35 range → 0.08–0.18) so it reads as barely-there ambient texture, never as a focal animated graphic. Confirm it's fully disabled under `prefers-reduced-motion` (already handled in the component — good, keep).

### `src/components/ScrollReveal.tsx`
- Vary the reveal treatment instead of using identical fade+translateY(60px) everywhere:
  - Large hero-scale headlines: no motion, or a much smaller/faster reveal (12–16px translate, 0.5s) so big type doesn't feel like it's "flying in."
  - Supporting body copy: current treatment is fine, keep.
  - Image reveals: consider a subtle scale-in (0.97 → 1) instead of translateY, matching the scale pattern already used in `LiveDemo`'s `AnimatePresence` transitions, for visual consistency between GSAP-driven and Framer-Motion-driven animations across the site.

---

## 5. Accessibility & performance (part of "premium," not separate from it)

- Run an automated Lighthouse + axe pass once imagery/fonts are fixed; premium sites load fast and score well — Apple's own site is heavily optimized despite rich media.
- Confirm all `alt` text is descriptive (spot check looked fine, e.g. `Problem.tsx`'s alt text) but re-verify after the `problem-solution.jpeg` image is replaced with live HTML (alt text becomes irrelevant/removed at that point).
- `prefers-reduced-motion` is already respected in `globals.css`, `ParticleField.tsx`, and `ScrollReveal.tsx` — good, keep this pattern for any new motion added during this pass.
- Convert remaining large PNGs to WebP/AVIF via `next/image` (already handles this automatically for most cases — confirm `next.config.mjs` isn't disabling image optimization).
- Self-host fonts via `next/font` (§4) to remove the external Google Fonts network request entirely.

---

## 6. Icon system — one rule to enforce everywhere

Right now the site mixes: hand-drawn SVG icons (good, in `Navbar`, `OfflineFirst`, `Team` socials), inline emoji (bad, in `LiveDemo`), and zero icons in places that could use one small mark (`USP` cards). 

**Standardize:** build a small shared icon set (8–10 icons: info/warning, mic, camera, translate/language, voice/speaker, location/SOS, checkmark, chevron) as a single `src/components/icons.tsx` file exporting each as a stroke-based SVG component using `currentColor` and matching the existing 1.5–2px stroke weight seen in `Navbar`'s logo mark and `OfflineFirst`'s info icon. Then swap every emoji and every one-off inline `<svg>` in `LiveDemo.tsx` to pull from this shared set. This single change does more for "looks like a real product, not a hackathon demo" than almost anything else in this doc.

---

## 7. Execution order (do in this sequence)

1. **P0 — Content blockers:** Fill in real Team member data and real Footer links (§4 Team/Footer). Nothing else matters if this ships with placeholders.
2. **P0 — Imagery:** Replace `phone-hero.png`, rebuild `Problem.tsx` off `problem-solution.jpeg`, resolve `accessibility-illustration.jpeg` style mismatch (§3).
3. **P1 — Icon system:** Build shared icon set, remove all emoji from `LiveDemo.tsx` (§6).
4. **P1 — Design tokens:** Consolidate to `tailwind.config.ts`, add spacing/type scale tokens, delete dead `design-tokens.ts` (§2).
5. **P1 — Font loading:** Migrate to `next/font`, delete unused Geist font files (§4 globals.css).
6. **P2 — Motion polish:** Vary `ScrollReveal` treatment by content type, remove pulsing glow rings, soften `.glow-teal` and button glow (§4 PhoneFirst, globals.css).
7. **P2 — Section-by-section spacing/type token migration:** Replace hardcoded `text-[Npx]` and `mb-N`/`gap-N` values across all section components with the new scale tokens (§2, applies to every file in §4).
8. **P3 — Asset optimization pass:** WebP conversion, image-sequence downscale, texture-vs-CSS-gradient audit, delete unused `WhatsApp Image *.jpeg` files (§3).
9. **P3 — Accessibility/performance sweep + Lighthouse pass** (§5).

---

## 8. Acceptance checklist (use before calling this "done")

- [ ] No emoji anywhere in the codebase (`grep -rP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' src/`)
- [ ] No literal placeholder text (`grep -rn "PLACEHOLDER\|\[TEAM MEMBER\|\[ROLE\]" src/`)
- [ ] No `href="#"` links remaining outside genuine same-page anchor links
- [ ] Zero images with baked-in text/UI used as section content
- [ ] All photographic assets share one consistent color grade/style
- [ ] Single source of truth for design tokens (`tailwind.config.ts` only)
- [ ] All font sizes pulled from the Tailwind scale, zero arbitrary `text-[Npx]` left except true one-offs with a code comment justifying them
- [ ] Fonts self-hosted via `next/font`, zero external font network requests
- [ ] No pulsing/animated glow effects on static content
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 95 on mobile
- [ ] Every animated element respects `prefers-reduced-motion`
- [ ] Icon set is unified — one visual language for every icon on the site

---

## 9. What NOT to change
- Overall page/section order and copywriting — the narrative arc (thesis → problem → USPs → who it's for → architecture → offline → build status → live demo → team → footer) is sound; don't restructure it.
- The core color identity (near-black + teal + warm-white + amber accent) — it's a good, distinctive palette; the fix is *discipline in applying it*, not changing it.
- The LiveDemo interactive walkthrough concept — keep the state-machine narrative structure, just clean up its visual execution (§4).
- Lenis smooth scroll / GSAP ScrollTrigger / Framer Motion stack — no need to swap animation libraries, just use them with more restraint.
