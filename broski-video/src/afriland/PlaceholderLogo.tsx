import { AbsoluteFill } from "remotion";
import { COLORS, FONTS } from "./theme";
import { LOGO_PLACEHOLDER } from "./copy";

/**
 * PLACEHOLDER logo — rendered once to public/afriland/logo.png so the reveal
 * and bumper compose correctly before the real transparent logo.png is
 * supplied. It echoes the brand lockup (ring mark + wordmark + red rule) but
 * is NOT the official artwork. Replace public/afriland/logo.png with the real
 * file and re-render; nothing else needs to change.
 */
export const PlaceholderLogo: React.FC = () => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
      fontFamily: FONTS.primary,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
      {/* ring mark on a red tile */}
      <div
        style={{
          width: 150,
          height: 150,
          background: COLORS.red,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <svg width={126} height={126} viewBox="0 0 100 100">
          {/* nested grayscale C-rings echoing the Afriland mark */}
          {[
            { r: 43, c: COLORS.black, w: 10 },
            { r: 32, c: COLORS.lightGray, w: 9 },
            { r: 21, c: COLORS.darkGray, w: 9 },
          ].map((ring, i) => (
            <path
              key={i}
              d={`M 50 ${50 - ring.r} A ${ring.r} ${ring.r} 0 1 0 ${50 + ring.r} 50`}
              fill="none"
              stroke={ring.c}
              strokeWidth={ring.w}
            />
          ))}
          <circle cx={73} cy={50} r={7.5} fill={COLORS.red} />
        </svg>
      </div>
      {/* wordmark */}
      <div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: COLORS.black,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          {LOGO_PLACEHOLDER.line1}
        </div>
        <div style={{ height: 8, background: COLORS.red, margin: "10px 0 8px" }} />
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: COLORS.black,
            letterSpacing: 1,
          }}
        >
          {LOGO_PLACEHOLDER.line2}
        </div>
      </div>
    </div>
  </AbsoluteFill>
);
