# CLAUDE.md — Operating instructions for Claude on [BRAND]

Read this first every time work on this project resumes. Then read `08-ROADMAP.md` to find the current phase and the next unchecked `[CLAUDE]` task.

## Context
- Owner: Hribi (Matic Hriberšek), Slovenia. Crypto/Solana operator; runs social for HumidiFi and Harmonic. Founder of BalkanPay. Comfortable with Vercel.
- Goal: finance media + data site, SEO-first, monetized mainly by companies paying for labeled article placements. Reference model: CoinMarketCap (data pages + news + education).
- Site language: **English** first. Possible later: localized editions (SL/HR/SR).

## Non-negotiable rules
1. **Never build features that sell ranking power.** No dofollow paid links, ever. All sponsored/PR/affiliate links get `rel="sponsored noopener"`. Guest-contributor links get `rel="nofollow"` unless the editor adds them as editorial citations.
2. **Every paid piece is labeled** at the top ("Sponsored" / "Press Release" / "Partner content") and in structured data. Labels are enforced in code, not left to editors.
3. **Paid content stays in its own sections** (`/sponsored/`, `/press-releases/`), with its own templates, kept out of the main news feed ranking signals (see `04-SEO-PLAYBOOK.md` §7).
4. **No mass-generated thin pages.** Programmatic pages must each carry unique data or value; if a template page would have no unique data, it gets `noindex` until it does.
5. **AI drafts are never published without a named human editor's review.** Claude drafts; a human approves. The CMS records the reviewer.
6. **YMYL care:** no investment advice, no price predictions presented as fact, sources cited, numbers checked against the source before publish.
7. **Conflicts of interest are disclosed** (e.g., any coverage of BalkanPay, HumidiFi, Harmonic, or tokens the team holds).
8. Secrets never go in the repo. Use env vars on Vercel; `.env.example` lists names only.

## Conventions
- Repo layout and stack: see `03-TECH-ARCHITECTURE.md`.
- Commits: conventional commits (`feat:`, `fix:`, `content:`, `seo:`).
- Every new page template ships with: metadata, canonical, JSON-LD, breadcrumb, OG image, an entry in a sitemap, and a Lighthouse check (target ≥ 95 performance on mobile).
- Content briefs and drafts live in `/content-pipeline/` until moved into the CMS.
- When a task needs something only Hribi can provide (account, key, approval, money, signature), stop, list exactly what's needed in one message, and continue with other unblocked `[CLAUDE]` tasks.

## SEO system
Recurring SEO work runs through `/seo-system/` and the prompt library in `09-SEO-OPERATING-SYSTEM.md`. Load `business-context.md` before any SEO task.

## How to resume
1. Read `08-ROADMAP.md`. Find the current phase.
2. Check blocked items marked `⛔ waiting on HRIBI` and ask about them first.
3. Work the next `[CLAUDE]` items. Tick them when they are done **and verified** (build passes, page renders, validator passes).
4. Update the roadmap's "Status log" at the bottom with a dated one-liner.
