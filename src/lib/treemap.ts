/** Squarified treemap (Bruls et al.). Pure; returns rects in percentage units of a W×H box. */

export type Rect = { x: number; y: number; w: number; h: number };
export type Placed<T> = T & Rect;

function worst(row: number[], side: number): number {
  const s = row.reduce((a, b) => a + b, 0);
  const max = Math.max(...row);
  const min = Math.min(...row);
  const s2 = s * s;
  const side2 = side * side;
  return Math.max((side2 * max) / s2, s2 / (side2 * min));
}

export function squarify<T>(items: T[], value: (t: T) => number, W = 100, H = 100): Placed<T>[] {
  const data = items.map((it) => ({ it, v: Math.max(0, value(it)) })).filter((d) => d.v > 0).sort((a, b) => b.v - a.v);
  const total = data.reduce((a, d) => a + d.v, 0);
  if (!total) return [];
  const scale = (W * H) / total;
  const areas = data.map((d) => d.v * scale);
  const out: Placed<T>[] = [];
  let x = 0;
  let y = 0;
  let w = W;
  let h = H;
  let i = 0;
  while (i < areas.length) {
    const side = Math.min(w, h);
    const row: number[] = [areas[i]];
    let j = i + 1;
    while (j < areas.length && worst([...row, areas[j]], side) <= worst(row, side)) {
      row.push(areas[j]);
      j++;
    }
    const sum = row.reduce((a, b) => a + b, 0);
    if (w >= h) {
      const cw = sum / h;
      let cy = y;
      row.forEach((a, k) => {
        const ch = a / cw;
        out.push({ ...data[i + k].it, x, y: cy, w: cw, h: ch });
        cy += ch;
      });
      x += cw;
      w -= cw;
    } else {
      const ch = sum / w;
      let cx = x;
      row.forEach((a, k) => {
        const cw = a / ch;
        out.push({ ...data[i + k].it, x: cx, y, w: cw, h: ch });
        cx += cw;
      });
      y += ch;
      h -= ch;
    }
    i = j;
  }
  return out;
}

/** Red→grey→green for a % change, clamped at ±10%. */
export function changeColor(pct: number | null | undefined): string {
  if (pct == null || !Number.isFinite(pct)) return "#334155";
  const t = Math.max(-1, Math.min(1, pct / 10));
  if (t >= 0) {
    const l = 30 + (1 - t) * 8;
    return `hsl(152 ${45 + t * 30}% ${l}%)`;
  }
  const l = 30 + (1 + t) * 8;
  return `hsl(2 ${45 - t * 30}% ${l}%)`;
}

/** Share of coins up → 0..100 mood score. */
export function moodScore(changes: (number | null | undefined)[]): { score: number; up: number; total: number } {
  const valid = changes.filter((c): c is number => c != null && Number.isFinite(c));
  const up = valid.filter((c) => c > 0).length;
  return { score: valid.length ? Math.round((up / valid.length) * 100) : 50, up, total: valid.length };
}

export function moodBucket(score: number): 0 | 1 | 2 | 3 | 4 {
  if (score < 20) return 0;
  if (score < 40) return 1;
  if (score <= 60) return 2;
  if (score <= 80) return 3;
  return 4;
}
