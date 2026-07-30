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

const SILVER = "#D7D1E0";
const MUTED = "rgba(215,209,224,0.5)";
const FAINT = "rgba(215,209,224,0.16)";
const MONO = "'Geist', monospace";

const font = (name: string, file: string) =>
  `@font-face{font-family:'${name}';src:url('${staticFile(
    "fonts/" + file,
  )}') format('truetype');font-display:block;}`;

const FONT_CSS =
  font("Gloock", "Gloock-Regular.ttf") +
  font("Italiana", "Italiana-Regular.ttf") +
  font("Geist", "GeistMono-Regular.ttf");

export const PoutePosterProduct: React.FC = () => {
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => {
    const load = async () => {
      const defs: [string, string][] = [
        ["Gloock", "Gloock-Regular.ttf"],
        ["Italiana", "Italiana-Regular.ttf"],
        ["Geist", "GeistMono-Regular.ttf"],
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

  // vertical geometry
  const capTop = 372;
  const capBot = 540;
  const stemBot = 612;
  const appTop = 606;
  const appBot = 742;
  const tubeTop = 792;
  const tubeBot = 1236;
  const half = 86;

  return (
    <AbsoluteFill style={{ backgroundColor: "#060309" }}>
      <style>{FONT_CSS}</style>

      {/* ambient violet aura + vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(46% 40% at 50% 40%, rgba(122,43,224,0.30) 0%, rgba(60,21,128,0.12) 42%, rgba(6,3,9,0) 72%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 92% at 50% 46%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="tube" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0C0516" />
            <stop offset="30%" stopColor="#331659" />
            <stop offset="45%" stopColor="#5A2A9C" />
            <stop offset="52%" stopColor="#2E1450" />
            <stop offset="72%" stopColor="#180A2C" />
            <stop offset="100%" stopColor="#070309" />
          </linearGradient>
          <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#090411" />
            <stop offset="34%" stopColor="#241041" />
            <stop offset="47%" stopColor="#3C1C6B" />
            <stop offset="60%" stopColor="#1C0D34" />
            <stop offset="100%" stopColor="#060209" />
          </linearGradient>
          <radialGradient id="applicator" cx="0.38" cy="0.30" r="0.9">
            <stop offset="0%" stopColor="#F2E4FF" />
            <stop offset="16%" stopColor="#CB9EFF" />
            <stop offset="42%" stopColor="#8E4EE8" />
            <stop offset="72%" stopColor="#4E2192" />
            <stop offset="100%" stopColor="#1C0A3A" />
          </radialGradient>
          <linearGradient id="thread" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A46BF0" />
            <stop offset="100%" stopColor="#5B2AAE" />
          </linearGradient>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5b5566" />
            <stop offset="50%" stopColor="#c9c3d6" />
            <stop offset="100%" stopColor="#4a4553" />
          </linearGradient>
          <radialGradient id="refl2" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(138,63,240,0.5)" />
            <stop offset="100%" stopColor="rgba(138,63,240,0)" />
          </radialGradient>
          <filter id="b6"><feGaussianBlur stdDeviation="6" /></filter>
          <filter id="b18"><feGaussianBlur stdDeviation="18" /></filter>
          <filter id="b34"><feGaussianBlur stdDeviation="34" /></filter>
        </defs>

        {/* ground reflection */}
        <ellipse cx={CX} cy={tubeBot + 42} rx={150} ry={40} fill="url(#refl2)" filter="url(#b34)" />

        {/* ---- TUBE ---- */}
        <rect x={CX - half} y={tubeTop} width={half * 2} height={tubeBot - tubeTop} rx={26} fill="url(#tube)" />
        {/* mouth ring */}
        <rect x={CX - half - 4} y={tubeTop - 10} width={half * 2 + 8} height={22} rx={8} fill="url(#metal)" />
        <rect x={CX - half + 10} y={tubeTop + 2} width={half * 2 - 20} height={12} rx={6} fill="#0A0412" />
        {/* base ring */}
        <rect x={CX - half} y={tubeBot - 40} width={half * 2} height={40} rx={20} fill="#0A0412" opacity={0.65} />
        {/* vertical gloss highlight on tube */}
        <rect x={CX - 44} y={tubeTop + 24} width={16} height={tubeBot - tubeTop - 90} rx={8} fill="#EAD9FF" opacity={0.35} filter="url(#b6)" />
        {/* POUTE embossed label */}
        <text x={CX} y={1024} textAnchor="middle" fill="#CDB8F0" opacity={0.9} style={{ fontFamily: "'Italiana', serif", fontSize: 34, letterSpacing: 8 }}>
          POUTE
        </text>
        <text x={CX} y={1064} textAnchor="middle" fill={MUTED} style={{ fontFamily: MONO, fontSize: 15, letterSpacing: 5 }}>
          N° 07
        </text>

        {/* ---- CAP + WAND (lifted) ---- */}
        <rect x={CX - half} y={capTop} width={half * 2} height={capBot - capTop} rx={26} fill="url(#cap)" />
        {/* purple metallic band on cap */}
        <rect x={CX - half} y={capBot - 30} width={half * 2} height={16} fill="#7A2BE0" opacity={0.85} />
        <rect x={CX - 40} y={capTop + 16} width={14} height={capBot - capTop - 60} rx={7} fill="#D7C4FF" opacity={0.3} filter="url(#b6)" />
        {/* stem */}
        <rect x={CX - 8} y={capBot - 14} width={16} height={stemBot - capBot + 20} fill="url(#metal)" />

        {/* doe-foot applicator, gloss-coated */}
        <path
          d={`M ${CX} ${appTop}
              C ${CX - 40} ${appTop + 20}, ${CX - 46} ${appTop + 78}, ${CX - 30} ${appBot - 14}
              C ${CX - 16} ${appBot + 10}, ${CX + 16} ${appBot + 10}, ${CX + 30} ${appBot - 14}
              C ${CX + 46} ${appTop + 78}, ${CX + 40} ${appTop + 20}, ${CX} ${appTop} Z`}
          fill="url(#applicator)"
        />
        <ellipse cx={CX - 13} cy={appTop + 44} rx={12} ry={20} fill="#FBF3FF" opacity={0.85} filter="url(#b6)" />
        <ellipse cx={CX - 10} cy={appTop + 36} rx={5} ry={9} fill="#ffffff" opacity={0.95} />
        {/* cap specular */}
        <rect x={CX - 62} y={capTop + 14} width={7} height={capBot - capTop - 62} rx={4} fill="#ffffff" opacity={0.5} filter="url(#b6)" />

        {/* stretchy gloss thread from applicator to tube mouth */}
        <path
          d={`M ${CX - 12} ${appBot - 6}
              C ${CX - 16} ${appBot + 34}, ${CX - 8} ${tubeTop - 22}, ${CX - 10} ${tubeTop + 2}
              L ${CX + 10} ${tubeTop + 2}
              C ${CX + 8} ${tubeTop - 22}, ${CX + 16} ${appBot + 34}, ${CX + 12} ${appBot - 6} Z`}
          fill="url(#thread)"
        />
        <rect x={CX - 3} y={appBot} width={3} height={tubeTop - appBot} fill="#EAD9FF" opacity={0.5} filter="url(#b6)" />
        {/* small gloss bead on the tip */}
        <ellipse cx={CX} cy={appBot + 2} rx={16} ry={13} fill="url(#applicator)" />
        <ellipse cx={CX - 5} cy={appBot - 3} rx={5} ry={4} fill="#fff" opacity={0.9} />

        {/* side measure ticks */}
        <line x1={CX - half - 150} y1={capTop} x2={CX - half - 120} y2={capTop} stroke={MUTED} strokeWidth={1.5} />
        <line x1={CX - half - 150} y1={tubeBot} x2={CX - half - 120} y2={tubeBot} stroke={MUTED} strokeWidth={1.5} />
        <line x1={CX - half - 135} y1={capTop} x2={CX - half - 135} y2={tubeBot} stroke={FAINT} strokeWidth={1.5} strokeDasharray="2 12" />
      </svg>

      {/* clinical top row */}
      <Row y={104}>
        <span style={mono}>POUTE — MAISON DE BRILLANCE</span>
        <span style={mono}>N° 07</span>
      </Row>

      {/* hero micro-annotations */}
      <div style={{ position: "absolute", left: CX + half + 96, top: 596, ...micro }}>
        λ 380–420 NM
        <div style={microSub}>SPECULAR — ULTRAVIOLET</div>
      </div>
      <div style={{ position: "absolute", left: CX - half - 380, top: 620, width: 260, textAlign: "right", ...micro }}>
        DOE-FOOT
        <div style={microSub}>APPLICATEUR</div>
      </div>

      {/* wordmark */}
      <div style={{ position: "absolute", top: 1358, left: 0, width: W, textAlign: "center" }}>
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
        <div style={{ marginTop: 26, fontFamily: "'Italiana', serif", fontSize: 40, letterSpacing: 18, color: SILVER, paddingLeft: 18 }}>
          HIGH-SHINE LIP LACQUER
        </div>
      </div>

      <div style={{ position: "absolute", left: 300, right: 300, top: 1826, height: 1, background: FAINT }} />

      <Row y={1874}>
        <span style={mono}>SHADE · ULTRAVIOLET</span>
        <span style={mono}>NET 6.5 ML ⁄ 0.22 FL OZ</span>
        <span style={mono}>MMXXV</span>
      </Row>

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

const mono: React.CSSProperties = { fontFamily: MONO, fontSize: 20, letterSpacing: 4, color: MUTED };
const micro: React.CSSProperties = { fontFamily: MONO, fontSize: 17, letterSpacing: 3, color: "rgba(215,209,224,0.64)" };
const microSub: React.CSSProperties = { fontSize: 13, letterSpacing: 2, color: "rgba(215,209,224,0.34)", marginTop: 5 };

const Row: React.FC<{ y: number; children: React.ReactNode }> = ({ y, children }) => (
  <div style={{ position: "absolute", left: 110, right: 110, top: y, display: "flex", justifyContent: "space-between" }}>
    {children}
  </div>
);
