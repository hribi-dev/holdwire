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
