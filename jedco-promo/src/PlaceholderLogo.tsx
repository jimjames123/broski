import { AbsoluteFill } from "remotion";

/**
 * A clearly-generic placeholder logo, rendered to public/logo.png so the
 * pipeline runs before the real transparent-background logo is supplied.
 * REPLACE public/logo.png with your real logo — this component is only used
 * to generate the placeholder and is not part of the final promo.
 */
export const PlaceholderLogo: React.FC = () => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    }}
  >
    <div
      style={{
        width: 460,
        height: 460,
        borderRadius: 110,
        background: "linear-gradient(150deg, #2A4CD6 0%, #0E1E5B 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <svg width={190} height={190} viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
          fill="#F4B400"
          stroke="#fff"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          color: "#fff",
          fontSize: 58,
          fontWeight: 800,
          letterSpacing: 4,
          marginTop: 10,
        }}
      >
        LOGO
      </div>
    </div>
  </AbsoluteFill>
);
