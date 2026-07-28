import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ASSETS,
  AUDIO,
  CLOSING,
  CLOSING_LOGO,
  COLORS,
  OPENING_LINES,
  RECORDING,
  TIMELINE,
  WATERMARK,
} from "./config";

const FONT = "Helvetica, Arial, system-ui, sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ===========================================================================
//  MAIN COMPOSITION
//  Renders the four contiguous timeline segments, a persistent watermark and
//  the mixed audio (voiceover + ducked music). Timings all come from config.
// ===========================================================================
export const JedcoPromo: React.FC = () => {
  const { fps } = useVideoConfig();
  const sec = (s: number) => Math.round(s * fps);

  const openF = sec(TIMELINE.openingStart);
  const appIntroF = sec(TIMELINE.appIntroStart);
  const demoF = sec(TIMELINE.demoStart);
  const closingF = sec(TIMELINE.closingStart);
  const endF = sec(TIMELINE.end);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.demoBg }}>
      {/* -- 0-8s : OPENING (problem statement, no app footage) ------------- */}
      <Sequence from={openF} durationInFrames={appIntroF - openF} name="Opening">
        <OpeningSegment />
      </Sequence>

      {/* -- 8-12s : APP INTRO (logo appears full screen) ------------------- */}
      <Sequence
        from={appIntroF}
        durationInFrames={demoF - appIntroF}
        name="LogoIntro"
      >
        <LogoIntroSegment />
      </Sequence>

      {/* -- 12-25s : DEMO (real screen recording, clean, no effects) ------- */}
      <Sequence from={demoF} durationInFrames={closingF - demoF} name="Demo">
        <DemoSegment />
      </Sequence>

      {/* -- 25-30s : CLOSING (card + CTA, large logo bumper last 2s) ------- */}
      <Sequence
        from={closingF}
        durationInFrames={endF - closingF}
        name="Closing"
      >
        <ClosingSegment />
      </Sequence>

      {/* -- Persistent watermark logo (entire video) ---------------------- */}
      <Watermark />

      {/* -- Audio: voiceover full length + music bed with ducking --------- */}
      <Audio src={staticFile(ASSETS.voiceover)} volume={AUDIO.voiceoverVolume} />
      <Audio src={staticFile(ASSETS.music)} volume={musicVolumeAt(fps)} />
    </AbsoluteFill>
  );
};

