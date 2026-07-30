import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";

const W = 1600;
const H = 2000;
const CX = 800;
const CY = 742;
const R = 300;

const SILVER = "#D7D1E0";
const MUTED = "rgba(215,209,224,0.46)";
const FAINT = "rgba(215,209,224,0.16)";

const font = (name: string, file: string) =>
  `@font-face{font-family:'${name}';src:url('${staticFile(
    "fonts/" + file,
  )}') format('truetype');font-display:block;}`;

const FONT_CSS =
  font("Gloock", "Gloock-Regular.ttf") +
  font("Italiana", "Italiana-Regular.ttf") +
  font("Geist", "GeistMono-Regular.ttf") +
  font("Poiret", "PoiretOne-Regular.ttf");

const MONO = "'Geist', monospace";

export const PoutePoster: React.FC = () => {
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => {
    const load = async () => {
      const defs: [string, string][] = [
        ["Gloock", "Gloock-Regular.ttf"],
        ["Italiana", "Italiana-Regular.ttf"],
        ["Geist", "GeistMono-Regular.ttf"],
        ["Poiret", "PoiretOne-Regular.ttf"],
      ];
      await Promise.all(
        defs.map(async ([n, f]) => {
          const face = new FontFace(n, `url(${staticFile("fonts/" + f)})`);
          await face.load();
          document.fonts.add(face);
        }),
      );
      await document.fonts.ready;
      continueRender(handle);
    };
    load().catch((e) => cancelRender(e));
  }, [handle]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#060309" }}>
      <style>{FONT_CSS}</style>

      {/* ambient violet aura + vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(52% 34% at 50% 34%, rgba(122,43,224,0.30) 0%, rgba(60,21,128,0.12) 40%, rgba(6,3,9,0) 72%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 90% at 50% 46%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* ---- hero artwork ---- */}
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="sphere" cx="0.37" cy="0.30" r="0.85">
            <stop offset="0%" stopColor="#F3E6FF" />
            <stop offset="13%" stopColor="#CFA6FF" />
            <stop offset="33%" stopColor="#9C5DF1" />
            <stop offset="56%" stopColor="#6A2EC9" />
            <stop offset="78%" stopColor="#3B1580" />
            <stop offset="100%" stopColor="#140626" />
          </radialGradient>
          <radialGradient id="drip" cx="0.4" cy="0.28" r="0.9">
            <stop offset="0%" stopColor="#D9AEFF" />
            <stop offset="40%" stopColor="#8544DE" />
            <stop offset="100%" stopColor="#25104F" />
          </radialGradient>
          <radialGradient id="refl" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(138,63,240,0.55)" />
            <stop offset="100%" stopColor="rgba(138,63,240,0)" />
          </radialGradient>
          <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="softer" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="30" />
          </filter>
          <clipPath id="orbClip">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
        </defs>

        {/* concentric registration rings */}
        <circle cx={CX} cy={CY} r={R + 78} fill="none" stroke={FAINT} strokeWidth={1.5} />
        <circle
          cx={CX}
          cy={CY}
          r={R + 150}
          fill="none"
          stroke={FAINT}
          strokeWidth={1.5}
          strokeDasharray="2 12"
        />
        {/* cardinal ticks */}
        {[
          [CX, CY - R - 150, CX, CY - R - 120],
          [CX, CY + R + 120, CX, CY + R + 150],
          [CX - R - 150, CY, CX - R - 120, CY],
          [CX + R + 120, CY, CX + R + 150, CY],
        ].map((t, i) => (
          <line key={i} x1={t[0]} y1={t[1]} x2={t[2]} y2={t[3]} stroke={MUTED} strokeWidth={1.5} />
        ))}

        {/* ground reflection */}
        <ellipse cx={CX} cy={CY + R + 250} rx={R * 0.82} ry={46} fill="url(#refl)" filter="url(#softer)" />

        {/* viscous gloss drip below */}
        <path
          d={`M ${CX} ${CY + R - 14}
              C ${CX - 10} ${CY + R + 42}, ${CX - 48} ${CY + R + 84}, ${CX - 42} ${CY + R + 132}
              C ${CX - 37} ${CY + R + 176}, ${CX + 37} ${CY + R + 176}, ${CX + 42} ${CY + R + 132}
              C ${CX + 48} ${CY + R + 84}, ${CX + 10} ${CY + R + 42}, ${CX} ${CY + R - 14} Z`}
          fill="url(#drip)"
        />
        <ellipse cx={CX - 13} cy={CY + R + 120} rx={10} ry={17} fill="#F3E7FF" opacity={0.8} filter="url(#soft)" />

        {/* main sphere */}
        <circle cx={CX} cy={CY} r={R} fill="url(#sphere)" />

        {/* inner light play (clipped to sphere) */}
        <g clipPath="url(#orbClip)">
          {/* core shadow lower area */}
          <ellipse cx={CX + 30} cy={CY + R * 0.62} rx={R * 1.05} ry={R * 0.8} fill="#0A0316" opacity={0.5} filter="url(#softer)" />
          {/* reflected rim light hugging the lower-right edge */}
          <ellipse cx={CX + R * 0.66} cy={CY + R * 0.64} rx={118} ry={94} fill="#A96BFF" opacity={0.42} filter="url(#softer)" />
          {/* upper-left glossy sheen band */}
          <ellipse cx={CX - R * 0.28} cy={CY - R * 0.42} rx={185} ry={120} fill="#F1E4FF" opacity={0.35} filter="url(#softer)" />
          {/* soft specular */}
          <ellipse cx={CX - R * 0.32} cy={CY - R * 0.4} rx={72} ry={44} fill="#FBF4FF" opacity={0.92} filter="url(#soft)" />
          {/* sharp specular star */}
          <ellipse cx={CX - R * 0.3} cy={CY - R * 0.44} rx={17} ry={10} fill="#ffffff" />
        </g>
        {/* crisp rim highlight arc */}
        <path
          d={`M ${CX + R * 0.62} ${CY + R * 0.78} A ${R} ${R} 0 0 0 ${CX + R * 0.98} ${CY + R * 0.18}`}
          fill="none"
          stroke="#C79BFF"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.55}
          filter="url(#soft)"
        />
      </svg>

      {/* ---- clinical top row ---- */}
      <Row y={104}>
        <span style={monoLabel}>POUTE — MAISON DE BRILLANCE</span>
        <span style={monoLabel}>N° 07</span>
      </Row>

      {/* hero micro-annotations */}
      <div style={{ position: "absolute", left: CX + R + 96, top: CY - 26, ...micro }}>
        λ 380–420 NM
        <div style={{ ...microSub }}>SPECULAR — ULTRAVIOLET</div>
      </div>
      <div style={{ position: "absolute", left: CX - R - 250, top: CY - 12, width: 150, textAlign: "right", ...micro }}>
        VISCOSITÉ
        <div style={{ ...microSub }}>HAUTE BRILLANCE</div>
      </div>

      {/* ---- wordmark ---- */}
      <div
        style={{
          position: "absolute",
          top: 1360,
          left: 0,
          width: W,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Gloock', serif",
            fontSize: 300,
            lineHeight: 1,
            letterSpacing: 2,
            background: "linear-gradient(180deg,#F4EFFA 0%,#CFC7DD 52%,#9C86C4 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 0 40px rgba(138,63,240,0.25))",
          }}
        >
          Poute
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: "'Italiana', serif",
            fontSize: 40,
            letterSpacing: 18,
            color: SILVER,
            paddingLeft: 18,
          }}
        >
          HIGH-SHINE LIP LACQUER
        </div>
      </div>

      {/* thin baseline rule */}
      <div style={{ position: "absolute", left: 300, right: 300, top: 1826, height: 1, background: FAINT }} />

      {/* ---- clinical bottom row ---- */}
      <Row y={1874}>
        <span style={monoLabel}>SHADE · ULTRAVIOLET</span>
        <span style={monoLabel}>NET 6.5 ML ⁄ 0.22 FL OZ</span>
        <span style={monoLabel}>MMXXV</span>
      </Row>

      {/* corner registration crosses */}
      {[
        [72, 72],
        [W - 72, 72],
        [72, H - 72],
        [W - 72, H - 72],
      ].map(([x, y], i) => (
        <div key={i} style={{ position: "absolute", left: x - 9, top: y - 9, width: 18, height: 18 }}>
          <div style={{ position: "absolute", left: 8, top: 0, width: 1, height: 18, background: MUTED }} />
          <div style={{ position: "absolute", left: 0, top: 8, width: 18, height: 1, background: MUTED }} />
        </div>
      ))}
    </AbsoluteFill>
  );
};

const monoLabel: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 20,
  letterSpacing: 4,
  color: MUTED,
};
const micro: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 17,
  letterSpacing: 3,
  color: "rgba(215,209,224,0.64)",
};
const microSub: React.CSSProperties = {
  fontSize: 13,
  letterSpacing: 2,
  color: "rgba(215,209,224,0.34)",
  marginTop: 5,
};

const Row: React.FC<{ y: number; children: React.ReactNode }> = ({ y, children }) => (
  <div
    style={{
      position: "absolute",
      left: 110,
      right: 110,
      top: y,
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    {children}
  </div>
);
