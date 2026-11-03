"use client";

import { useState } from "react";
import type { MoverEvent, Person, PersonId } from "@/content/movers";
import type { Reaction } from "@/lib/movers-calc";
import { XPostEmbed } from "@/components/XPostEmbed";

type Labels = { all: string; reported: string; measured: string; lesson: string; sources: string; original: string; showPost: string; embedNote: string };

function MiniReaction({ r, t0, color }: { r: Reaction; t0: number; color: string }) {
  const W = 320;
  const H = 80;
  const xs = r.series.map((p) => p.t);
  const ys = r.series.map((p) => p.c);
  const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
  const [y0, y1] = [Math.min(...ys, r.base), Math.max(...ys, r.base)];
  const X = (t: number) => ((t - x0) / (x1 - x0 || 1)) * W;
  const Y = (v: number) => H - 4 - ((v - y0) / (y1 - y0 || 1)) * (H - 8);
  const d = r.series.map((p, i) => `${i ? "L" : "M"}${X(p.t).toFixed(1)} ${Y(p.c).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 360 }} aria-hidden="true">
      <line x1={X(t0)} x2={X(t0)} y1={0} y2={H} stroke={color} strokeDasharray="3 3" />
      <line x1={0} x2={W} y1={Y(r.base)} y2={Y(r.base)} stroke="var(--line)" />
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth={2} />
    </svg>
  );
}

export function MoversTimeline({
  events,
  people,
  reactions,
  labels,
  intl,
}: {
  events: MoverEvent[];
  people: Record<PersonId, Person>;
  reactions: Record<string, Reaction | null>;
  labels: Labels;
  intl: string;
}) {
  const [who, setWho] = useState<PersonId | "all">("all");
  const list = who === "all" ? events : events.filter((e) => e.person === who);
  const dateFmt = (e: MoverEvent) => {
    const d = new Date(e.postedAt);
    if (e.precision === "month") return d.toLocaleDateString(intl, { month: "long", year: "numeric", timeZone: "UTC" });
    if (e.precision === "day") return d.toLocaleDateString(intl, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    return d.toLocaleString(intl, { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC", timeZoneName: "short" });
  };
  const counts = (id: PersonId) => events.filter((e) => e.person === id).length;

  return (
    <div className="stack" style={{ gap: 20 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }} role="group">
        <button type="button" className="chip-btn" aria-pressed={who === "all"} onClick={() => setWho("all")}>
          {labels.all} · {events.length}
        </button>
        {(Object.keys(people) as PersonId[]).filter((id) => counts(id) > 0).map((id) => (
          <button key={id} type="button" className="chip-btn" aria-pressed={who === id} onClick={() => setWho(id)} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span className="mover-avatar" style={{ background: people[id].color, width: 22, height: 22, fontSize: 10 }}>{people[id].initials}</span>
            {people[id].name} · {counts(id)}
          </button>
        ))}
      </div>

      <ol className="mover-timeline">
        {list.map((e) => {
          const p = people[e.person];
          const r = reactions[e.slug];
          return (
            <li key={e.slug} className="mover-item">
              <span className="mover-dot" style={{ background: p.color }} aria-hidden="true" />
              <article className="card stack" style={{ gap: 10 }}>
                <header style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <span className="mover-avatar" style={{ background: p.color }}>{p.initials}</span>
                  <span className="stack" style={{ gap: 0 }}>
                    <strong>{p.name}</strong>
                    <span className="tiny muted">
                      {e.platform} · <time dateTime={e.postedAt}>{dateFmt(e)}</time>
                    </span>
                  </span>
                  <span style={{ marginLeft: "auto", display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {e.assets.map((a) => (
                      <span key={a} className="mover-asset">{a}</span>
                    ))}
                  </span>
                </header>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.45 }}>{e.summary}</p>
                <div className="mover-reported">
                  <span className="cat" style={{ color: p.color }}>{labels.reported}</span>
                  <span>{e.reported}</span>
                </div>
                {r && (
                  <div className="stack" style={{ gap: 6 }}>
                    <span className="cat" style={{ color: "var(--mint-ink)" }}>{labels.measured}{e.hlCoin ? ` · ${e.hlCoin}` : ""}</span>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {r.after.map((a) => (
                        <span key={a.label} className="mover-chip" style={{ color: a.pct >= 0 ? "var(--up)" : "var(--down)" }}>
                          +{a.label}: {a.pct >= 0 ? "+" : ""}
                          {a.pct.toFixed(1)}%
                        </span>
                      ))}
                      <span className="mover-chip">max ▲ {r.maxUpPct.toFixed(1)}% · ▼ {r.maxDownPct.toFixed(1)}%</span>
                    </div>
                    <MiniReaction r={r} t0={Date.parse(e.postedAt)} color={p.color} />
                  </div>
                )}
                {e.lesson && (
                  <p className="small" style={{ margin: 0, padding: "10px 12px", background: "var(--warn-bg)", border: "1px solid var(--warn-line)", borderRadius: 10, color: "var(--ink-2)" }}>
                    <strong>{labels.lesson}:</strong> {e.lesson}
                  </p>
                )}
                {e.postUrl && /^https:\/\/(x|twitter)\.com\//.test(e.postUrl) && (
                  <XPostEmbed url={e.postUrl} labels={{ show: labels.showPost, note: labels.embedNote, open: labels.original }} />
                )}
                <footer className="tiny muted" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {e.postUrl && !/^https:\/\/(x|twitter)\.com\//.test(e.postUrl) && (
                    <a href={e.postUrl} rel="nofollow noopener" target="_blank">{labels.original} ↗</a>
                  )}
                  <span>
                    {labels.sources}:{" "}
                    {e.sources.map((s, i) => (
                      <span key={s.url}>
                        {i > 0 && ", "}
                        <a href={s.url} rel="noopener" target="_blank">{s.name}</a>
                      </span>
                    ))}
                  </span>
                </footer>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
