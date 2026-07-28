import React from "react";
import { FONT, SCREEN_H, SCREEN_W, theme } from "./theme";
import { TribalPattern } from "./TribalPattern";
import {
  BackArrow,
  CardIcon,
  CheckCircle,
  StorefrontIcon,
} from "./icons";

const StatusBar: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const c = dark ? theme.ink : "#fff";
  return (
    <div
      style={{
        height: 46,
        paddingTop: 14,
        paddingLeft: 30,
        paddingRight: 26,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: FONT,
        color: c,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.3 }}>
        7:23
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        {/* signal */}
        <svg width={18} height={12} viewBox="0 0 18 12">
          {[3, 6, 9, 12].map((h, i) => (
            <rect
              key={i}
              x={i * 4.5}
              y={12 - h}
              width={3}
              height={h}
              rx={0.8}
              fill={c}
            />
          ))}
        </svg>
        {/* wifi */}
        <svg width={16} height={12} viewBox="0 0 16 12" fill="none">
          <path
            d="M1 4.2C5-.4 11-.4 15 4.2M3.4 6.6c3-3 6.2-3 9.2 0M6 9c1.2-1.2 2.8-1.2 4 0"
            stroke={c}
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </svg>
        {/* battery */}
        <svg width={26} height={13} viewBox="0 0 26 13">
          <rect
            x={0.5}
            y={0.5}
            width={22}
            height={12}
            rx={3}
            stroke={c}
            fill="none"
          />
          <rect x={2.5} y={2.5} width={16} height={8} rx={1.5} fill={c} />
          <rect x={24} y={4} width={2} height={5} rx={1} fill={c} />
        </svg>
      </div>
    </div>
  );
};

// Reusable red header with tribal pattern and rounded bottom corners.
const RedHeader: React.FC<{ height: number; children: React.ReactNode }> = ({
  height,
  children,
}) => (
  <div
    style={{
      height,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      background: `linear-gradient(155deg, ${theme.redBright} 0%, ${theme.redPrimary} 45%, ${theme.redDeep} 100%)`,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <TribalPattern color="#F0B48A" opacity={0.22} scale={0.9} />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%)",
      }}
    />
    <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
  </div>
);

export const PayMerchantScreen: React.FC<{
  amount?: string;
  reason?: string;
  buttonPress?: number; // 0..1
}> = ({ amount = "20", reason = "food", buttonPress = 0 }) => {
  return (
    <div
      style={{
        width: SCREEN_W,
        height: SCREEN_H,
        backgroundColor: theme.appBg,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      <RedHeader height={250}>
        <StatusBar />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "4px 24px 0",
            color: "#fff",
          }}
        >
          <BackArrow size={24} color="#fff" />
          <div style={{ fontSize: 26, fontWeight: 700 }}>Pay Merchant</div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            padding: "22px 24px 0",
          }}
        >
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: 16,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <StorefrontIcon size={34} color="#fff" />
          </div>
          <div style={{ color: "#fff" }}>
            <div style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.15 }}>
              DEMBESH HOTEL SOUTHERN SUDAN LTD
            </div>
            <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>
              Till: 545020
            </div>
            <div
              style={{
                display: "inline-block",
                marginTop: 9,
                padding: "5px 14px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.16)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Hotels
            </div>
          </div>
        </div>
      </RedHeader>

      <div style={{ padding: "22px 22px 0" }}>
        <Label>PAY FROM</Label>
        <div
          style={{
            marginTop: 12,
            background: "#fff",
            borderRadius: 16,
            border: `2px solid ${theme.redPrimary}`,
            boxShadow: "0 8px 20px rgba(200,16,46,0.10)",
            padding: "16px 16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: "#FCE7EA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CardIcon size={24} color={theme.redPrimary} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: theme.ink }}>
              CLAIRE NYIBOL ARECH BOL
            </div>
            <div style={{ fontSize: 13, color: theme.inkFaint, marginTop: 3 }}>
              36035-0001-00010697806-62
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: theme.redPrimary }}>
              USD 295.70
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 5,
              }}
            >
              <CheckCircle size={18} color={theme.redPrimary} />
            </div>
          </div>
        </div>

        <div style={{ height: 20 }} />
        <Label>AMOUNT</Label>
        <InputCard>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: theme.redPrimary,
              marginRight: 10,
            }}
          >
            USD
          </span>
          <span style={{ fontSize: 30, fontWeight: 700, color: theme.ink }}>
            {amount}
          </span>
        </InputCard>

        <div style={{ height: 16 }} />
        <Label>REASON</Label>
        <InputCard>
          <span style={{ fontSize: 20, color: theme.ink }}>{reason}</span>
        </InputCard>

        <div style={{ height: 26 }} />
        <div
          style={{
            height: 60,
            borderRadius: 16,
            background: theme.redPrimary,
            color: "#fff",
            fontSize: 20,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 24px rgba(200,16,46,0.28)",
            scale: 1 - buttonPress * 0.05,
            filter: buttonPress > 0 ? "brightness(0.92)" : "none",
          }}
        >
          Pay Now
        </div>
      </div>
    </div>
  );
};

