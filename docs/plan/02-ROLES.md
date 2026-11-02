# 02 — Who does what

Legend: **[CLAUDE]** Claude can do end-to-end · **[HRIBI]** only you can do it (identity, money, accounts, relationships, legal sign-off, final judgment) · **[BOTH]** Claude prepares, you decide/approve/execute the last step.

## What Claude can do on its own
**Strategy & research**
- Competitor teardown (CMC, CoinGecko, CoinDesk, The Block, Hodinkee, WatchCharts, Finextra, etc.): structure, page types, rate cards.
- Keyword and topic research via web search; full topical maps per vertical. (Deeper with your Ahrefs/Semrush exports.)
- Brand name shortlist + domain availability checks.

**Product & engineering**
- Full site build: Next.js, CMS schema, templates, components, design system.
- Technical SEO: metadata, JSON-LD (NewsArticle, Organization, Person, FAQ, Breadcrumb, Dataset), sitemaps (incl. news sitemap), robots, canonicals, hreflang (later), IndexNow, redirects, internal-linking engine.
- Data pipelines: crypto prices/markets, FX, fintech company data, watch/collectible reference data (from sources you approve).
- Programmatic page templates with quality gates (auto-`noindex` thin pages).
- Tools/calculators, OG image generator, RSS feeds, newsletter signup, sponsored-content labeling + link-attribute enforcement.
- Analytics dashboards, performance audits, Lighthouse/CWV fixes.

**Content**
- Topical maps, content calendar, briefs, outlines.
- Drafts of guides, glossaries, entity summaries, explainers, data reports (for human review).
- News monitoring: scheduled scans of sources → daily story shortlist with sources.
- Editing and fact-checking support (cross-checking numbers against cited sources).

**Commercial**
- Media kit, rate card, sponsorship packages, advertiser landing page, order form.
- Sponsored-content guidelines + contributor guidelines.
- Outreach email templates, prospect lists (from public info), follow-up sequences.
- Drafts of policies: editorial, corrections, disclosure, privacy, cookies, terms, disclaimers (**for lawyer review**).

**Ops**
- Weekly SEO/traffic reports, scheduled tasks for monitoring, roadmap upkeep.

## What only you can do
**Identity, money, accounts**
- Pick and buy the domain; register company/entity; bank account; Stripe/invoicing.
- Create accounts and give Claude access/keys: GitHub, Vercel, Cloudflare, CMS, DB, data APIs, email provider, newsletter platform, Google Search Console, GA4/Plausible, Google News Publisher Center, Bing Webmaster, ad networks.
- Pay for tools and freelancers.

**Credibility (E-E-A-T)**: this part can't be faked
- Be the named publisher/editor-in-chief with a real bio and real profiles (X, LinkedIn).
- Recruit 2–5 real contributors with real finance/crypto/watch expertise, with bylines and bios.
- Final approval on every published piece (or delegate to a hired editor).

**Legal**
- Lawyer review of policies, contracts, crypto-promotion rules; media registration if required.
- Sign advertiser contracts.

**Distribution & sales**
- Your network: first sponsors from the Solana/crypto ecosystem, intros, partnerships.
- Run X/Telegram/LinkedIn brand accounts (Claude drafts posts).
- Sales calls, negotiation, closing.
- Digital PR relationships with journalists (Claude prepares pitches).

**Judgment calls**
- Brand, design taste, editorial line, which sponsors to accept or reject.

## Handoff protocol
- When Claude is blocked, it sends **one** consolidated list: what's needed, why, and where to put it (e.g., "add `COINGECKO_API_KEY` in Vercel → Settings → Env").
- You answer in batches; Claude keeps working on unblocked items meanwhile.
