import React from "react";
import { FONTS, COLORS } from "../theme";
import { MastercardMark } from "./icons";

// A stylized Mastercard debit card. `shine` (0..1) sweeps a highlight across.
export const CardMockup: React.FC<{ width: number; shine?: number }> = ({
  width,
  shine = -1,
}) => {
  const height = width / 1.586;
  const pad = width * 0.06;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: width * 0.05,
        background:
          "linear-gradient(135deg, #f6f7f9 0%, #dfe2e6 40%, #c9ced4 60%, #eef0f2 100%)",
        boxShadow:
          "0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.8)",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONTS.secondary,
        color: "#2b2f36",
      }}
    >
      {/* Afriland red corner accent */}
      <div
        style={{
          position: "absolute",
          top: pad,
          left: pad,
          width: width * 0.05,
          height: width * 0.05,
          borderRadius: 6,
          background: COLORS.red,
        }}
      />
      {/* Debit label */}
      <div
        style={{
          position: "absolute",
          top: pad,
          right: pad,
          fontSize: width * 0.045,
          fontWeight: 600,
          color: "#6b7078",
        }}
      >
        Debit
      </div>

      {/* chip + contactless */}
      <div
        style={{
          position: "absolute",
          top: height * 0.34,
          left: pad,
          display: "flex",
          alignItems: "center",
          gap: width * 0.03,
        }}
      >
        <div
          style={{
            width: width * 0.11,
            height: width * 0.085,
            borderRadius: 6,
            background: "linear-gradient(135deg,#d9b96a,#b8912f)",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
          }}
        />
        <svg width={width * 0.06} height={width * 0.08} viewBox="0 0 24 32">
          {[6, 11, 16].map((r, i) => (
            <path
              key={i}
              d={`M4 ${16 - r} A ${r} ${r} 0 0 1 4 ${16 + r}`}
              fill="none"
              stroke="#8b9099"
              strokeWidth={2}
            />
          ))}
        </svg>
      </div>

      {/* number */}
      <div
        style={{
          position: "absolute",
          bottom: height * 0.28,
          left: pad,
          fontSize: width * 0.072,
          fontWeight: 600,
          letterSpacing: 2,
          color: "#3a3f47",
          fontFamily: FONTS.primary,
        }}
      >
        5427 2775 0000 0000
      </div>

      {/* valid / name */}
      <div
        style={{
          position: "absolute",
          bottom: height * 0.09,
          left: pad,
          fontSize: width * 0.045,
          fontWeight: 600,
          color: "#4a4f57",
        }}
      >
        <span style={{ color: "#8a8f97", marginRight: width * 0.03 }}>03/29</span>
        CUSTOMER NAME
      </div>

      {/* mastercard */}
      <div style={{ position: "absolute", bottom: height * 0.09, right: pad }}>
        <MastercardMark size={width * 0.14} />
      </div>

      {/* shine sweep */}
      {shine >= 0 && shine <= 1 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${shine * 140 - 30}%`,
            width: "22%",
            background:
              "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
            transform: "skewX(-18deg)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};