// ---- shared branded gradient backdrop -------------------------------------
const GradientBg: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(165deg, ${COLORS.bgTop} 0%, ${COLORS.bgBottom} 100%)`,
    }}
  />
);

// ===========================================================================
//  OPENING SEGMENT (0 -> 8s)
// ===========================================================================
const OpeningSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // local frame is relative to the segment; convert opening line times (which
  // are absolute from video start) into this segment's local frames.
  const t = frame / fps + TIMELINE.openingStart;

  return (
    <AbsoluteFill>
      <GradientBg />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 110,
          textAlign: "center",
          fontFamily: FONT,
        }}
      >
        {/* Only one message is visible at a time (config times don't overlap),
            so each is centered in the frame and cross-faded. */}
        {OPENING_LINES.map((line, i) => {
          const opacity = interpolate(
            t,
            [line.fromSec, line.fromSec + 0.4, line.toSec - 0.4, line.toSec],
            [0, 1, 1, 0],
            clamp,
          );
          const rise = interpolate(
            t,
            [line.fromSec, line.fromSec + 0.5],
            [40, 0],
            { ...clamp, easing: Easing.out(Easing.cubic) },
          );
          const isLast = i === OPENING_LINES.length - 1;
          return (
            <AbsoluteFill
              key={i}
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 110,
              }}
            >
              <div
                style={{
                  translate: `0px ${rise}px`,
                  opacity,
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  fontSize: isLast ? 92 : 80,
                  fontWeight: 800,
                  lineHeight: 1.14,
                  letterSpacing: -1,
                  color: isLast ? COLORS.accent : COLORS.text,
                }}
              >
                {line.text}
              </div>
            </AbsoluteFill>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ===========================================================================
//  LOGO INTRO SEGMENT (8 -> 12s)  — fade/scale the logo up full screen
// ===========================================================================
const LogoIntroSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 14 } });
  const scale = interpolate(pop, [0, 1], [0.6, 1]);
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    clamp,
  );
  const fadeIn = interpolate(frame, [0, 10], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <GradientBg />
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Img
          src={staticFile(ASSETS.logo)}
          style={{ width: 620, opacity: fadeIn, scale: `${scale}` }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ===========================================================================
//  DEMO SEGMENT (12 -> 25s) — the real recording, trimmed & sped to fit.
//  Kept intentionally clean: just the footage on a black letterbox.
// ===========================================================================
const DemoSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 10], [0, 1], clamp);
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{ backgroundColor: COLORS.demoBg, opacity: fadeIn * fadeOut }}
    >
      <OffthreadVideo
        src={staticFile(ASSETS.recording)}
        trimBefore={Math.round(RECORDING.trimStartSec * fps)}
        playbackRate={RECORDING.playbackRate}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </AbsoluteFill>
  );
};

// ===========================================================================
//  CLOSING SEGMENT (25 -> 30s) — CTA card, large logo bumper in final N sec.
// ===========================================================================
const ClosingSegment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 12], [0, 1], clamp);

  // The larger closing logo bumper appears during the final N seconds.
  const bumperStart = durationInFrames - Math.round(CLOSING_LOGO.showInLastSeconds * fps);
  const bumperIn = interpolate(
    frame,
    [bumperStart, bumperStart + 8],
    [0, 1],
    clamp,
  );
  const bumperPop = spring({
    frame: frame - bumperStart,
    fps,
    config: { damping: 13 },
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <GradientBg />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 110,
          textAlign: "center",
          fontFamily: FONT,
        }}
      >
        {/* headline + subline (fully clear out when the logo bumper arrives) */}
        <div
          style={{
            opacity: interpolate(bumperIn, [0, 1], [1, 0], clamp),
          }}
        >
          <div
            style={{
              whiteSpace: "pre-line",
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.1,
              color: COLORS.text,
              letterSpacing: -1,
            }}
          >
            {CLOSING.headline}
          </div>
          <div
            style={{
              fontSize: 36,
              color: COLORS.subtext,
              marginTop: 28,
            }}
          >
            {CLOSING.subline}
          </div>
        </div>

        {/* larger closing logo bumper (final N seconds) */}
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: bumperIn,
          }}
        >
          <Img
            src={staticFile(ASSETS.logo)}
            style={{
              width: CLOSING_LOGO.widthPx,
              scale: `${interpolate(bumperPop, [0, 1], [0.7, 1])}`,
            }}
          />
          <div
            style={{
              marginTop: 40,
              padding: "22px 56px",
              borderRadius: 999,
              background: COLORS.accent,
              color: "#111",
              fontSize: 38,
              fontWeight: 800,
              fontFamily: FONT,
            }}
          >
            {CLOSING.cta}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ===========================================================================
//  PERSISTENT WATERMARK (entire video)
// ===========================================================================
const Watermark: React.FC = () => {
  const left = WATERMARK.corner === "top-left";
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <Img
        src={staticFile(ASSETS.logo)}
        style={{
          position: "absolute",
          top: WATERMARK.marginPx,
          left: left ? WATERMARK.marginPx : undefined,
          right: left ? undefined : WATERMARK.marginPx,
          width: WATERMARK.widthPx,
          opacity: WATERMARK.opacity,
        }}
      />
    </AbsoluteFill>
  );
};

// ===========================================================================
//  AUDIO DUCKING
//  Returns a per-frame volume function for the music bed: base level normally,
//  ducked further while the voiceover is active, with a smooth ramp so the
//  transition is not abrupt. Voiceover always plays at full level on top.
// ===========================================================================
function musicVolumeAt(fps: number) {
  const { musicBaseVolume, musicDuckedVolume, duckFadeSec, voiceoverActiveWindows } =
    AUDIO;
  return (frame: number) => {
    const t = frame / fps;
    // duck = 1 inside a VO window, ramping linearly over duckFadeSec at edges.
    let duck = 0;
    for (const [a, b] of voiceoverActiveWindows) {
      let d = 0;
      if (t >= a && t <= b) d = 1;
      else if (t < a && t > a - duckFadeSec) d = (t - (a - duckFadeSec)) / duckFadeSec;
      else if (t > b && t < b + duckFadeSec) d = ((b + duckFadeSec) - t) / duckFadeSec;
      duck = Math.max(duck, d);
    }
    return musicBaseVolume + (musicDuckedVolume - musicBaseVolume) * duck;
  };
}