export const PaymentSummaryScreen: React.FC = () => {
  return (
    <div
      style={{
        width: SCREEN_W,
        height: SCREEN_H,
        backgroundColor: theme.appBg,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      <RedHeader height={165}>
        <StatusBar />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "4px 24px 0",
            color: "#fff",
          }}
        >
          <BackArrow size={24} color="#fff" />
          <div style={{ fontSize: 26, fontWeight: 700 }}>Payment Summary</div>
        </div>
        <div
          style={{
            padding: "10px 24px 0",
            color: "rgba(255,255,255,0.9)",
            fontSize: 15,
          }}
        >
          Review the details below before confirming.
        </div>
      </RedHeader>

      <div style={{ padding: "24px 22px 0" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 22,
            padding: "26px 24px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: 66,
                height: 66,
                borderRadius: 18,
                background: "#FCE7EA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StorefrontIcon size={34} color={theme.redPrimary} />
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: 14,
              color: theme.inkSoft,
              marginTop: 14,
            }}
          >
            Payment to
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: 21,
              fontWeight: 700,
              color: theme.ink,
              lineHeight: 1.2,
              marginTop: 4,
            }}
          >
            DEMBESH HOTEL SOUTHERN SUDAN LTD
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: 14,
              color: theme.inkFaint,
              marginTop: 6,
            }}
          >
            Till: 545020
          </div>
          <div
            style={{
              height: 1.5,
              background: theme.ink,
              opacity: 0.85,
              margin: "20px 0 6px",
            }}
          />
          <SummaryRow label="Amount" valueColor={theme.redPrimary}>
            USD 20.00
          </SummaryRow>
          <SummaryRow label="From Account">
            36035-0001-00010697806-62
          </SummaryRow>
          <SummaryRow label="Transaction ID">MOBZURAKU2MQY7</SummaryRow>
          <SummaryRow label="Date">28 Jul 2026, 07:23</SummaryRow>
        </div>

        <div style={{ height: 24 }} />
        <div
          style={{
            height: 60,
            borderRadius: 16,
            background: theme.redPrimary,
            color: "#fff",
            fontSize: 20,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 24px rgba(200,16,46,0.28)",
          }}
        >
          Confirm &amp; Authorize
        </div>
        <div
          style={{
            textAlign: "center",
            color: theme.inkSoft,
            fontSize: 16,
            marginTop: 20,
          }}
        >
          Cancel Payment
        </div>
      </div>
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 1,
      color: theme.ink,
    }}
  >
    {children}
  </div>
);

const InputCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      marginTop: 12,
      background: "#fff",
      borderRadius: 16,
      border: `1.5px solid ${theme.line}`,
      padding: "18px 22px",
      display: "flex",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);

const SummaryRow: React.FC<{
  label: string;
  valueColor?: string;
  children: React.ReactNode;
}> = ({ label, valueColor, children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
    }}
  >
    <div style={{ fontSize: 15, color: theme.inkSoft }}>{label}</div>
    <div
      style={{
        fontSize: 16,
        fontWeight: 700,
        color: valueColor ?? theme.ink,
      }}
    >
      {children}
    </div>
  </div>
);
