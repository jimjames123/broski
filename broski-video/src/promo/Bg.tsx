import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT, theme } from "./theme";
import { TribalPattern } from "./TribalPattern";

// Shared branded backdrop: deep-red gradient, tribal weave, drifting glow.
export const BrandBackground: React.FC<{ light?: boolean }> = ({ light }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 300], [0, 40]);
  return (
    <AbsoluteFill
      style={{
        background: light
          ? `linear-gradient(165deg, ${theme.redPrimary} 0%, ${theme.redDeep} 60%, ${theme.redDeeper} 100%)`
          : `linear-gradient(165deg, ${theme.redDeep} 0%, ${theme.redDeeper} 55%, ${theme.redNight} 100%)`,
        fontFamily: FONT,
      }}
    >
      <TribalPattern color="#F0B48A" opacity={0.14} scale={1.6} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 40% at ${50 + drift * 0.1}% ${
            22 + drift * 0.15
          }%, rgba(255,120,120,0.35) 0%, rgba(255,120,120,0) 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 90% at 50% 120%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 55%)",
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 260px rgba(0,0,0,0.5)",
        }}
      />
    </AbsoluteFill>
  );
};
