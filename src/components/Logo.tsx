import { useId } from "react";

/**
 * Tickora logo. Two approved designs; switch the site with LOGO_VARIANT.
 * - "pulse": a price-tick line inside a dark circle, wordmark TICKORA (spaced caps)
 * - "mono": one continuous line, a "t" whose crossbar becomes a rising price line
 * Source artboards: Design canvas "Holdwire logo concepts" → Tickora · Pulse / Tickora · Mono.
 */
export const LOGO_VARIANT: "pulse" | "mono" = "pulse";

export function LogoMark({ size = 32, variant = LOGO_VARIANT }: { size?: number; variant?: "pulse" | "mono" }) {
  const id = useId().replace(/:/g, "");
  if (variant === "mono") {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
        <defs>
          <linearGradient id={`m${id}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#7c3aed" />
            <stop offset="0.55" stopColor="#ec4899" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path d="M13.5 13 V39 M6 13 H20 L26.5 24 L32.5 17 L40 9" fill="none" stroke={`url(#m${id})`} strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="9" r="3.2" fill="#f59e0b" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={`p${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#a3e635" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill="#0B0E13" />
      <circle cx="24" cy="24" r="19.5" fill="none" stroke={`url(#p${id})`} strokeWidth="1.4" opacity="0.55" />
      <path d="M8.5 27 H15.5 L19 17.5 L24.5 33 L28.5 20 L31.5 27 H39.5" fill="none" stroke={`url(#p${id})`} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28.5" cy="20" r="2.6" fill="#ffffff" />
    </svg>
  );
}
