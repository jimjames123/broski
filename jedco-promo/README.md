# JEDCO Bill Payment Promo

A 30-second vertical (9:16, 1080×1920, 30fps, H.264) promo that assembles your
real assets — no synthetic UI, no invented visuals. Built with Remotion.

> **Why Remotion and not a plain ffmpeg script?** The brief allowed either. In
> this environment no full `ffmpeg` is available (only Remotion's stripped
> internal build, which lacks `drawtext`, `overlay`, `fade`, and
> `sidechaincompress`), so the text overlays, logo overlay, transitions and
> audio ducking are done in Remotion. Everything you'd tune in an ffmpeg script
> lives in one config file here instead.

## Timeline (matches the brief exactly)

| Time        | Segment    | What plays                                                        |
| ----------- | ---------- | ----------------------------------------------------------------- |
| 0–8s        | Opening    | Problem statement text over brand background. **No app footage.** |
| 8–12s       | App intro  | Logo fades/scales up full screen.                                 |
| 12–25s      | Demo       | Your `screen_recording.mp4`, trimmed & sped to fit. Clean, no fx. |
| 25–30s      | Closing    | CTA card, then a larger logo bumper in the **final 2 seconds**.   |
| entire clip | Watermark  | Small logo in the top corner the whole time.                      |
| entire clip | Audio      | Voiceover full-length; music underneath, **ducked** when VO talks.|

## Everything you edit lives in `src/config.ts`

You should not need to touch any code in `src/*.tsx`. Open **`src/config.ts`** and change:

- **`ASSETS`** — file names for the recording, logo, voiceover, music (all in `public/`).
- **`TIMELINE`** — the four breakpoints in seconds (`openingStart`, `appIntroStart`, `demoStart`, `closingStart`, `end`).
- **`OPENING_LINES`** — the opening text. Each entry is `{ text, fromSec, toSec }`. Use `\n` for line breaks. Keep the times non-overlapping (one message shows at a time).
- **`CLOSING`** — `headline`, `subline`, `cta` text.
- **`COLORS`** — brand gradient (`bgTop`/`bgBottom`), `accent`, text colours.
- **`RECORDING`** — `trimStartSec` (skip intro of the capture) and `playbackRate` (speed up so the whole flow fits the 13s window). A 13s window at rate `R` shows `13*R` seconds of source.
- **`AUDIO`** — `voiceoverVolume`, `musicBaseVolume`, `musicDuckedVolume`, and `voiceoverActiveWindows` (the `[start, end]` second ranges where music ducks further under the VO).
- **`WATERMARK`** / **`CLOSING_LOGO`** — corner, size, opacity of the persistent watermark, and the size/duration of the final logo bumper.

## Replace the placeholder assets

`public/` currently contains **clearly-labeled placeholders** so the pipeline
runs end to end. Swap each for your real file (same names, or rename and update
`ASSETS`):

- `public/logo.png` — placeholder "LOGO" badge → your transparent-background logo.
- `public/voiceover.mp3` — placeholder tone → your finished VO (~30s).
- `public/music.mp3` — placeholder tone → your background music bed.
- `public/screen_recording.mp4` — stand-in capture → your real JEDCO flow.

After replacing the VO, set `AUDIO.voiceoverActiveWindows` to the real
speaking ranges so the music ducks in the right places.

## Build

```bash
./build.sh                 # renders out/jedco-promo.mp4
OUT=custom.mp4 ./build.sh  # custom output path
```

Preview interactively while you tweak config:

```bash
npx remotion studio
```

## Output spec

`out/jedco-promo.mp4` — MP4 / H.264 / **1080×1920** / **30fps** / AAC stereo.
The video track is frame-exact 30.000s (900 frames); the container reads
~30.016s because AAC frames are ~21ms and can't land on an exact 30.000s
boundary without re-encoding audio. `build.sh` already trims trailing audio
padding to keep it as tight as possible.

## Notes / caveats

- The placeholder logo and audio are **not** real brand assets — they exist only
  to prove the pipeline. Replace them before publishing.
- The stand-in recording is low-resolution and shows a different flow; drop in
  the real JEDCO capture for final output. If your real capture is a tall phone
  recording, it will be letterboxed (pillarboxed) on black — adjust
  `COLORS.demoBg` or crop the source if you prefer edge-to-edge.
