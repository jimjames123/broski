import React from "react";

export const StorefrontIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 9.5V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.5"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.2 6.5 4.4 4h15.2l1.2 2.5a2.2 2.2 0 0 1-4.2 1 2.4 2.4 0 0 1-4.6 0 2.4 2.4 0 0 1-4.6 0 2.2 2.2 0 0 1-4.2-1Z"
      stroke={color}
      strokeWidth={1.7}
      strokeLinejoin="round"
    />
    <path
      d="M10 20v-4a2 2 0 0 1 4 0v4"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CardIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect
      x={3}
      y={6}
      width={18}
      height={12}
      rx={2.5}
      stroke={color}
      strokeWidth={1.7}
    />
    <path d="M3 10h18" stroke={color} strokeWidth={1.7} />
    <path d="M6.5 14.5h3" stroke={color} strokeWidth={1.7} strokeLinecap="round" />
  </svg>
);

export const CheckCircle: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={12} r={10} fill={color} />
    <path
      d="M7.5 12.5 10.5 15.5 16.5 8.5"
      stroke="#fff"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BackArrow: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M15 5l-7 7 7 7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShieldIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
    <path
      d="M8.7 12.2 11 14.5l4.3-4.5"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BoltIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  </svg>
);

export const GlobeIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
    <path
      d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"
      stroke={color}
      strokeWidth={1.8}
    />
  </svg>
);

export const CoinsIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx={9} cy={7} rx={6} ry={3} stroke={color} strokeWidth={1.8} />
    <path
      d="M3 7v5c0 1.7 2.7 3 6 3M3 12"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <ellipse cx={15} cy={14} rx={6} ry={3} stroke={color} strokeWidth={1.8} />
    <path
      d="M9 14v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </svg>
);
