import React from "react";

// A South-Sudanese-inspired ikat / diamond weave, echoing the app's header
// texture. Rendered as a tiling SVG so it stays crisp at any resolution.
export const TribalPattern: React.FC<{
  color?: string;
  opacity?: number;
  scale?: number;
}> = ({ color = "#E7A977", opacity = 0.25, scale = 1 }) => {
  const tile = 160 * scale;
  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, opacity }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="ikat"
          width={tile}
          height={tile * 0.62}
          patternUnits="userSpaceOnUse"
          patternTransform={`scale(1)`}
        >
          <g
            stroke={color}
            strokeWidth={2.4 * scale}
            fill="none"
            strokeLinejoin="miter"
          >
            {/* central concentric diamonds */}
            <path
              d={`M ${tile / 2} ${tile * 0.06} L ${tile * 0.86} ${tile * 0.31} L ${tile / 2} ${tile * 0.56} L ${tile * 0.14} ${tile * 0.31} Z`}
            />
            <path
              d={`M ${tile / 2} ${tile * 0.16} L ${tile * 0.72} ${tile * 0.31} L ${tile / 2} ${tile * 0.46} L ${tile * 0.28} ${tile * 0.31} Z`}
            />
            <path
              d={`M ${tile / 2} ${tile * 0.26} L ${tile * 0.6} ${tile * 0.31} L ${tile / 2} ${tile * 0.36} L ${tile * 0.4} ${tile * 0.31} Z`}
              fill={color}
            />
          </g>
          <g stroke={color} strokeWidth={2 * scale} strokeLinecap="round">
            {/* X motifs at the seams */}
            <path d={`M 0 0 L ${tile * 0.12} ${tile * 0.12}`} />
            <path d={`M ${tile * 0.12} 0 L 0 ${tile * 0.12}`} />
            <path d={`M ${tile} 0 L ${tile * 0.88} ${tile * 0.12}`} />
            <path d={`M ${tile * 0.88} 0 L ${tile} ${tile * 0.12}`} />
            <path d={`M 0 ${tile * 0.62} L ${tile * 0.12} ${tile * 0.5}`} />
            <path d={`M ${tile * 0.12} ${tile * 0.62} L 0 ${tile * 0.5}`} />
            <path d={`M ${tile} ${tile * 0.62} L ${tile * 0.88} ${tile * 0.5}`} />
            <path d={`M ${tile * 0.88} ${tile * 0.62} L ${tile} ${tile * 0.5}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ikat)" />
    </svg>
  );
};
