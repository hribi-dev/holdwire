# 09 — SEO operating system (Claude as "Chief of SEO")

Adapted from Sarvesh Shrivastava's (@bloggersarvesh) "Claude as Chief of SEO" method. The specific post Hribi linked (status 2088983373859725755) could not be fetched. This file uses the methods that recur across his published articles. **TODO: paste the exact post text into `/seo-system/source-article.md` and reconcile this file against it.**

His work is mostly **local** SEO (Google Business Profile, service areas). Those parts don't apply to a finance publisher. What carries over is the *system*: a context loaded once, competitor files, a prompt library, a data-first priority order, and AI-search visibility.

## 1. Context loaded once, never repeated
Folder `/seo-system/` in the repo:
```
/seo-system/
  business-context.md      brand, domain, verticals, audience, voice, monetization, rules from CLAUDE.md
  target-keywords.md       per vertical: pillar terms, cluster terms, priority tier
  competitors/
    coinmarketcap.md       URL patterns, page types, strengths, gaps, top pages
    coingecko.md
    coindesk.md
    theblock.md
    finextra.md
    hodinkee.md
    watchcharts.md
    ... (one file each, updated quarterly)
  prompts/                 one file per recurring SEO task (below)
  reports/                 dated outputs (weekly report, audits)
  source-article.md        the original X article text (TODO: Hribi pastes)
```
Every prompt starts with: "Use `/seo-system/business-context.md` and the relevant competitor files."

## 2. Prompt library (one file per task)
| # | Prompt file | Cadence | Output |
|---|---|---|---|
| 01 | `technical-audit.md` | monthly | crawl issues, CWV, indexation, schema errors → fix list |
| 02 | `page-2-goldmine.md` | **weekly** | GSC queries at position 11–20 with ≥100 impressions/mo → per-page optimization tasks (top priority every week) |
| 03 | `striking-distance-ctr.md` | weekly | pages in top 10 with CTR below the expected curve → title/meta rewrites |
| 04 | `content-gap-vs-competitors.md` | monthly | topics/entities competitors rank for that we don't → briefs |
| 05 | `topical-map-expand.md` | per vertical | pillar → cluster → page map with internal links |
| 06 | `content-brief.md` | per article | brief template (see `05`) |
| 07 | `content-decay.md` | monthly | pages losing clicks 3 months running → refresh list |
| 08 | `internal-link-audit.md` | monthly | orphans, weak hubs, link suggestions |
| 09 | `entity-batch-qa.md` | per batch | quality gate check on programmatic pages before indexing |
| 10 | `news-angle-finder.md` | daily | story shortlist + original angle |
| 11 | `ai-search-visibility.md` | bi-weekly | are we cited in ChatGPT / Perplexity / Google AI Mode for target queries? gaps → fixes |
| 12 | `serp-feature-capture.md` | monthly | featured snippets, PAA, Top Stories opportunities |
| 13 | `link-earning-ideas.md` | monthly | data/report/tool ideas + journalist targets |
| 14 | `sponsored-compliance-audit.md` | monthly | labels, `rel` attributes, sponsored share ≤15%, manual-action check |
| 15 | `weekly-report.md` | weekly | wins/losses/next actions for Hribi (1 page) |

## 3. Priority order (data first, new pages second)
Each week, in this order:
1. Fix anything broken (indexation, errors, manual actions).
2. **Page-2 goldmine:** moving a page from position 15 to 5 is worth more than publishing 10 new pages.
3. CTR fixes on pages already in the top 10.
4. Refresh decaying pages.
5. Only then: new content from the topical map.
(This only applies once GSC has data, roughly month 2+. Before that, the topical map drives everything.)

## 4. AI search visibility (GEO / AEO)
Finance questions increasingly get answered by Google AI Mode/AI Overviews, ChatGPT and Perplexity. We want to be the **cited source**.
- Answer-first blocks: a 40–60-word direct answer under each H2 that targets a question.
- Consistent entity data (same facts across entity page, schema, About page, Wikipedia/Wikidata where we qualify, Crunchbase, LinkedIn).
- Original numbers (reports, indices). LLMs cite unique data much more than rewrites.
- Clean HTML, fast pages, no content hidden behind JS; allow major AI crawlers in `robots.txt` (Hribi decides the policy; trade-off: visibility vs. content reuse).
- `llms.txt` with key hubs, reports and tools.
- Tracking: a fixed list of ~50 target prompts ("best EU crypto exchange", "is a Rolex Submariner a good investment", "cheapest way to send money to Serbia"), checked bi-weekly. Log whether we're cited and who is.
- Brand mentions matter: digital PR and expert quotes (Hribi) feed AI answers as much as links do.

## 5. What we deliberately don't take from generic "SEO hacks"
- No paid/dofollow link schemes, PBNs, or mass AI pages. They conflict with `CLAUDE.md` rules and finance YMYL standards.
- No fake reviews or fake author personas.
