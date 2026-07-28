/**
 * ============================================================================
 *  JEDCO BILL PAYMENT PROMO — EDIT EVERYTHING HERE
 * ============================================================================
 *
 *  This is the ONLY file you should need to touch to change:
 *    - asset file names          -> ASSETS
 *    - timeline breakpoints      -> TIMELINE
 *    - on-screen text copy       -> OPENING_LINES / CLOSING
 *    - brand colours             -> COLORS
 *    - how the recording is fit  -> RECORDING
 *    - audio mix / ducking       -> AUDIO
 *    - watermark logo behaviour  -> WATERMARK / CLOSING_LOGO
 *
 *  After editing, re-run:  ./build.sh      (or: npx remotion render JedcoPromo out/jedco-promo.mp4 ...)
 *  The composition code in src/ reads from this file and does not need editing.
 * ============================================================================
 */

// ---- Output spec (technical requirements) ---------------------------------
export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInSeconds: 30, // final duration is exactly this
};

// ---- Asset file names (all live in the public/ folder) --------------------
// Replace these with your real files. Keep them in public/ (or a subfolder).
export const ASSETS = {
  recording: "screen_recording.mp4", // raw JEDCO payment flow capture
  logo: "logo.png", // transparent-background company logo
  voiceover: "voiceover.mp3", // finished VO, ~30s
  music: "music.mp3", // subtle background music bed
};

// ---- Timeline breakpoints (in SECONDS) ------------------------------------
// These four segments must be contiguous and cover 0 -> durationInSeconds.
export const TIMELINE = {
  openingStart: 0, //  0s  problem statement, no app footage
  appIntroStart: 8, //  8s  logo appears full screen (transition in)
  demoStart: 12, // 12s  real screen recording plays
  closingStart: 25, // 25s  closing card + CTA
  end: 30, // 30s  exact end
};

// ---- Colours (brand) ------------------------------------------------------
export const COLORS = {
  bgTop: "#0E1E5B", // opening/closing gradient top
  bgBottom: "#050A24", // opening/closing gradient bottom
  demoBg: "#000000", // letterbox background behind the recording
  text: "#FFFFFF",
  accent: "#F4B400", // highlight colour (CTA, key words)
  subtext: "rgba(255,255,255,0.72)",
};

// ---- Opening copy (0 -> 8s) -----------------------------------------------
// Each line fades in/out at the given times (SECONDS, absolute from video start).
// Edit text freely; add or remove lines as you like.
// Times must not overlap — one message is shown (centered) at a time.
// Use \n inside a message for multiple rows.
export const OPENING_LINES: { text: string; fromSec: number; toSec: number }[] =
  [
    { text: "Long queues.\nWasted hours.", fromSec: 0.5, toSec: 3.4 },
    {
      text: "Costly trips just to pay\nyour electricity bill.",
      fromSec: 3.6,
      toSec: 6.0,
    },
    { text: "There's a better way.", fromSec: 6.2, toSec: 8.0 },
  ];

// ---- Closing copy (25 -> 30s) ---------------------------------------------
export const CLOSING = {
  headline: "Pay your JEDCO bill\nin seconds.",
  subline: "Anytime. Anywhere. From your phone.",
  cta: "Download the app today",
};

// ---- Recording fit (12 -> 25s window = 13s) -------------------------------
// Trim and speed the raw capture so the full flow fits cleanly in the window.
export const RECORDING = {
  trimStartSec: 0, // skip this many seconds at the start of the capture
  playbackRate: 1.6, // >1 speeds up. 13s window consumes 13*rate seconds of source.
  // With rate 1.6 the window shows ~20.8s of source flow in 13s.
};

// ---- Audio mix + ducking --------------------------------------------------
export const AUDIO = {
  voiceoverVolume: 1.0, // VO is the loudest element, full level
  musicBaseVolume: 0.18, // music bed when VO is silent
  musicDuckedVolume: 0.06, // music bed while VO is speaking (ducked further)
  duckFadeSec: 0.25, // smoothing so ducking is not abrupt
  // Windows (SECONDS) where the voiceover is actively speaking -> music ducks.
  // Set these to match your VO. Default assumes VO talks over each segment.
  voiceoverActiveWindows: [
    [0.5, 7.8],
    [8.2, 11.6],
    [12.2, 24.6],
    [25.2, 29.6],
  ] as [number, number][],
};

// ---- Persistent watermark logo (entire video) -----------------------------
export const WATERMARK = {
  corner: "top-left" as "top-left" | "top-right",
  widthPx: 150, // logo width in the 1080-wide frame
  marginPx: 60, // distance from the edges
  opacity: 0.9,
};

// ---- Larger closing logo bumper (final 2 seconds) -------------------------
export const CLOSING_LOGO = {
  showInLastSeconds: 2, // appears during the final N seconds
  widthPx: 460,
};
