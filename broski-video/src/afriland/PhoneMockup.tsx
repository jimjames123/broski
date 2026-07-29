import {
  interpolate,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { SPRINGS, springAt } from "./motion";

/**
 * Phone mockup holding the real screen recording. It is never static:
 *  - entrance: rises + scales up with a 3D tilt that settles into place (spring)
 *  - hold: gentle floating drift + micro-parallax rotation
 *  - exit: lifts, tilts away and fades in the final frames
 * Caller sizes it and provides the Sequence duration via useVideoConfig.
 */
// A privacy redaction region in the RECORDING's native pixel coords (1320x2868).
export type NativeBox = { x: number; y: number; w: number; h: number };

export const PhoneMockup: React.FC<{
  width: number;
  src: string;
  lifeFrames: number; // how long this mockup is on screen (its Sequence length)
  startSec?: number; // trim the recording start
  playbackRate?: number;
  // Returns a box (in the recording's native pixels) to blur at a given
  // recording time, or null. Used to hide the account number as it scrolls.
  blurTrack?: (recSec: number) => NativeBox | null;
}> = ({ width, src, lifeFrames, startSec = 0, playbackRate = 1, blurTrack }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = lifeFrames;

  // recording is a portrait phone capture (1320x2868)
  const NATIVE_W = 1320;
  const screenAspect = 2868 / 1320;
  const bezel = width * 0.028;
  const radius = width * 0.13;
  const screenW = width - bezel * 2;
  const screenH = screenW * screenAspect;

  // -- entrance (spring settle) --
  const enter = springAt(frame, fps, 0, SPRINGS.settle);
  const enterY = interpolate(enter, [0, 1], [300, 0]);
  const enterScale = interpolate(enter, [0, 1], [0.82, 1]);
  const enterTilt = interpolate(enter, [0, 1], [-16, 0]); // rotateY settling
  const enterRotX = interpolate(enter, [0, 1], [10, 0]);
  const enterOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // -- floating hold (after entrance) --
  const floatY = Math.sin(frame / 38) * 9;
  const floatRotY = Math.sin(frame / 62) * 2.2;
  const floatRotX = Math.cos(frame / 72) * 1.4;

  // -- exit (final frames) --
  const exitLen = 22;
  const exitP = interpolate(
    frame,
    [durationInFrames - exitLen, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const exitY = interpolate(exitP, [0, 1], [0, -160]);
  const exitScale = interpolate(exitP, [0, 1], [1, 0.9]);
  const exitTilt = interpolate(exitP, [0, 1], [0, 14]);
  const exitOpacity = interpolate(exitP, [0, 1], [1, 0]);

  const rotY = enterTilt + floatRotY + exitTilt;
  const rotX = enterRotX + floatRotX;
  const ty = enterY + floatY + exitY;
  const scale = enterScale * exitScale;

  return (
    <div style={{ perspective: 1600 }}>
      <div
        style={{
          width,
          transform: `translateY(${ty}px) scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          opacity: enterOpacity * exitOpacity,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            width,
            height: screenH + bezel * 2,
            borderRadius: radius,
            background: "linear-gradient(150deg, #3a3a3f 0%, #0b0b0d 100%)",
            padding: bezel,
            boxShadow:
              "0 60px 120px rgba(0,0,0,0.55), 0 12px 30px rgba(0,0,0,0.4), inset 0 0 0 2px rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: screenW,
              height: screenH,
              borderRadius: radius - bezel,
              overflow: "hidden",
              backgroundColor: "#000",
            }}
          >
            <OffthreadVideo
              src={src}
              muted
              trimBefore={Math.round(startSec * fps)}
              playbackRate={playbackRate}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* privacy blur — hides the account number as the recording scrolls */}
            {(() => {
              if (!blurTrack) return null;
              const recSec = startSec + (frame / fps) * playbackRate;
              const b = blurTrack(recSec);
              if (!b) return null;
              const f = screenW / NATIVE_W; // native px -> screen px (uniform)
              return (
                <div
                  style={{
                    position: "absolute",
                    left: b.x * f,
                    top: b.y * f,
                    width: b.w * f,
                    height: b.h * f,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    background: "rgba(150,150,150,0.28)",
                    borderRadius: 6 * f,
                  }}
                />
              );
            })()}
            {/* screen sheen */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 35%)",
                pointerEvents: "none",
              }}
            />
            {/* dynamic island */}
            <div
              style={{
                position: "absolute",
                top: screenW * 0.03,
                left: "50%",
                transform: "translateX(-50%)",
                width: screenW * 0.32,
                height: screenW * 0.085,
                borderRadius: 999,
                background: "#000",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
