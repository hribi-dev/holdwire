"use client";

import { useState } from "react";
import type { Focus, Person, PersonId } from "@/content/movers";

const FOCI: Focus[] = ["Bitcoin", "Gold", "Macro", "Ethereum", "Memecoins"];

export function VoicesGrid({
  people,
  labels,
  intl,
  only,
}: {
  people: Record<PersonId, Person>;
  labels: { all: string; latestTake: string; follow: string };
  intl: string;
  /** Show only people with this focus, without the filter chips (e.g. on the gold page). */
  only?: Focus;
}) {
  const [picked, setFocus] = useState<Focus | "all">("all");
  const focus = only ?? picked;
  const ids = (Object.keys(people) as PersonId[]).filter((id) => focus === "all" || people[id].focus.includes(focus));
  // People with a recent, sourced take first.
  ids.sort((a, b) => (people[b].take?.date ?? "").localeCompare(people[a].take?.date ?? ""));
  const date = (d: string) => new Date(d).toLocaleDateString(intl, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div style={{ display: only ? "none" : "flex", flexWrap: "wrap", gap: 8 }} role="group">
        <button type="button" className="chip-btn" aria-pressed={focus === "all"} onClick={() => setFocus("all")}>
          {labels.all}
        </button>
        {FOCI.map((f) => (
          <button key={f} type="button" className="chip-btn" aria-pressed={focus === f} onClick={() => setFocus(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="voices">
        {ids.map((id) => {
          const p = people[id];
          return (
            <article key={id} className="voice" style={{ ["--vc" as string]: p.color } as React.CSSProperties}>
              <header className="voice-head">
                <span className="mover-avatar" style={{ background: p.color }}>
                  {p.initials}
                </span>
                <span className="stack" style={{ gap: 0, minWidth: 0 }}>
                  <strong>{p.name}</strong>
                  <span className="tiny muted voice-handle">{p.handle}</span>
                </span>
                <a className="voice-follow" href={p.profileUrl} rel="nofollow noopener" target="_blank">
                  {labels.follow} ↗
                </a>
              </header>
              <p className="small muted" style={{ margin: 0 }}>
                {p.role}
              </p>
              <div className="voice-tags">
                {p.focus.map((f) => (
                  <span key={f} className={`voice-tag${f === "Gold" ? " is-gold" : ""}`}>
                    {f}
                  </span>
                ))}
              </div>
              {p.take && (
                <div className="voice-take">
                  <span className="cat" style={{ color: p.color }}>
                    {labels.latestTake} · {date(p.take.date)}
                  </span>
                  <p style={{ margin: 0 }}>{p.take.text}</p>
                  <a className="tiny muted" href={p.take.source.url} rel="noopener" target="_blank">
                    {p.take.source.name} ↗
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
