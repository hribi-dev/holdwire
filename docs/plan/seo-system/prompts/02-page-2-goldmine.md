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
