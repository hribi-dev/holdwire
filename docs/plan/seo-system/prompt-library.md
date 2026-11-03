# SEO prompt library (all 15)

# Technical audit

**Cadence:** Monthly  
**Inputs:** GSC coverage + Core Web Vitals export, `next build` output, live sitemap.xml and robots.txt  
**Output:** Fix list table: issue · URLs affected · fix · effort

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Crawl the sitemap URLs (or a Playwright crawl of the site). Record status codes, canonicals, robots meta, titles, descriptions, H1s, JSON-LD validity.
2. Flag: non-200 URLs in the sitemap; indexable pages missing canonical/title/description; duplicate titles; JSON-LD errors; pages >200KB HTML; LCP/INP/CLS failures from GSC.
3. Check every sponsored/press-release URL: label present, all outbound links `rel="sponsored"`, PRs `noindex`.
4. Output a fix list ordered by impact, each with the file/route to change.

---

# Page 2 goldmine

**Cadence:** Weekly (top priority once GSC has data)  
**Inputs:** GSC Performance export, last 28 days, by page + query  
**Output:** Task list: page · query · pos · impressions · edits

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Filter queries with average position 11–20 and ≥100 impressions.
2. Group by page. For each page: target query, current position, impressions, CTR.
3. For each page propose concrete edits: answer-first block for the query, missing subtopics competitors cover, internal links from 3 stronger pages, title/H1 alignment, FAQ additions.
4. Rank pages by (impressions × position gap). Top 10 become this week's optimisation tasks.

---

# Striking distance ctr

**Cadence:** Weekly  
**Inputs:** GSC export by page+query  
**Output:** Before/after titles and descriptions

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Pages in positions 1–10 whose CTR is clearly below the expected curve for their position.
2. Rewrite title and meta description for each (keep keyword, add a concrete benefit or number, ≤60/155 chars).
3. Check whether a rich result (FAQ, breadcrumb) is missing.

---

# Content gap vs competitors

**Cadence:** Monthly  
**Inputs:** Competitor files in `/seo-system/competitors/`, SEO-tool keyword exports if available  
**Output:** Gap table + 10 briefs

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. List topics/entities competitors rank for that Tickora has no page for, by vertical.
2. Remove anything off-strategy or thin. Prioritise EU angle, Hyperliquid pillar, data/utility pages.
3. Produce briefs for the top 10 using `06-content-brief.md`.

---

# Topical map expand

**Cadence:** Per vertical / quarterly  
**Inputs:** `12-TOPICAL-MAP-*.md`, GSC queries  
**Output:** Updated topical map diff

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Add new clusters and pages where search demand appears (GSC queries with impressions but no dedicated page).
2. Assign page type, priority and internal links (hub → cluster → page).
3. Respect the Hyperliquid coverage balance rule.

---

# Content brief

**Cadence:** Per article  
**Inputs:** Target query, SERP top 10, related entities  
**Output:** Brief in the format of `content-pipeline/briefs/launch-guides-p1.md`

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
Produce: target query + intent; angle (why ours beats the top 10); outline with answer-first block; required primary sources; internal links in/out; entities to tag; FAQ candidates (real questions only); disclosure needed? (BalkanPay/Harmonic/HumidiFi/Hyperliquid holdings).

---

# Content decay

**Cadence:** Monthly  
**Inputs:** GSC export, 6 months, by page  
**Output:** Refresh list with diagnosis

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Pages losing clicks three months running, or down >30% vs prior quarter.
2. Diagnose: outdated facts, new competitor, intent shift, cannibalisation.
3. Refresh plan per page; real updates only (`updated` date changes only with real changes).

---

# Internal link audit

**Cadence:** Monthly  
**Inputs:** Site crawl  
**Output:** Link suggestions table

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Orphan pages (no internal links in), pages with <3 links in, hubs linking to <5 children.
2. Suggest specific anchor text + source page for each fix. Glossary terms: first mention linked, max 5 per article.

---

# Entity batch qa

**Cadence:** Per programmatic batch  
**Inputs:** The batch of coin/exchange/company pages  
**Output:** QA table, pass/fail

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. For each page: live data present? human-written profile present? ≥1 related guide/news? unique title/description?
2. Pages failing the gate stay `noindex` (no profile → not indexable). Report pass/fail counts.

---

# News angle finder

**Cadence:** Daily  
**Inputs:** Sources list: regulators (ESMA, national), exchange blogs, Hyperliquid announcements, X lists, on-chain alerts  
**Output:** Story shortlist

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Shortlist 5–8 stories from the last 24h. For each: what happened, why it matters to EU readers, primary source link, suggested Tickora angle (data, context, EU impact), related entity pages.
2. Hyperliquid stories first where newsworthy, but keep the coverage balance.
3. Never present rumours as fact; label unconfirmed items.

---

# Ai search visibility

**Cadence:** Bi-weekly  
**Inputs:** The fixed list of ~50 target prompts in `/seo-system/ai-prompts.md`  
**Output:** Visibility table + fixes

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. For each prompt, check whether ChatGPT / Perplexity / Google AI answers cite Tickora and who they cite instead.
2. For gaps: identify the cited page's advantage (original data? clear answer block? entity consistency?) and propose a fix.

---

# Serp feature capture

**Cadence:** Monthly  
**Inputs:** GSC + manual SERP checks for top 50 queries  
**Output:** Opportunity list

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Which queries show featured snippets, People Also Ask, Top Stories, video?
2. For each we could win: the exact block to add (40–60 word answer, table, list).

---

# Link earning ideas

**Cadence:** Monthly  
**Inputs:** Recent news, our data assets (Hyperliquid stats, MiCA data, remittance costs)  
**Output:** Ideas + pitch drafts

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. 3 data-report ideas journalists would cite, with data source and method.
2. Target journalists/outlets for each (public info only).
3. Draft pitch emails for Hribi to send. No paid links, no link exchanges.

---

# Sponsored compliance audit

**Cadence:** Monthly  
**Inputs:** All `/sponsored/` and `/press-releases/` entries  
**Output:** Pass/fail checklist

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Sponsored share of published pages ≤15%.
2. Every paid page: label, sponsor named, disclosure box, outbound links `rel="sponsored"`, PRs `noindex`, not in editorial modules or sitemap (PRs).
3. Sponsor screening still valid (licensing, no guaranteed-return claims).
4. GSC Manual Actions: none.

---

# Weekly report

**Cadence:** Weekly (Monday)  
**Inputs:** GSC, analytics, outputs of 02/03/07/10  
**Output:** One-page report

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
One page for Hribi: traffic and indexation vs last week; top 3 wins; top 3 problems; what Claude did; this week's plan (in the `09` priority order: fixes → page-2 goldmine → CTR → decay → new content); anything blocked on Hribi.

---

