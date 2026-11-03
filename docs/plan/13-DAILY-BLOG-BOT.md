# 13 — Daily blog and news bot (playbook)

A scheduled task runs this every morning (06:40 Europe/Ljubljana). It drafts the day's blog post(s) from the biggest news into `content/blog/`, and 2–5 short news briefs on the other notable stories into `content/news/`. Posts go live **as drafts**: visible on the site with a "Draft, awaiting editor review" banner, `noindex`, and kept out of the sitemap. Hribi approves a post or brief by filling in `reviewedBy:` (or replying "approved" to the run). Only then does it count as published for Google.

Why drafts: our rule 5 (no publishing without a named human reviewer) and Google's scaled-content policy. A daily AI post that goes straight into the index is the fastest way to get the whole domain demoted.

## 1. Gather (15–25 searches)
- Last 24 hours of crypto, fintech, gold and hard-asset news. Start broad ("crypto news today", "bitcoin price today"), then check: exchanges and hacks, regulation (EU/MiCA, US), ETFs and institutions, Hyperliquid, stablecoins, big token moves, market-moving posts by Musk, Trump, CZ and similar.
- Prefer original or top-tier sources: CoinDesk, The Block, Reuters, Bloomberg (via secondary reports), Cointelegraph, DL News, regulators' own sites. Avoid price-prediction sites and press-release mirrors as sole sources.
- Check what we already covered: list `content/blog/` and `content/news/`. Don't repeat a story unless there is a real development.

