import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "./theme";
import { SPRINGS, springAt } from "./motion";

/**
 * Kinetic typography: each word masks-in and rises individually with a tuned
 * spring and staggered timing (never a static text block, never linear).
 * Caller wraps this in a <Sequence> so local frame 0 = the moment it appears.
 */
export const KineticText: React.FC<{
  text: string;
  fontSize: number;
  color?: string;
  weight?: number;
  font?: string;
  lineHeight?: number;
  letterSpacing?: number;
  align?: "left" | "center" | "right";
  maxWidth?: number;
  stagger?: number; // frames between words
  lifetime?: number; // frames; if set, fades out over its final frames
  uppercase?: boolean;
}> = ({
  text,
  fontSize,
  color = COLORS.white,
  weight = 700,
  font = FONTS.primary,
  lineHeight = 1.05,
  letterSpacing = -0.5,
  align = "left",
  maxWidth,
  stagger = 2.5,
  lifetime,
  uppercase,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  const groupFade =
    lifetime != null
      ? interpolate(frame, [lifetime - 10, lifetime], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: `0 ${fontSize * 0.28}px`,
        justifyContent:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        maxWidth,
        fontFamily: font,
        fontWeight: weight,
        fontSize,
        lineHeight,
        letterSpacing,
        color,
        textTransform: uppercase ? "uppercase" : "none",
        opacity: groupFade,
      }}
    >
      {words.map((w, i) => {
        const p = springAt(frame, fps, i * stagger, SPRINGS.entrance);
        const y = interpolate(p, [0, 1], [108, 0]); // % of line height, masked
        const o = interpolate(p, [0, 0.6], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              paddingBottom: fontSize * 0.14,
              marginBottom: -fontSize * 0.14,
              verticalAlign: "top",
            }}
          >
            <span
              style={{
                display: "inline-block",
                translate: `0 ${y}%`,
                opacity: o,
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
};
