# Topical map expand

**Cadence:** Per vertical / quarterly  
**Inputs:** `12-TOPICAL-MAP-*.md`, GSC queries  
**Output:** Updated topical map diff

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Add new clusters and pages where search demand appears (GSC queries with impressions but no dedicated page).
2. Assign page type, priority and internal links (hub → cluster → page).
3. Respect the Hyperliquid coverage balance rule.
