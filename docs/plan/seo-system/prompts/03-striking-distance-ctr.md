# Striking distance ctr

**Cadence:** Weekly  
**Inputs:** GSC export by page+query  
**Output:** Before/after titles and descriptions

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Pages in positions 1–10 whose CTR is clearly below the expected curve for their position.
2. Rewrite title and meta description for each (keep keyword, add a concrete benefit or number, ≤60/155 chars).
3. Check whether a rich result (FAQ, breadcrumb) is missing.
