import React from "react";

// Mastercard brand mark (two interlocking circles).
export const MastercardMark: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 100 62">
    <circle cx={38} cy={31} r={31} fill="#EB001B" />
    <circle cx={62} cy={31} r={31} fill="#F79E1B" />
    <path
      d="M50 8a31 31 0 0 1 0 46 31 31 0 0 1 0-46Z"
      fill="#FF5F00"
    />
  </svg>
);

const S: React.FC<{
  size: number;
  color: string;
  children: React.ReactNode;
}> = ({ size, color, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}>
    {children}
  </svg>
);

export const PosIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <S size={size} color={color}>
    <path d="M3 5h2l2 11h10l2-7H6" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={9} cy={20} r={1.4} fill={color} stroke="none" />
    <circle cx={17} cy={20} r={1.4} fill={color} stroke="none" />
  </S>
);

export const TravelIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <S size={size} color={color}>
    <path
      d="M2 14l20-7-5 13-4-4-3 4-1-4-7-2Z"
      strokeWidth={1.7}
      strokeLinejoin="round"
    />
  </S>
);

export const RestaurantIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <S size={size} color={color}>
    <path d="M6 2v8m0 0a2 2 0 0 0 2-2V2M6 10v12M8 2v6" strokeWidth={1.7} strokeLinecap="round" />
    <path d="M17 2c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v11" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
  </S>
);

export const FuelIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <S size={size} color={color}>
    <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 11h8" strokeWidth={1.7} />
    <path d="M14 8l3 3v6a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9l-3-3" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
  </S>
);

export const ShoppingIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <S size={size} color={color}>
    <rect x={3} y={4} width={18} height={12} rx={1.5} strokeWidth={1.7} />
    <path d="M2 20h20M9 8l3 3 4-5" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
  </S>
);
