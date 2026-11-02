type Props = {
  data: number[];
  width?: number;
  height?: number;
  stroke?: string;
  label?: string;
  strokeWidth?: number;
};

export function Sparkline({ data, width = 100, height = 28, stroke = "currentColor", label, strokeWidth = 2 }: Props) {
  if (!data || data.length < 2) return <span className="muted">—</span>;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = strokeWidth;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = pad + (1 - (v - min) / range) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const };
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ maxWidth: width === 100 ? 100 : undefined, display: "block" }} {...a11y}>
      <polyline points={points} fill="none" stroke={stroke} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
