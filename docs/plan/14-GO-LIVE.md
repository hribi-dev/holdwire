# 14 — Go-live checklist

Status on 5 November 2026: the site builds and passes every check. A crawl of 308 pages found 0 broken pages and 0 broken links. Unknown URLs return real 404s, and each page has one `<h1>`. Long titles have short SEO titles, and descriptions are under 160 characters. What's left is mostly things only Hribi can do.

## A. Must do before launch (blocking)

| # | What | Who | How |
|---|---|---|---|
| 1 | **Buy the domain** (tickora.com / .eu) and add it to the Vercel project | Hribi | Vercel → Project → Domains. Then set the env vars in step 7. |
| 2 | **Publisher details**: which company publishes Tickora (s.p. or d.o.o.), its address and registration number | Hribi | Vercel env `NEXT_PUBLIC_PUBLISHER`, e.g. `Tickora d.o.o., Street 1, 1000 Ljubljana, reg. no. 1234567`. Shown on About and Privacy. |
| 3 | **Contact emails** | Hribi | `NEXT_PUBLIC_CONTACT_EMAIL` (required; used everywhere a specific one isn't set), optional `NEXT_PUBLIC_EDITOR_EMAIL`, `NEXT_PUBLIC_CORRECTIONS_EMAIL`, `NEXT_PUBLIC_PRIVACY_EMAIL`, `NEXT_PUBLIC_SPONSOR_EMAIL`. |
| 4 | **Lawyer review** of About, Privacy, Disclaimer, Editorial policy, Advertising policy, Disclosures; and whether Tickora must be entered in the Slovenian media register (razvid medijev) | Hribi + lawyer | Pages are in `content/pages/`. When approved, remove `draft` from each page's `status:` line. |
| 5 | **Your disclosures**: personal crypto holdings, including any HYPE or Hyperliquid trading | Hribi | Edit the line in `content/pages/disclosures.md`. Also confirm the editor bio on About. |
| 6 | **Review and approve content** you want in Google at launch. Unreviewed items stay online as labelled drafts and stay out of search. | Hribi | `npm run approve -- --list` shows what's waiting (on 5 Nov: 33 glossary terms, 8 School lessons, 3 guides, hub pages). Approve with `npm run approve -- "Matic Hriberšek" <file or folder>`. Hub pages: put your name in `src/content/reviews.ts`. |
| 7 | **Switch on indexing, production only** | Hribi | Vercel env (Production only): `NEXT_PUBLIC_SITE_URL=https://<domain>` and `SITE_INDEXABLE=true`. Never on previews. |
| 8 | **CoinGecko API key** so prices are live, not sample data | Hribi | Free Demo key to start: `COINGECKO_API_KEY`. Check the plan's terms for commercial use; upgrade (`COINGECKO_API_TIER=pro`) when traffic grows. |

## B. Should do before launch

| # | What | How |
|---|---|---|
| 9 | Newsletter: create a Beehiiv (or similar) publication | `NEXT_PUBLIC_NEWSLETTER_URL` = its hosted signup page. Both Subscribe buttons then go there; until then the form says sign-ups open at launch. |
| 10 | Reader tips (optional) | `NEXT_PUBLIC_TIP_SOLANA`, `NEXT_PUBLIC_TIP_EVM` (shown in the Sponsor sticker). |
| 11 | Google Search Console + Bing Webmaster Tools | Verify the domain, submit `https://<domain>/sitemap.xml`. |
| 12 | Social handles and trademark | Grab X / Telegram / Instagram handles; EUIPO/TMview check for classes 36 and 41. |
| 13 | Affiliate links | Send the URLs for EU-authorised providers; they go in `src/content/neobanks.ts`. |
| 14 | Native-speaker check of the 15 translations | Non-English pages stay `noindex` until then, so this doesn't block launch. |

## C. After launch

- Cookieless analytics (e.g. Vercel Web Analytics). The privacy page currently says "no analytics": update it in the same change.
- Google News Publisher Center application, once there are a few weeks of reviewed news.
- Keep approving the bot's daily drafts (`npm run approve`), ideally the same day.
- First sponsors: /advertise is live; the ad slots fill from `src/content/ads.ts`.

## What changes when you flip the switch

- `robots.txt` goes from "Disallow: /" to allowing crawlers, and the sitemap lists only reviewed content.
- Reviewed English pages become indexable. Drafts, press releases, non-English pages and unreviewed hubs stay `noindex`.
- Nothing else changes, so you can launch quietly and announce later.
