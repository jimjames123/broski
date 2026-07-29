/**
 * VOICEOVER TIMING MAP — locked to voiceover.mp3 (fixed audio, never retimed).
 * Every visual beat keys off these seconds. Edit timing here only; animation
 * components read from this file and contain no hardcoded times.
 */
export const FPS = 30;
export const DURATION_FRAMES = 1246; // voiceover.mp3 = 41.535s @ 30fps (locked)
export const DURATION_SECONDS = DURATION_FRAMES / FPS;

export const sec = (s: number) => Math.round(s * FPS);

// Detected speech spans (silence analysis) mapped to the client's script.
export const PHRASES = [
  { start: 0.0, end: 7.05, text: "For every merchant, each new week brings new opportunities, customers to serve, suppliers to pay," },
  { start: 7.64, end: 9.05, text: "and a business to keep moving." },
  { start: 10.08, end: 15.23, text: "With FirstBank Connect, payments are received quickly, suppliers are paid conveniently," },
  { start: 15.72, end: 18.07, text: "and airtime is always within reach." },
  { start: 18.83, end: 24.57, text: "From shopping with MasterCard to reviewing every transaction, staying in control becomes easier." },
  { start: 25.33, end: 29.94, text: "And when family needs support, sending money takes only a few simple steps." },
  { start: 30.58, end: 33.7, text: "Because success isn't only about working harder," },
  { start: 34.38, end: 36.46, text: "it's also about banking smarter." },
  { start: 37.25, end: 38.9, text: "FirstBank Connect," },
  { start: 39.58, end: 41.53, text: "always with you." },
];

// The four required segments, mapped onto the audio (seconds).
export const SEGMENTS = {
  opening: { start: 0.0, end: 9.6 }, // phrases 1-2: the merchant's week
  logoReveal: { start: 9.0, end: 13.0 }, // masked reveal on "With FirstBank Connect"
  demo: { start: 12.4, end: 30.1 }, // phrases 3-6: features inside phone mockup
  closing: { start: 30.0, end: DURATION_SECONDS }, // phrases 7-10: banking smarter + bumper
};

// Music ducking windows (music dips further while VO speaks).
export const VO_ACTIVE_WINDOWS: [number, number][] = PHRASES.map((p) => [
  p.start,
  p.end,
]);
