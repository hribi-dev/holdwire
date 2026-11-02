# 05 — Content operations

## 1. Content types and the mix we aim for
| Type | Share | Purpose | Cadence (phase 2) |
|---|---|---|---|
| Evergreen guides / pillars | 25% | topical authority, long-tail traffic | 5/week |
| Entity pages (data + summary) | in batches | programmatic traffic | 100/week |
| Glossary | in batches | internal links, featured snippets | 30/week |
| News (with angle) | 35% | freshness, Google News/Discover, social | 2–5/day |
| Analysis / opinion | 10% | authority, X engagement | 2/week |
| Data reports | 5% | backlinks, PR | 1–2/month |
| Comparisons / "best X" | 10% | commercial intent, affiliate later | 3/week |
| Sponsored / PR | ≤10–15% | revenue | as sold |

## 2. Editorial workflow
```
Idea/keyword → Brief (Claude) → Draft (Claude or writer) → Fact-check (Claude: numbers vs sources)
→ Edit (human editor) → SEO pass (Claude: links, schema, meta) → Approve (Hribi/editor) → Publish → Distribute (X/TG/newsletter) → Refresh schedule
```
- **Brief** contains: target query + intent, angle, outline, required sources, internal links (to/from), entities, FAQ candidates, competitor gaps.
- **Status in CMS:** idea → briefed → drafting → fact-check → editing → approved → scheduled → published → needs-refresh.

## 3. AI-assisted production rules
1. AI drafts are a starting point. Each piece needs **added value**: original data, a quote, expert opinion, a worked example, or analysis.
2. Every factual claim has a source; every number is checked against it.
3. No AI-generated author personas. Bylines are real people; Claude-assisted pieces are written/edited by a real person who takes responsibility.
4. Disclose AI assistance in the editorial policy (a general statement, not per article).
5. Never publish price predictions or "buy" recommendations.
6. Banned patterns: filler intros, "In today's fast-paced world…", keyword stuffing, fake FAQs.

## 4. News desk (lean version)
- **Claude (scheduled task):** scans sources several times a day (official blogs, regulators: ESMA/SEC/ECB, exchange announcements, X lists, on-chain alerts) and produces a shortlist: story, why it matters, sources, suggested angle, related entity pages.
- **Human:** picks 2–5, writes or approves Claude's draft, publishes.
- Breaking news SLA: under 60 min.

## 5. Sponsored content workflow
1. Sponsor submits brief/draft via `/advertise` form.
2. Screening (see `06` §4): legit company, licensed if required, no scams/guaranteed returns.
3. Claude edits to house standard; adds disclosure; enforces `rel="sponsored"`; max 2–3 links.
4. Sponsor approves factual accuracy (not editorial tone of our sections).
5. Publish in `/sponsored/`; distribute per package; report metrics after 7 and 30 days.

## 6. Style guide (summary)
- Plain English, short paragraphs, answer first.
- Numbers: € and $ with dates ("as of 2 Nov 2026"). Use UTC for market times.
- Headlines: specific and factual, no clickbait question headlines for news.
- Each article ends with "Sources" and, where relevant, a risk note.

## 7. Distribution
- X brand account + your personal @hribson amplification (selectively).
- Telegram channel (crypto audience), LinkedIn (fintech audience), Reddit (careful, value-first).
- Newsletter: daily brief (crypto/markets) + weekly alternative-assets edition (watches/collectibles).
