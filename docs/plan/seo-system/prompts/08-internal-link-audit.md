# Internal link audit

**Cadence:** Monthly  
**Inputs:** Site crawl  
**Output:** Link suggestions table

Load `/seo-system/business-context.md` and the rules in `/CLAUDE.md` first. Output goes to `/seo-system/reports/YYYY-MM-DD-<task>.md`.

## Steps
1. Orphan pages (no internal links in), pages with <3 links in, hubs linking to <5 children.
2. Suggest specific anchor text + source page for each fix. Glossary terms: first mention linked, max 5 per article.
