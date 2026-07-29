/**
 * Brand system — Afriland First Bank, South Sudan.
 * Colours and typography are exactly as specified by the client.
 * Change values here; animation components never hardcode colours/fonts.
 */
export const COLORS = {
  black: "#2D2926", // primary — backgrounds, structure
  lightGray: "#D0D0CE", // text, structural
  darkGray: "#75787B", // secondary text, structure
  red: "#EF3340", // ACCENT — CTA / key highlights / closing bumper ONLY
  white: "#FFFFFF",
};

// Reusable background system (reused across every non-recording segment so the
// grade reads as intentional, not a default white page).
export const BG = {
  // deep near-black graphite gradient
  base: "radial-gradient(120% 90% at 50% 18%, #3A3531 0%, #2D2926 45%, #211E1B 100%)",
  vignette:
    "radial-gradient(130% 100% at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
  // subtle red glow used sparingly behind key moments (e.g. success)
  redGlow: "radial-gradient(50% 40% at 50% 45%, rgba(239,51,64,0.28) 0%, rgba(239,51,64,0) 70%)",
};

// Font families. Barlow (DIN stand-in) primary, Inter (Univers stand-in)
// secondary, Arial final fallback. Actual @font-face is registered in fonts.ts.
export const FONTS = {
  primary: '"Barlow", Arial, sans-serif',
  secondary: '"Inter", Arial, sans-serif',
};
