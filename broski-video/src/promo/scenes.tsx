import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "./theme";
import { BrandBackground } from "./Bg";
import { PhoneFrame } from "./PhoneFrame";
import { PayMerchantScreen, PaymentSummaryScreen } from "./AppScreens";
import {
  BoltIcon,
  CheckCircle,
  CoinsIcon,
  GlobeIcon,
  ShieldIcon,
  StorefrontIcon,
} from "./icons";

// ---- helpers ------------------------------------------------------------
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const riseUp = (frame: number, delay: number, dist = 46, dur = 22) => ({
  opacity: interpolate(frame, [delay, delay + dur], [0, 1], clamp),
  translate: `0px ${interpolate(frame, [delay, delay + dur], [dist, 0], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  })}px`,
});

// ---- 1. INTRO -----------------------------------------------------------
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appSpring = spring({ frame: frame - 26, fps, config: { damping: 14 } });
  const appScale = interpolate(appSpring, [0, 1], [0.7, 1]);
  const lineW = interpolate(frame, [18, 40], [0, 260], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      <BrandBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
        }}
      >
        <div
          style={{
            ...riseUp(frame, 4, 30),
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: 14,
            color: "#fff",
            textAlign: "center",
          }}
        >
          AFRILAND FIRST BANK
        </div>
        <div
          style={{
            marginTop: 16,
            height: 3,
            width: lineW,
            borderRadius: 3,
            background:
              "linear-gradient(90deg, rgba(233,184,114,0) 0%, #E9B872 50%, rgba(233,184,114,0) 100%)",
          }}
        />
        <div
          style={{
            ...riseUp(frame, 12, 24),
            marginTop: 14,
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: 9,
            color: theme.gold,
          }}
        >
          SOUTH SUDAN
        </div>

        <div
          style={{
            marginTop: 70,
            scale: appScale,
            opacity: interpolate(appSpring, [0, 0.5], [0, 1], clamp),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 26,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
              }}
            >
              <StorefrontIcon size={52} color={theme.redPrimary} />
            </div>
            <div
              style={{
                fontSize: 82,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: -1,
              }}
            >
              First
              <span style={{ color: theme.gold }}> AcaConnect</span>
            </div>
          </div>
        </div>

        <div
          style={{
            ...riseUp(frame, 52, 24),
            marginTop: 34,
            fontSize: 27,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: 2,
          }}
        >
          Your bank. In your pocket.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- 2. HOOK ------------------------------------------------------------
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <BrandBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 90,
          textAlign: "center",
        }}
      >
        <div
          style={{
            ...riseUp(frame, 2, 40),
            fontSize: 30,
            letterSpacing: 6,
            fontWeight: 600,
            color: theme.gold,
            textTransform: "uppercase",
          }}
        >
          Merchant Payments
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 118,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          <div style={riseUp(frame, 12, 60)}>Pay any</div>
          <div style={riseUp(frame, 24, 60)}>merchant.</div>
          <div
            style={{
              ...riseUp(frame, 40, 60),
              color: theme.gold,
            }}
          >
            Instantly.
          </div>
        </div>
        <div
          style={{
            ...riseUp(frame, 58, 30),
            marginTop: 34,
            fontSize: 30,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          Just scan the Till number and go.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- caption pill used in demo/summary ----------------------------------
const StepCaption: React.FC<{
  index: number;
  total: number;
  children: React.ReactNode;
  frame: number;
  appear: number;
}> = ({ index, total, children, frame, appear }) => (
  <div
    style={{
      ...riseUp(frame, appear, 30, 16),
      display: "flex",
      alignItems: "center",
      gap: 16,
      background: "#fff",
      borderRadius: 999,
      padding: "18px 30px 18px 22px",
      boxShadow: "0 18px 40px rgba(0,0,0,0.3)",
    }}
  >
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 999,
        background: theme.redPrimary,
        color: "#fff",
        fontWeight: 800,
        fontSize: 22,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {index}
    </div>
    <div style={{ fontSize: 30, fontWeight: 700, color: theme.ink }}>
      {children}
    </div>
    <div style={{ fontSize: 20, color: theme.inkFaint, fontWeight: 600 }}>
      {index}/{total}
    </div>
  </div>
);

// ---- 3. DEMO (Pay Merchant) --------------------------------------------
export const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 16 } });
  const phoneY = interpolate(enter, [0, 1], [420, 0]);

  // Pay Now press near the end.
  const press = interpolate(
    frame,
    [durationInFrames - 34, durationInFrames - 24, durationInFrames - 14],
    [0, 1, 0],
    clamp,
  );

  // captions cross-fade by window
  const caps: [number, number, string][] = [
    [10, 60, "Choose your account"],
    [60, 110, "Enter the amount"],
    [110, 160, "Add a reason"],
    [160, 220, "Tap Pay Now"],
  ];
  let active = caps[0];
  for (const c of caps) {
    if (frame >= c[0]) active = c;
  }

  return (
    <AbsoluteFill>
      <BrandBackground />
      <SceneTitle frame={frame} eyebrow="How it works" title="Pay in seconds" />

      <AbsoluteFill style={{ alignItems: "center" }}>
        <div
          style={{
            position: "absolute",
            bottom: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
          }}
        >
          <div style={{ position: "relative", height: 80 }}>
            {caps.map(([s, , label], i) =>
              active[0] === s ? (
                <StepCaption
                  key={i}
                  index={i + 1}
                  total={4}
                  frame={frame}
                  appear={s}
                >
                  {label}
                </StepCaption>
              ) : null,
            )}
          </div>
          <div style={{ translate: `0px ${phoneY}px` }}>
            <PhoneFrame width={506}>
              <PayMerchantScreen buttonPress={press} />
            </PhoneFrame>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- 4. SUMMARY ---------------------------------------------------------
export const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16 } });
  const phoneX = interpolate(enter, [0, 1], [520, 0]);

  const glow = interpolate(frame % 60, [0, 30, 60], [0.25, 0.6, 0.25]);

  return (
    <AbsoluteFill>
      <BrandBackground />
      <SceneTitle
        frame={frame}
        eyebrow="Full transparency"
        title="Review, then confirm"
      />
      <AbsoluteFill style={{ alignItems: "center" }}>
        <div
          style={{
            position: "absolute",
            bottom: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
          }}
        >
          <StepCaption index={5} total={5} frame={frame} appear={12}>
            Confirm &amp; authorize
          </StepCaption>
          <div
            style={{
              translate: `${phoneX}px 0px`,
              filter: `drop-shadow(0 0 ${40 * glow}px rgba(255,180,150,${glow}))`,
            }}
          >
            <PhoneFrame width={506}>
              <PaymentSummaryScreen />
            </PhoneFrame>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- 5. SUCCESS ---------------------------------------------------------
export const SuccessScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 4, fps, config: { damping: 11 } });
  const scale = interpolate(pop, [0, 1], [0.3, 1]);

  const rings = [0, 1, 2];

  return (
    <AbsoluteFill>
      <BrandBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          textAlign: "center",
        }}
      >
        <div style={{ position: "relative", width: 260, height: 260 }}>
          {rings.map((r) => {
            const rp = interpolate(
              frame,
              [8 + r * 6, 60 + r * 6],
              [0, 1],
              clamp,
            );
            return (
              <div
                key={r}
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: "auto",
                  width: 200,
                  height: 200,
                  borderRadius: 999,
                  border: "3px solid rgba(255,255,255,0.6)",
                  scale: interpolate(rp, [0, 1], [1, 2.4]),
                  opacity: interpolate(rp, [0, 1], [0.5, 0]),
                }}
              />
            );
          })}
          <div
            style={{
              position: "absolute",
              inset: 0,
              margin: "auto",
              width: 200,
              height: 200,
              scale,
            }}
          >
            <CheckCircle size={200} color="#2ECC71" />
          </div>
        </div>

        <div
          style={{
            ...riseUp(frame, 22, 30),
            marginTop: 48,
            fontSize: 66,
            fontWeight: 800,
            color: "#fff",
          }}
        >
          Payment Successful
        </div>
        <div
          style={{
            ...riseUp(frame, 32, 26),
            marginTop: 16,
            fontSize: 34,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <span style={{ fontWeight: 800, color: theme.gold }}>USD 20.00</span>{" "}
          sent to
        </div>
        <div
          style={{
            ...riseUp(frame, 40, 26),
            marginTop: 8,
            fontSize: 30,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Dembesh Hotel Southern Sudan Ltd
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- 6. FEATURES --------------------------------------------------------
const features = [
  {
    Icon: CoinsIcon,
    title: "Multi-currency",
    sub: "Pay in USD & SSP",
  },
  {
    Icon: GlobeIcon,
    title: "Merchant payments",
    sub: "دفع التجار · Paiements",
  },
  {
    Icon: ShieldIcon,
    title: "Bank-grade security",
    sub: "Every payment authorized",
  },
  {
    Icon: BoltIcon,
    title: "Instant transfers",
    sub: "Settled in seconds",
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <BrandBackground />
      <AbsoluteFill
        style={{
          padding: "90px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            ...riseUp(frame, 2, 30),
            fontSize: 30,
            letterSpacing: 6,
            color: theme.gold,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          One app. Everything.
        </div>
        <div
          style={{
            ...riseUp(frame, 10, 30),
            fontSize: 78,
            fontWeight: 800,
            color: "#fff",
            marginTop: 14,
            marginBottom: 60,
            textAlign: "center",
          }}
        >
          Built for South Sudan
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 34,
            width: "100%",
          }}
        >
          {features.map((f, i) => {
            const s = spring({
              frame: frame - 20 - i * 8,
              fps,
              config: { damping: 15 },
            });
            const { Icon } = f;
            return (
              <div
                key={i}
                style={{
                  scale: interpolate(s, [0, 1], [0.8, 1]),
                  opacity: s,
                  background: "rgba(255,255,255,0.08)",
                  border: "1.5px solid rgba(255,255,255,0.16)",
                  borderRadius: 28,
                  padding: "40px 36px",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: 22,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 26,
                  }}
                >
                  <Icon size={44} color={theme.redPrimary} />
                </div>
                <div
                  style={{ fontSize: 38, fontWeight: 800, color: "#fff" }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    color: "rgba(255,255,255,0.78)",
                    marginTop: 8,
                  }}
                >
                  {f.sub}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- 7. OUTRO -----------------------------------------------------------
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 6, fps, config: { damping: 13 } });

  return (
    <AbsoluteFill>
      <BrandBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          textAlign: "center",
        }}
      >
        <div
          style={{
            scale: interpolate(pop, [0, 1], [0.6, 1]),
            opacity: pop,
            width: 130,
            height: 130,
            borderRadius: 34,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 22px 50px rgba(0,0,0,0.4)",
          }}
        >
          <StorefrontIcon size={70} color={theme.redPrimary} />
        </div>
        <div
          style={{
            ...riseUp(frame, 20, 34),
            marginTop: 40,
            fontSize: 88,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: -1,
          }}
        >
          First<span style={{ color: theme.gold }}> AcaConnect</span>
        </div>
        <div
          style={{
            ...riseUp(frame, 30, 30),
            marginTop: 14,
            fontSize: 34,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Download today and start paying smarter.
        </div>

        <div
          style={{
            ...riseUp(frame, 42, 30),
            marginTop: 46,
            display: "flex",
            gap: 22,
          }}
        >
          <StoreBadge top="Download on the" bottom="App Store" />
          <StoreBadge top="GET IT ON" bottom="Google Play" />
        </div>

        <div
          style={{
            ...riseUp(frame, 56, 24),
            marginTop: 60,
            fontSize: 26,
            letterSpacing: 8,
            color: theme.gold,
            fontWeight: 600,
          }}
        >
          AFRILAND FIRST BANK · SOUTH SUDAN
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const StoreBadge: React.FC<{ top: string; bottom: string }> = ({
  top,
  bottom,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "#000",
      border: "1.5px solid rgba(255,255,255,0.25)",
      borderRadius: 16,
      padding: "16px 26px",
    }}
  >
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 8,
        background: "#fff",
      }}
    />
    <div style={{ textAlign: "left", color: "#fff" }}>
      <div style={{ fontSize: 16, opacity: 0.8 }}>{top}</div>
      <div style={{ fontSize: 26, fontWeight: 700 }}>{bottom}</div>
    </div>
  </div>
);

// ---- shared small scene title ------------------------------------------
const SceneTitle: React.FC<{
  frame: number;
  eyebrow: string;
  title: string;
}> = ({ frame, eyebrow, title }) => (
  <AbsoluteFill style={{ alignItems: "center" }}>
    <div style={{ marginTop: 120, textAlign: "center" }}>
      <div
        style={{
          ...riseUp(frame, 4, 26),
          fontSize: 26,
          letterSpacing: 6,
          color: theme.gold,
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          ...riseUp(frame, 10, 26),
          fontSize: 68,
          fontWeight: 800,
          color: "#fff",
          marginTop: 10,
        }}
      >
        {title}
      </div>
    </div>
  </AbsoluteFill>
);
