import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "./theme";
import { SPRINGS, springAt } from "./motion";

/**
 * Logo reveal on a clean light panel: the panel springs in, the logo is
 * unmasked left-to-right led by a sweeping brand-red bar (matching the logo's
 * red rule), then settles. Used for the transition beat and the closing bumper.
 * Local frame 0 = reveal start (caller wraps in a Sequence).
 */
export const LogoReveal: React.FC<{
  logoWidth: number;
  panelWidth: number;
  panelHeight: number;
}> = ({ logoWidth, panelWidth, panelHeight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panel = springAt(frame, fps, 0, SPRINGS.entrance);
  const panelScale = interpolate(panel, [0, 1], [0.86, 1]);
  const panelOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // wipe reveal of the logo, led by a red sweep bar
  const wipe = springAt(frame, fps, 6, SPRINGS.soft); // 0..1
  const rightInset = interpolate(wipe, [0, 1], [100, 0]);
  const barX = interpolate(wipe, [0, 1], [0, 100]);
  const barOpacity = interpolate(wipe, [0.75, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoSettle = interpolate(wipe, [0, 1], [1.06, 1]);

  return (
    <div
      style={{
        width: panelWidth,
        height: panelHeight,
        background: COLORS.white,
        borderRadius: 26,
        boxShadow: "0 40px 90px rgba(0,0,0,0.45)",
        transform: `scale(${panelScale})`,
        opacity: panelOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          clipPath: `inset(0 ${rightInset}% 0 0)`,
          transform: `scale(${logoSettle})`,
        }}
      >
        <Img src={staticFile("afriland/logo.png")} style={{ width: logoWidth }} />
      </div>
      {/* sweeping red bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${barX}%`,
          width: 8,
          background: COLORS.red,
          opacity: barOpacity,
          boxShadow: `0 0 24px ${COLORS.red}`,
        }}
      />
    </div>
  );
};
