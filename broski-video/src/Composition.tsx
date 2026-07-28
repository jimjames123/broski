import {
  AbsoluteFill,
  Composition,
  Easing,
  Interactive,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const MyComposition = () => {
  return (
    <Composition
      id="Promo"
      component={Promo}
      durationInFrames={180}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        eyebrow: "Introducing",
        headline: "Broski",
        subtitle: "The fastest way to ship your next big idea.",
        cta: "Get started free",
      }}
    />
  );
};

type Props = {
  eyebrow: string;
  headline: string;
  subtitle: string;
  cta: string;
};

const Promo: React.FC<Props> = ({ eyebrow, headline, subtitle, cta }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0f1a" }}>
      <Background />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 120,
        }}
      >
        <Sequence name="Eyebrow" from={8} layout="none">
          <Eyebrow text={eyebrow} />
        </Sequence>
        <Sequence name="Headline" from={18} layout="none">
          <Headline text={headline} />
        </Sequence>
        <Sequence name="Subtitle" from={42} layout="none">
          <Subtitle text={subtitle} />
        </Sequence>
        <Sequence name="CTA" from={66} layout="none">
          <Cta text={cta} />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Background: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Gradient glow"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 40%, #1e3a8a 0%, #0b0f1a 60%)",
        scale: interpolate(frame, [0, 180], [1.15, 1.3], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          output: "perceptual-scale",
        }),
        opacity: interpolate(frame, [0, 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    />
  );
};

const Eyebrow: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Eyebrow"
      style={{
        fontFamily: "system-ui, sans-serif",
        fontSize: 34,
        fontWeight: 600,
        letterSpacing: 8,
        textTransform: "uppercase",
        color: "#7dd3fc",
        opacity: interpolate(frame, [0, 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(frame, [0, 20], ["0px 20px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      {text}
    </Interactive.Div>
  );
};

const Headline: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Interactive.Div
      name="Headline"
      style={{
        fontFamily: "system-ui, sans-serif",
        fontSize: 168,
        fontWeight: 800,
        lineHeight: 1,
        color: "white",
        marginTop: 16,
        opacity: interpolate(frame, [0, 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [0, fps], [0.85, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
          output: "perceptual-scale",
        }),
      }}
    >
      {text}
    </Interactive.Div>
  );
};

const Subtitle: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name="Subtitle"
      style={{
        fontFamily: "system-ui, sans-serif",
        fontSize: 52,
        fontWeight: 400,
        color: "#cbd5e1",
        marginTop: 28,
        maxWidth: 1200,
        textAlign: "center",
        opacity: interpolate(frame, [0, 24], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(frame, [0, 24], ["0px 24px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      {text}
    </Interactive.Div>
  );
};

const Cta: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Interactive.Div
      name="CTA button"
      style={{
        fontFamily: "system-ui, sans-serif",
        fontSize: 40,
        fontWeight: 700,
        color: "#0b0f1a",
        backgroundColor: "#38bdf8",
        padding: "26px 56px",
        borderRadius: 999,
        marginTop: 56,
        opacity: interpolate(frame, [0, 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [0, fps], [0.6, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 12 }),
          output: "perceptual-scale",
        }),
      }}
    >
      {text}
    </Interactive.Div>
  );
};
