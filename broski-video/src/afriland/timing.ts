/**
 * VOICEOVER TIMING MAP — derived from silence analysis of voiceover.mp3.
 * The whole video is timed TO this audio (audio is fixed, never retimed).
 *
 * FPS and total duration are locked to the voiceover length.
 * `PHRASES` are the detected speech spans (seconds). Fill each `text` from the
 * client's script; on-screen kinetic type is keyed to these windows.
 *
 * SEGMENTS map the four required parts of the film onto the audio. These will
 * be finalised once the script confirms which lines are problem / reveal /
 * demo / closing. Times are in seconds.
 */
export const FPS = 30;
export const DURATION_SECONDS = 41.5; // voiceover.mp3 length (locked at build)

// Detected speech spans [startSec, endSec]. text = "" until script provided.
export const PHRASES: { start: number; end: number; text: string }[] = [
  { start: 0.0, end: 7.05, text: "" },
  { start: 7.64, end: 9.05, text: "" },
  { start: 10.08, end: 15.23, text: "" },
  { start: 15.72, end: 18.07, text: "" },
  { start: 18.83, end: 24.57, text: "" },
  { start: 25.33, end: 29.94, text: "" },
  { start: 30.58, end: 33.7, text: "" },
  { start: 34.38, end: 36.46, text: "" },
  { start: 37.25, end: 38.9, text: "" },
  { start: 39.58, end: 41.5, text: "" },
];

// Segment boundaries (seconds). Provisional — confirmed against the script.
export const SEGMENTS = {
  openingStart: 0.0, // problem / pain, kinetic typography
  logoRevealStart: 9.05, // animated logo reveal (placeholder — tune to script)
  demoStart: 15.23, // screen recording inside phone mockup
  closingStart: 34.38, // success hold + logo bumper + CTA
  end: DURATION_SECONDS,
};

// Music ducking: windows (sec) where VO is speaking -> duck music further.
// Mirrors PHRASES; regenerate if the script changes phrasing.
export const VO_ACTIVE_WINDOWS: [number, number][] = PHRASES.map((p) => [
  p.start,
  p.end,
]);