## 2. Decide how many posts
Count **major stories** from the last 24 hours. A story is major if any of these is true:
- A top-20 coin moved ±8% or more in 24 hours, or total crypto market cap moved ±5% or more
- A hack or exploit of $50M or more, or an exchange halting withdrawals
- A significant regulatory or court decision (EU, US, UK, or a large Asian market)
- An ETF approval or launch, or a major institutional move (a bank, an exchange owner, a top-50 company)
- Major Hyperliquid news (always counts, it's our lead topic)
- A post by a market mover that measurably moved a price

| Major stories | Posts to write |
|---|---|
| 0–1 | 1 (the most interesting story of the day) |
| 2–3 | 2 |
| 4 or more | 3 (maximum) |

## 3. Write each blog post
- File: `content/blog/<slug>-<YYYY-MM-DD>.md`. Frontmatter exactly like `content/blog/binance-hack-what-it-means-2026-11-02.md`: title, description (≤160 chars), category (Markets, Regulation, Hyperliquid, Fintech, Memes or Security; it also places the post under "Latest news" on the matching section page, see 3b), `author: Tickora`, `reviewedBy:` **left empty**, published/updated = today, and 3–6 `sources` with title + URL.
- Structure: a bold **Short version** first (2–3 sentences), then `## What happened`, `## Why it matters` (or similar), `## What this means for you` (practical, EU reader), `## What to watch`. 500–900 words.
- Style: plain English, short sentences, numbers exactly as the source gives them, attribute every claim ("according to TRM Labs"). No investment advice, no price predictions, no "buy" language. End with: `*This article is general information, not investment advice.*`
- Copyright: paraphrase. At most one short quote (under 15 words) per source.
- Link to our own pages where it helps: `/learn/mica-explained`, `/hyperliquid`, `/fintech`, `/memes`, `/movers`, `/glossary`.
- Conflicts: if the story involves BalkanPay, HumidiFi or Harmonic, add a disclosure line at the top.

### Cover photo (every post and brief gets its own)
Each new post gets a **related, freely licensed photo**. Don't reuse a photo another post already uses (`grep -r "src: https://images" content/`).
1. Search with WebSearch limited to `unsplash.com` (first choice) or `pexels.com`, using 2–4 concrete words for the story (e.g. "padlock keyboard", "EU flags Brussels", "trading charts screens", "calendar planner").
2. WebFetch the photo's own page (`unsplash.com/photos/...` or `pexels.com/photo/...`) and confirm: it says **free to use under the Unsplash License** (or the Pexels License), it is **not Unsplash+** (`plus.unsplash.com`) and not a sponsored iStock/Getty result. Take the CDN URL (`https://images.unsplash.com/photo-...` or `https://images.pexels.com/photos/...`) without query parameters, and the photographer's name.
3. Wikimedia Commons is allowed for things stock sites lack (a specific building or object): use only CC0, public domain, CC BY or CC BY-SA files, and for CC BY / BY-SA set `licenseUrl` to the exact licence version.
4. **Never:** photos of identifiable real people (no Musk, Trump, CZ, executives, or crowds where faces are the subject); company logos, exchange or app branding, or screenshots of a company's product; politically charged imagery; anything from Google Images, news sites or social media. Generic crypto coin props (a ₿ coin) are fine.
5. Add to the frontmatter, then `npm test` validates it (wrong host, missing credit or licence fails the build):
   ```yaml
   cover:
     src: https://images.unsplash.com/photo-1774898989484-0b9becf69efb
     alt: "A locked padlock resting on a computer keyboard"   # describe what's in the photo
     credit: "Sasun Bughdaryan"
     sourceUrl: https://unsplash.com/photos/a-padlock-rests-on-a-computer-keyboard-QP7RBa5r8HM
     license: unsplash        # unsplash | pexels | cc0 | public-domain | cc-by | cc-by-sa
   ```
   The site credits the photographer under the article, hotlinks the CDN (as Unsplash asks) and falls back to generated cover art if a photo ever disappears. If no good photo turns up in a few searches, leave `cover:` out rather than using a poor match.

## 3b. Write the news briefs (every run)
Blog and news do different jobs, so they never cover the same story:
- **Blog** = the day's biggest story (or two, three), explained at length: what happened, why, what it means for you.
- **News** = the *other* notable stories of the last 24 hours as short factual briefs. Never brief a story that today's blog post covers, and never repeat a story already in `content/news/` unless there's a real new development (then say what's new in the title).

How many: 2 on a quiet day, up to 5 on a busy one. Pick for our audience (EU readers, crypto + fintech + hard assets), and aim to spread across our sections rather than five Bitcoin price stories.

Each brief:
- File: `content/news/<slug>-<YYYY-MM-DD>.md`. Frontmatter exactly like `content/news/mica-four-months-on.md`: title (states the news plainly, no clickbait), description (≤160 chars), `category`, `author: Tickora`, `reviewedBy:` **left empty**, published/updated = today, 2–4 `sources`, and a `cover:` (same rules as blog covers below; a different photo from every other post).
- `category` must be one of these, because it decides which section page shows the brief under "Latest news":
  | category | shows on | use for |
  |---|---|---|
  | `Hyperliquid` | /hyperliquid | anything Hyperliquid, HIP-3, HYPE |
  | `Regulation` | /coins | MiCA, ESMA, SEC/CFTC, court rulings, tax |
  | `Fintech` | /fintech | neobanks, crypto cards, payments, stablecoin payments |
  | `Memes` | /memes | memecoins, launchpads (pump.fun etc.) |
  | `Markets` | /coins | prices, ETFs, institutions, macro |
  | `Security` | /coins | hacks, exploits, scams, withdrawals halted |
  | `Gold` | /gold | gold and silver prices, central-bank buying, gold vs bitcoin, tokenized gold |
- Length 150–300 words. Structure: one bold lead sentence with the key fact and number; 2–4 short paragraphs (what happened, context, what it means for EU readers); then one line linking the matching Tickora page, e.g. "More: [Hyperliquid hub](/hyperliquid)", "[MiCA explained](/learn/mica-explained)", "[Neobanks compared](/fintech)", "[Memecoins live](/memes)", "[Coin prices](/coins)" or a School lesson (`/school/spotting-scams`, `/school/exchanges-and-mica`, `/school/wallets-and-seed-phrases`) where it genuinely helps.
- Same style, attribution, copyright and no-advice rules as blog posts. End with `*General information, not investment advice.*`
- Conflicts: BalkanPay, HumidiFi or Harmonic in the story → disclosure line at the top.

## 4. Market movers (every run)
The /movers page must stay current. Every run, check the last 24–48 hours for posts by the people in `PEOPLE` in `src/content/movers.ts` (Musk, Trump, CZ, Saylor, Schiff, Hayes, Tom Lee, Lyn Alden, Raoul Pal, Vitalik) and similar figures.

**New event** when a credible outlet reports that a post moved a price. Add it to the top of `EVENTS` (follow the comment at the top of the file):
- `postUrl`: the exact post on x.com (`https://x.com/<handle>/status/<id>`). The site shows it with a click-to-load embed, so always try to find it (outlets often link it).
- Exact time: for X posts, compute it from the post ID: `new Date(Number((BigInt(id) >> 22n) + 1288834974657n)).toISOString()`. Then set `precision: "minute"` and `hlCoin` if Hyperliquid lists that coin: the site measures the reaction itself.
- `summary` paraphrased (quote at most a few words), `reported` attributed to the outlet, `sources` with links. A post that got attention but did *not* move the price can be logged too, with `reported` saying so; that's useful context.

**Updated take** when one of the voices says something notable about crypto, gold or macro (an essay, a big call, a purchase announcement): replace their `take` with the new one (date, one or two paraphrased sentences, source). Keep it neutral: what they said, never whether they're right.

**New person**: only if they repeatedly move markets or are widely cited, and only with a verified profile URL. Give them a distinct colour and correct `focus` tags (`Gold` puts them on /gold).

## 5. Check and publish as draft
1. `npm ci && npm test && npm run lint && npm run typecheck && npm run build` must pass.
2. Commit to `main` with the message `content: <blog title> + N news briefs (draft)`, author `Matic Hriberšek <matic.hribersek@gmail.com>`, then push. Vercel deploys automatically.
3. Report: the blog post title(s) and news brief titles with their categories, any movers events or takes added, the cover photo used for each (photographer + link), one line on why each story was picked, how many major stories you counted, and the live URL(s) at `https://holdwire-eta.vercel.app/blog/<slug>` and `/news/<slug>`. Remind Hribi that the post is a draft until he approves it.

## If something fails
If the build fails, fix it if it's your file; otherwise don't push and report the error. If there is truly no news worth a post (rare), write nothing and say why.
