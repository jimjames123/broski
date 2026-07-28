import React from "react";
import { SCREEN_H, SCREEN_W } from "./theme";

// A clean phone mockup. Children are rendered at logical SCREEN_W x SCREEN_H
// and scaled to `width`.
export const PhoneFrame: React.FC<{
  width: number;
  children: React.ReactNode;
}> = ({ width, children }) => {
  const bezel = width * 0.03;
  const radius = width * 0.135;
  const screenW = width - bezel * 2;
  const screenH = (screenW * SCREEN_H) / SCREEN_W;
  const scale = screenW / SCREEN_W;

  return (
    <div
      style={{
        width,
        height: screenH + bezel * 2,
        borderRadius: radius,
        background: "linear-gradient(160deg, #2b2b30 0%, #0c0c0e 100%)",
        padding: bezel,
        boxShadow:
          "0 40px 90px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.35), inset 0 0 0 2px rgba(255,255,255,0.06)",
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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: SCREEN_W,
            height: SCREEN_H,
            transformOrigin: "top left",
            scale,
          }}
        >
          {children}
        </div>
        {/* Dynamic island */}
        <div
          style={{
            position: "absolute",
            top: screenW * 0.03,
            left: "50%",
            translate: "-50% 0",
            width: screenW * 0.3,
            height: screenW * 0.085,
            borderRadius: 999,
            backgroundColor: "#000",
            zIndex: 50,
          }}
        />
      </div>
    </div>
  );
};
