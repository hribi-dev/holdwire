# Entity batch qa

**Cadence:** Per programmatic batch  
**Inputs:** The batch of coin/exchange/company pages  
**Output:** QA table, pass/fail

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. For each page: live data present? human-written profile present? ≥1 related guide/news? unique title/description?
2. Pages failing the gate stay `noindex` (no profile → not indexable). Report pass/fail counts.
