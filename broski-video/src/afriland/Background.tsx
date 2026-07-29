import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BG, COLORS } from "./theme";

/**
 * Reusable layered background (rendered once at the composition root so the
 * grade is continuous across every segment). Three parallax layers:
 *   back  — base graphite gradient, very slow scale drift
 *   mid   — large soft blurred shapes drifting at their own rate (depth)
 *   front — vignette so edges fall off, reads as intentional grading
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // slow, non-linear drift for the whole field
  const driftY = interpolate(frame, [0, 1246], [0, -60]);
  const bgScale = interpolate(frame, [0, 1246], [1.05, 1.14]);

  const blob = (
    x: number,
    y: number,
    size: number,
    color: string,
    rate: number,
    phase: number,
  ) => {
    const dx = Math.sin((frame + phase) / (90 * rate)) * 40 * rate;
    const dy = Math.cos((frame + phase) / (110 * rate)) * 34 * rate;
    return (
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          filter: "blur(90px)",
          translate: `${dx}px ${dy + driftY * rate}px`,
        }}
      />
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, overflow: "hidden" }}>
      {/* back layer */}
      <AbsoluteFill style={{ background: BG.base, scale: `${bgScale}` }} />
      {/* mid layer — depth shapes */}
      <AbsoluteFill>
        {blob(18, 20, 620, "rgba(117,120,123,0.30)", 1.0, 0)}
        {blob(78, 34, 520, "rgba(117,120,123,0.22)", 1.5, 120)}
        {blob(60, 82, 700, "rgba(45,41,38,0.55)", 0.8, 240)}
        {blob(30, 70, 480, "rgba(239,51,64,0.10)", 1.2, 60)}
      </AbsoluteFill>
      {/* front vignette */}
      <AbsoluteFill style={{ background: BG.vignette }} />
    </AbsoluteFill>
  );
};
