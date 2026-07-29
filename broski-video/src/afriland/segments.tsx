import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BG, COLORS, FONTS } from "./theme";
import { SEGMENTS, sec } from "./timing";
import { OPENING_BEATS, DEMO_CAPTIONS, CLOSING, type Beat } from "./copy";
import { KineticText } from "./KineticText";
import { PhoneMockup } from "./PhoneMockup";
import { LogoReveal } from "./LogoReveal";
import { EASE_OUT } from "./motion";

// Wrap a beat in a Sequence local to its segment. `hold` extends it to a fixed
// end frame (for building lists); otherwise it lasts the beat's own length.
const beatSeq = (beat: Beat, segStartSec: number, holdToLocal?: number) => {
  const from = Math.max(0, sec(beat.start) - sec(segStartSec));
  const dur =
    holdToLocal != null
      ? Math.max(1, holdToLocal - from)
      : sec(beat.end) - sec(beat.start) + 6;
  return { from, dur };
};

const fadeEdges = (frame: number, len: number, outLen = 16) => {
  if (outLen <= 0) {
    // fade in only, then hold (no trailing fade-out)
    return interpolate(frame, [0, 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT,
    });
  }
  return interpolate(frame, [0, 10, len - outLen, len], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
};

// ===========================================================================
//  1. OPENING — the merchant's week (kinetic typography builds a list)
// ===========================================================================
export const OpeningSegment: React.FC<{ lenFrames: number }> = ({
  lenFrames,
}) => {
  const frame = useCurrentFrame();
  const s = SEGMENTS.opening.start;
  const [eyebrow, ...rest] = OPENING_BEATS;
  const bigBeat = rest[rest.length - 1];
  const listBeats = rest.slice(0, rest.length - 1);

  return (
    <AbsoluteFill
      style={{
        opacity: fadeEdges(frame, lenFrames, 20),
        justifyContent: "center",
        padding: "0 120px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {(() => {
          const b = beatSeq(eyebrow, s, lenFrames);
          return (
            <Sequence from={b.from} durationInFrames={b.dur} name="eyebrow" layout="none">
              <KineticText
                text={eyebrow.text}
                fontSize={38}
                weight={700}
                color={COLORS.red}
                font={FONTS.secondary}
                letterSpacing={4}
                uppercase
              />
            </Sequence>
          );
        })()}

        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
          {listBeats.map((beat, i) => {
            const b = beatSeq(beat, s, lenFrames);
            return (
              <Sequence
                key={i}
                from={b.from}
                durationInFrames={b.dur}
                name={`list-${i}`}
                layout="none"
              >
                <KineticText
                  text={beat.text}
                  fontSize={78}
                  weight={700}
                  color={COLORS.lightGray}
                  stagger={2}
                />
              </Sequence>
            );
          })}
        </div>

        {(() => {
          const b = beatSeq(bigBeat, s, lenFrames);
          return (
            <Sequence from={b.from} durationInFrames={b.dur} name="big" layout="none">
              <div style={{ marginTop: 14 }}>
                <KineticText
                  text={bigBeat.text}
                  fontSize={104}
                  weight={800}
                  color={COLORS.white}
                  stagger={3}
                />
              </div>
            </Sequence>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};

// ===========================================================================
//  2. LOGO REVEAL — masked reveal on "With FirstBank Connect"
// ===========================================================================
export const LogoRevealSegment: React.FC<{ lenFrames: number }> = ({
  lenFrames,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: fadeEdges(frame, lenFrames, 18),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LogoReveal logoWidth={720} panelWidth={860} panelHeight={360} />
    </AbsoluteFill>
  );
};

// ===========================================================================
//  3. DEMO — real recording in the phone mockup, kinetic feature captions
// ===========================================================================
export const DemoSegment: React.FC<{ lenFrames: number }> = ({ lenFrames }) => {
  const frame = useCurrentFrame();
  const s = SEGMENTS.demo.start;

  return (
    <AbsoluteFill style={{ opacity: fadeEdges(frame, lenFrames, 18) }}>
      {/* caption zone (upper area, above the phone) */}
      {DEMO_CAPTIONS.map((beat, i) => {
        const b = beatSeq(beat, s);
        return (
          <Sequence
            key={i}
            from={b.from}
            durationInFrames={b.dur}
            name={`cap-${i}`}
            layout="none"
          >
            <AbsoluteFill
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 210,
              }}
            >
              <Caption text={beat.text} />
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* phone */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start" }}>
        <div style={{ marginTop: 500 }}>
          <PhoneMockup
            width={470}
            src={staticFile("afriland/screen_recording.mp4")}
            lifeFrames={lenFrames}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 20,
    }}
  >
    <div
      style={{
        width: 14,
        height: 14,
        borderRadius: 999,
        background: COLORS.red,
        boxShadow: `0 0 18px ${COLORS.red}`,
      }}
    />
    <KineticText
      text={text}
      fontSize={58}
      weight={700}
      color={COLORS.white}
      align="left"
      stagger={2}
    />
  </div>
);

// ===========================================================================
//  4. CLOSING — banking-smarter success moment + logo bumper + CTA
// ===========================================================================
export const ClosingSegment: React.FC<{ lenFrames: number }> = ({
  lenFrames,
}) => {
  const frame = useCurrentFrame();
  const s = SEGMENTS.closing.start;

  // red glow ramps in on the "banking smarter" line and holds through bumper
  const glow = interpolate(
    frame,
    [sec(34.0) - sec(s), sec(35.2) - sec(s), lenFrames],
    [0, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const pre = beatSeq(CLOSING.smartLinePre, s);
  const acc = beatSeq(CLOSING.smartLineAccent, s);
  const bumperFrom = sec(CLOSING.bumperName.start) - sec(s);
  const bumperDur = lenFrames - bumperFrom;
  const tag = beatSeq(CLOSING.bumperTag, s);

  return (
    <AbsoluteFill style={{ opacity: fadeEdges(frame, lenFrames, 0) }}>
      {/* red glow grade */}
      <AbsoluteFill style={{ background: BG.redGlow, opacity: glow * 0.9 }} />

      {/* success lines */}
      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center", padding: 120 }}
      >
        <Sequence from={pre.from} durationInFrames={pre.dur} name="smart-pre" layout="none">
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 120 }}>
            <KineticText
              text={CLOSING.smartLinePre.text}
              fontSize={72}
              weight={700}
              color={COLORS.lightGray}
              align="center"
              stagger={2.5}
            />
          </AbsoluteFill>
        </Sequence>
        <Sequence from={acc.from} durationInFrames={acc.dur} name="smart-acc" layout="none">
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 120 }}>
            <KineticText
              text={CLOSING.smartLineAccent.text}
              fontSize={96}
              weight={800}
              color={COLORS.red}
              align="center"
              stagger={3}
            />
          </AbsoluteFill>
        </Sequence>
      </AbsoluteFill>

      {/* bumper */}
      <Sequence from={bumperFrom} durationInFrames={bumperDur} name="bumper" layout="none">
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 44,
          }}
        >
          <LogoReveal logoWidth={640} panelWidth={780} panelHeight={320} />
          <BumperText tagFrom={tag.from} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

const BumperText: React.FC<{ tagFrom: number }> = ({ tagFrom }) => {
  const frame = useCurrentFrame();
  const nameOpacity = interpolate(frame, [10, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameY = interpolate(frame, [10, 24], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: FONTS.primary,
          fontSize: 66,
          fontWeight: 800,
          color: COLORS.white,
          letterSpacing: -1,
          opacity: nameOpacity,
          translate: `0 ${nameY}px`,
        }}
      >
        {CLOSING.bumperName.text}
      </div>
      <Sequence from={tagFrom} name="tag" layout="none">
        <TagLine />
      </Sequence>
    </div>
  );
};

const TagLine: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 12], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });
  return (
    <div
      style={{
        marginTop: 16,
        fontFamily: FONTS.secondary,
        fontSize: 40,
        fontWeight: 600,
        color: COLORS.red,
        letterSpacing: 1,
        opacity: o,
        translate: `0 ${y}px`,
      }}
    >
      {CLOSING.bumperTag.text}
    </div>
  );
};
