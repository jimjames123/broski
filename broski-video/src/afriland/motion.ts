import { Easing, interpolate, spring } from "remotion";

/**
 * Tuned spring presets — weighted, natural motion (never linear/basic ease).
 * damping/stiffness/mass chosen per role.
 */
export const SPRINGS = {
  // confident entrance with a touch of overshoot
  entrance: { damping: 14, stiffness: 90, mass: 0.9 },
  // heavier settle for large objects (phone mockup)
  settle: { damping: 18, stiffness: 70, mass: 1.4 },
  // crisp, minimal overshoot for small UI
  snappy: { damping: 20, stiffness: 160, mass: 0.7 },
  // slow, soft for background drift reveals
  soft: { damping: 200, stiffness: 60, mass: 1 },
};

export const springAt = (
  frame: number,
  fps: number,
  delay: number,
  config: Record<string, number>,
) => spring({ frame: frame - delay, fps, config });

// Fade a value in then out across a lifetime (frames), with eased edges.
export const inOut = (
  frame: number,
  lifetime: number,
  fadeIn = 8,
  fadeOut = 10,
) =>
  interpolate(
    frame,
    [0, fadeIn, lifetime - fadeOut, lifetime],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    },
  );

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
