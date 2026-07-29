# Afriland First Bank — "FirstBank Connect" promo

A premium motion-graphics promo timed to a fixed ElevenLabs voiceover.
1080×1920, 30fps, **1246 frames (41.535s — exactly the voiceover length)**.
Composition id: `AfrilandPromo` (registered in `src/Root.tsx`).

Render:

```bash
# from broski-video/
npx remotion render AfrilandPromo out/afriland-promo.mp4 --codec=h264
# (this environment: add --browser-executable=<chromium> --concurrency=4)
```

## Everything editable is separated from animation logic

| File | What it controls |
| ---- | ---------------- |
| `timing.ts` | FPS, locked duration, the voiceover **phrase map**, the 4 segment boundaries, and the music-duck windows. All in seconds. |
| `copy.ts` | Every word on screen, split into kinetic beats with timestamps. `accent:true` = brand red. |
| `theme.ts` | Brand colours, the reusable background/vignette/red-glow grade, font stacks. |
| `fonts.ts` | Registers Barlow + Inter (bundled via `@fontsource`, Arial fallback). |

Animation components (`Background`, `KineticText`, `PhoneMockup`, `LogoReveal`,
`segments.tsx`, `AfrilandPromo.tsx`) read from those files and contain no
literal copy, colours, or times — retune the film without touching them.

## Segments (all synced to `voiceover.mp3`)

1. **Opening (0–9.6s)** — kinetic typography builds the merchant's week
   ("For every merchant" → opportunities / customers / suppliers → "a business
   to keep moving"). Word-by-word masked spring reveals.
2. **Logo reveal (9–13s)** — on "With FirstBank Connect": light panel springs
   in, logo unmasks left-to-right behind a sweeping brand-red bar.
3. **Demo (12.4–30.1s)** — the real screen recording inside a phone mockup that
   tilts into place (3D spring settle), floats while holding, and lifts away on
   exit. Feature captions animate in per spoken line.
4. **Closing (30–41.5s)** — "banking smarter" accent line with a red-glow grade,
   then the logo bumper + "FirstBank Connect" + "Always with you." CTA.

## Motion techniques used

- **Spring physics** for every entrance/exit (`motion.ts` presets: entrance /
  settle / snappy / soft). No linear moves anywhere.
- **Kinetic typography** — `KineticText` masks and springs each word in with
  staggered timing.
- **Layered parallax** — `Background` runs back gradient + drifting midground
  blobs + vignette at different rates, continuously behind all segments.
- **Masked logo-shape transition** — `LogoReveal` wipe led by the brand-red rule.
- **Living phone mockup** — tilt-settle in, float + micro-parallax hold, tilt-out.
- **Consistent grade** — one graphite gradient system reused throughout, with a
  red glow behind the success moment.

## Assets (`public/afriland/`)

- `voiceover.mp3` — fixed narration (used exactly as-is, full length, volume 1).
- `music.mp3` — bed at low volume, ducked further during speech (see
  `VO_ACTIVE_WINDOWS` in `timing.ts` and `musicVolume` in `AfrilandPromo.tsx`).
- `screen_recording.mp4` — real capture, only inside the phone mockup, muted.
- `logo.png` — **currently a faithful in-house recreation** of the Afriland
  First Bank / South Sudan lockup (rendered from `PlaceholderLogo.tsx`).
  **Swap in the official artwork:** drop the real transparent PNG at
  `public/afriland/logo.png` and re-render — no code changes needed.

## Adjusting

- **Retime a beat:** edit its `start`/`end` in `copy.ts` (text) or the phrase /
  segment seconds in `timing.ts`. Audio is never retimed.
- **Change copy:** edit `copy.ts`.
- **Change colours:** edit `theme.ts` (keep red sparing — CTA/highlights only).
- **Swap logo:** replace `public/afriland/logo.png`.
