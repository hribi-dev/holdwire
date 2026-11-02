const eur = (digits: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export function formatPrice(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  if (value >= 1000) return eur(2).format(value);
  if (value >= 1) return eur(2).format(value);
  if (value >= 0.01) return eur(4).format(value);
  return eur(8).format(value);
}

export function formatCompactEur(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number | null | undefined, digits = 0): string {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-IE", { maximumFractionDigits: digits }).format(value);
}

export type Direction = "up" | "down" | "flat";

export function direction(pct: number | null | undefined): Direction {
  if (pct == null || Math.abs(pct) < 0.005) return "flat";
  return pct > 0 ? "up" : "down";
}

/** "▲ 2.14%" / "▼ 0.92%" / "0.00%". The arrow carries meaning, so colour is never the only signal. */
export function formatChange(pct: number | null | undefined): string {
  if (pct == null || Number.isNaN(pct)) return "—";
  const d = direction(pct);
  const abs = Math.abs(pct).toFixed(2);
  if (d === "up") return `▲ ${abs}%`;
  if (d === "down") return `▼ ${abs}%`;
  return `${abs}%`;
}
