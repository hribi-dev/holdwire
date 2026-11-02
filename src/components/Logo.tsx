export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
      <rect x="2" y="2" width="26" height="26" rx="6" fill="#0E1116" />
      <path d="M8 11h14M8 19h14" stroke="#F5B301" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="15" cy="15" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}
