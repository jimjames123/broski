import React from "react";
import { Img, staticFile } from "remotion";

/**
 * The client's cultural motif assets are JPEGs on a WHITE background (no
 * alpha). We key the white out at render time with `invert(1)` + `screen`
 * blend, so the motif reads as an elegant light mark over the dark grade.
 * `tint` optionally recolours it (e.g. brand red) via an extra masked layer.
 */
const keyed = (opacity: number): React.CSSProperties => ({
  // invert: dark motif on white -> light motif on black
  // grayscale: neutralise the coloured accents (they'd invert to cyan)
  // brightness: lift the motif so it reads clearly on the dark grade
  filter: "invert(1) grayscale(1) brightness(1.15)",
  mixBlendMode: "screen",
  opacity,
});

// Horizontal decorative band (pattern-band.png) tiled across a width.
export const PatternBand: React.FC<{
  width: number | string;
  height: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({ width, height, opacity = 0.55, style }) => (
  <div
    style={{
      width,
      height,
      backgroundImage: `url(${staticFile("afriland/pattern-band.png")})`,
      backgroundRepeat: "repeat-x",
      backgroundSize: "auto 100%",
      backgroundPosition: "center",
      ...keyed(opacity),
      ...style,
    }}
  />
);

// Vertical decorative strip (chic_pattern.png) tiled down a height.
export const PatternStrip: React.FC<{
  width: number;
  height: number | string;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({ width, height, opacity = 0.5, style }) => (
  <div
    style={{
      width,
      height,
      backgroundImage: `url(${staticFile("afriland/chic_pattern.png")})`,
      backgroundRepeat: "repeat-y",
      backgroundSize: "100% auto",
      backgroundPosition: "center",
      ...keyed(opacity),
      ...style,
    }}
  />
);

// A single motif image (head_pattern / chic_pattern), keyed onto the dark bg.
export const PatternMotif: React.FC<{
  src: "head_pattern.png" | "chic_pattern.png";
  width: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({ src, width, opacity = 0.5, style }) => (
  <Img
    src={staticFile(`afriland/${src}`)}
    style={{ width, ...keyed(opacity), ...style }}
  />
);
