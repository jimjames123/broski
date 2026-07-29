import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "../fonts";
import { COLORS, FONTS } from "../theme";
import { PatternBand, PatternStrip, PatternMotif } from "../Patterns";
import { SPRINGS, springAt, EASE_OUT } from "../motion";
import { CardMockup } from "./CardMockup";
import {
  MastercardMark,
  PosIcon,
  TravelIcon,
  RestaurantIcon,
  FuelIcon,
  ShoppingIcon,
} from "./icons";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const CX = 540;
const CY = 940;

const NODES = [
  { x: 162, y: 684, label: "POS", Icon: PosIcon, delay: 60 },
  { x: 540, y: 582, label: "TRAVEL", Icon: TravelIcon, delay: 72 },
  { x: 918, y: 684, label: "RESTAURANT", Icon: RestaurantIcon, delay: 84 },
  { x: 232, y: 1232, label: "FUEL", Icon: FuelIcon, delay: 96 },
  { x: 848, y: 1232, label: "SHOPPING", Icon: ShoppingIcon, delay: 108 },
];

export const CardAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = springAt(frame, fps, 30, SPRINGS.settle);
  const cardScale = interpolate(cardSpring, [0, 1], [0.5, 1]);
  const cardY = interpolate(cardSpring, [0, 1], [120, 0]);
  const cardFloat = Math.sin(frame / 40) * 6;
  const shine = interpolate(frame, [52, 78], [0, 1], clamp);
  const shine2 = interpolate(frame, [210, 240], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: "#3A0710", fontFamily: FONTS.primary }}>
      {/* red brand background */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(160deg, #C8102E 0%, #7A0C1E 58%, #3A0710 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(60% 45% at 50% 42%, rgba(255,120,120,0.28) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      <AbsoluteFill style={{ boxShadow: "inset 0 0 300px rgba(0,0,0,0.55)" }} />

      {/* patterns (arrows in the brief) */}
      <div style={{ position: "absolute", top: 118, left: 0, right: 0 }}>
        <BandReveal />
      </div>
      <div
        style={{
          position: "absolute",
          left: 30,
          top: 700,
          bottom: 360,
          width: 54,
          opacity: interpolate(frame, [12, 34], [0, 1], clamp),
        }}
      >
        <PatternStrip width={54} height="100%" opacity={0.34} />
      </div>
      <PatternMotif
        src="chic_pattern.png"
        width={120}
        opacity={0.5}
        style={{
          position: "absolute",
          right: 70,
          top: 300,
          opacity: interpolate(frame, [20, 40], [0, 0.5], clamp),
        }}
      />

      {/* headline */}
      <div style={{ position: "absolute", top: 250, left: 78 }}>
        <StickerLine text="ONE CARD" fill="#141414" stroke="#ffffff" size={128} delay={10} />
        <div style={{ height: 6 }} />
        <StickerLine
          text="THOUSANDS OF POSSIBILITIES"
          fill="#ffffff"
          stroke="#141414"
          size={62}
          delay={20}
        />
        <div
          style={{
            marginTop: 14,
            fontFamily: FONTS.secondary,
            fontSize: 34,
            fontWeight: 700,
            color: "#ffe2e2",
            direction: "rtl",
            opacity: interpolate(frame, [30, 46], [0, 1], clamp),
          }}
        >
          بطاقة واحدة، آلاف الإمكانيات
        </div>
      </div>

      {/* mastercard mark top-right */}
      <div
        style={{
          position: "absolute",
          top: 250,
          right: 80,
          scale: `${springAt(frame, fps, 34, SPRINGS.entrance)}`,
          background: "#0c0c0e",
          padding: "22px 26px",
          borderRadius: 22,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
        }}
      >
        <MastercardMark size={92} />
        <div style={{ color: "#fff", fontFamily: FONTS.secondary, fontSize: 20, fontWeight: 600 }}>
          Mastercard
        </div>
      </div>

      {/* connector lines (draw outward from the card) */}
      <svg
        width={1080}
        height={1920}
        style={{ position: "absolute", inset: 0 }}
      >
        {NODES.map((n, i) => {
          const p = interpolate(
            frame,
            [n.delay - 12, n.delay + 6],
            [0, 1],
            { ...clamp, easing: EASE_OUT },
          );
          return (
            <g key={i}>
              <line
                x1={CX}
                y1={CY}
                x2={n.x}
                y2={n.y}
                stroke="rgba(255,255,255,0.55)"
                strokeWidth={3}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - p}
              />
              <circle cx={n.x} cy={n.y} r={5} fill="#fff" opacity={p} />
            </g>
          );
        })}
      </svg>

      {/* nodes */}
      {NODES.map((n, i) => (
        <Node key={i} {...n} />
      ))}

      {/* card */}
      <div
        style={{
          position: "absolute",
          left: CX,
          top: CY,
          translate: "-50% -50%",
          transform: `translateY(${cardY + cardFloat}px) scale(${cardScale}) rotate(-4deg)`,
          opacity: interpolate(frame, [30, 42], [0, 1], clamp),
        }}
      >
        <CardMockup width={540} shine={shine < 1 ? shine : shine2 < 1 ? shine2 : -1} />
      </div>

      {/* tagline */}
      <div style={{ position: "absolute", bottom: 150, left: 78, right: 78 }}>
        <StickerLine text="WHEREVER LIFE TAKES YOU," fill="#ffffff" stroke="#141414" size={58} delay={158} />
        <StickerLine text="YOUR MASTERCARD FOLLOWS." fill="#ffffff" stroke="#141414" size={58} delay={168} />
        <div
          style={{
            marginTop: 12,
            fontFamily: FONTS.secondary,
            fontSize: 30,
            fontWeight: 600,
            color: "#ffd9d9",
            direction: "rtl",
            opacity: interpolate(frame, [182, 200], [0, 1], clamp),
          }}
        >
          أينما تأخذك الحياة، ترافقك بطاقة ماستركارد الخاصة بك.
        </div>
      </div>

      {/* Afriland logo bumper (small, bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: interpolate(frame, [200, 220], [0, 1], clamp),
        }}
      >
        <div style={{ background: "#fff", borderRadius: 14, padding: "12px 26px" }}>
          <Img src={staticFile("afriland/logo.png")} style={{ width: 300 }} />
        </div>
      </div>

      <Audio src={staticFile("afriland/music.mp3")} volume={0.28} trimBefore={0} />
    </AbsoluteFill>
  );
};

const BandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, 2, SPRINGS.soft);
  return (
    <div style={{ transform: `scaleX(${p})`, transformOrigin: "center" }}>
      <PatternBand width="100%" height={44} opacity={0.6 * p} />
    </div>
  );
};

const Node: React.FC<{
  x: number;
  y: number;
  label: string;
  Icon: React.FC<{ size: number; color: string }>;
  delay: number;
}> = ({ x, y, label, Icon, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, delay, SPRINGS.entrance);
  const glow = 0.4 + Math.sin((frame - delay) / 18) * 0.2;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        translate: "-50% -50%",
        scale: `${interpolate(p, [0, 1], [0, 1])}`,
        opacity: p,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 116,
          height: 116,
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 35%, #2b2b30 0%, #0c0c0e 75%)",
          border: `2.5px solid ${COLORS.red}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 ${26 * glow}px rgba(239,51,64,${glow})`,
        }}
      >
        <Icon size={56} color="#fff" />
      </div>
      <div
        style={{
          fontFamily: FONTS.secondary,
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 1,
          color: "#fff",
          textShadow: "0 2px 6px rgba(0,0,0,0.5)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Outlined "sticker" headline line, words rising in with a spring, slight slant.
const StickerLine: React.FC<{
  text: string;
  fill: string;
  stroke: string;
  size: number;
  delay: number;
}> = ({ text, fill, stroke, size, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: `0 ${size * 0.22}px`,
        transform: "skewX(-7deg)",
      }}
    >
      {words.map((w, i) => {
        const p = springAt(frame, fps, delay + i * 3, SPRINGS.entrance);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontFamily: FONTS.primary,
              fontWeight: 800,
              fontSize: size,
              lineHeight: 1.02,
              color: fill,
              WebkitTextStroke: `${size * 0.06}px ${stroke}`,
              paintOrder: "stroke fill",
              opacity: p,
              translate: `0 ${interpolate(p, [0, 1], [40, 0])}px`,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
