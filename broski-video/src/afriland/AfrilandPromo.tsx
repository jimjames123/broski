import "./fonts";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
} from "remotion";
import { Background } from "./Background";
import {
  ClosingSegment,
  DemoSegment,
  LogoRevealSegment,
  OpeningSegment,
} from "./segments";
import { DURATION_FRAMES, SEGMENTS, VO_ACTIVE_WINDOWS, sec } from "./timing";

// Music ducking: low bed, dipping further while the VO speaks (smooth ramp).
const MUSIC_BASE = 0.16;
const MUSIC_DUCKED = 0.05;
const DUCK_FADE = 0.28; // seconds
const musicVolume = (frame: number) => {
  const t = frame / 30;
  let duck = 0;
  for (const [a, b] of VO_ACTIVE_WINDOWS) {
    let d = 0;
    if (t >= a && t <= b) d = 1;
    else if (t < a && t > a - DUCK_FADE) d = (t - (a - DUCK_FADE)) / DUCK_FADE;
    else if (t > b && t < b + DUCK_FADE) d = (b + DUCK_FADE - t) / DUCK_FADE;
    duck = Math.max(duck, d);
  }
  return MUSIC_BASE + (MUSIC_DUCKED - MUSIC_BASE) * duck;
};

const segFrames = (s: { start: number; end: number }) =>
  sec(s.end) - sec(s.start);

export const AfrilandPromo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* continuous graded background (parallax) behind everything */}
      <Background />

      {/* 1. Opening */}
      <Sequence
        from={sec(SEGMENTS.opening.start)}
        durationInFrames={segFrames(SEGMENTS.opening)}
        name="Opening"
      >
        <OpeningSegment lenFrames={segFrames(SEGMENTS.opening)} />
      </Sequence>

      {/* 2. Logo reveal (masked) */}
      <Sequence
        from={sec(SEGMENTS.logoReveal.start)}
        durationInFrames={segFrames(SEGMENTS.logoReveal)}
        name="LogoReveal"
      >
        <LogoRevealSegment lenFrames={segFrames(SEGMENTS.logoReveal)} />
      </Sequence>

      {/* 3. App demonstration */}
      <Sequence
        from={sec(SEGMENTS.demo.start)}
        durationInFrames={segFrames(SEGMENTS.demo)}
        name="Demo"
      >
        <DemoSegment lenFrames={segFrames(SEGMENTS.demo)} />
      </Sequence>

      {/* 4. Closing */}
      <Sequence
        from={sec(SEGMENTS.closing.start)}
        durationInFrames={DURATION_FRAMES - sec(SEGMENTS.closing.start)}
        name="Closing"
      >
        <ClosingSegment
          lenFrames={DURATION_FRAMES - sec(SEGMENTS.closing.start)}
        />
      </Sequence>

      {/* Audio — fixed voiceover full length; music bed ducked under speech */}
      <Audio src={staticFile("afriland/voiceover.mp3")} volume={1} />
      <Audio
        src={staticFile("afriland/music.mp3")}
        volume={(f) => musicVolume(f)}
      />
    </AbsoluteFill>
  );
};
