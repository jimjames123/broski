/**
 * TEXT CONTENT — all on-screen copy, split into kinetic beats with absolute
 * timestamps (seconds) synced to voiceover.mp3. Edit words/timings here; the
 * animation components never contain literal copy.
 *
 * `accent: true` renders the beat in brand red (used sparingly).
 */
export type Beat = { text: string; start: number; end: number; accent?: boolean };

// --- Opening (0 - 9.6s): the merchant's week -------------------------------
export const OPENING_BEATS: Beat[] = [
  { text: "For every merchant", start: 0.3, end: 2.0 },
  { text: "new opportunities", start: 2.2, end: 3.9 },
  { text: "customers to serve", start: 4.0, end: 5.3 },
  { text: "suppliers to pay", start: 5.4, end: 7.0 },
  { text: "a business to keep moving", start: 7.7, end: 9.4, accent: false },
];

// --- Demo captions (12.4 - 30.1s): features, beside the phone --------------
export const DEMO_CAPTIONS: Beat[] = [
  { text: "Payments received, instantly", start: 12.6, end: 13.8 },
  { text: "Suppliers paid, with ease", start: 13.9, end: 15.3 },
  { text: "Airtime, always in reach", start: 15.9, end: 18.1 },
  { text: "Shop with Mastercard", start: 19.0, end: 21.3 },
  { text: "Review every transaction", start: 21.4, end: 23.4 },
  { text: "Stay in control", start: 23.5, end: 24.7 },
  { text: "Send money to family", start: 25.5, end: 27.6 },
  { text: "In just a few steps", start: 27.7, end: 29.9 },
];

// --- Closing (30 - 41.5s): banking smarter + bumper ------------------------
export const CLOSING = {
  // success line (phrase 7-8), red glow moment
  smartLinePre: { text: "Success isn't about working harder.", start: 30.7, end: 33.9 },
  smartLineAccent: { text: "It's about banking smarter.", start: 34.4, end: 36.6, accent: true },
  // bumper (phrase 9-10)
  bumperName: { text: "FirstBank Connect", start: 37.2, end: 41.5 },
  bumperTag: { text: "Always with you.", start: 39.5, end: 41.5, accent: true },
};

// Placeholder wordmark text (used only until the real logo.png file is supplied).
export const LOGO_PLACEHOLDER = {
  line1: "Afriland First Bank",
  line2: "South Sudan",
};
