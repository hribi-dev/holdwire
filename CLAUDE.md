@AGENTS.md

# Holdwire — working rules

Full plan: `docs/plan/` (start with `docs/plan/CLAUDE.md` and `docs/plan/08-ROADMAP.md`).

## Non-negotiable
1. Never sell ranking power. Every sponsored, press-release or affiliate link goes through `enforceSponsoredLinks()` (`src/lib/sponsored.ts`) and gets `rel="sponsored noopener"`.
2. Every paid piece is labelled, in code, not by editor discipline.
3. Press releases are `noindex` (`robotsFor()`).
4. No thin programmatic pages: a coin page is indexable only with a human-written profile in `src/content/coin-profiles.ts`.
5. Nothing is published without a named human reviewer.
6. No investment advice or price predictions. Risk notice on price and guide pages.
7. Disclose conflicts (BalkanPay, Harmonic, HumidiFi) wherever relevant.
8. `SITE_INDEXABLE` stays unset on previews. Only production on the real domain sets it to `true`.

## Tech notes
- Next.js 16 with Cache Components. Read `node_modules/next/dist/docs/` before using an API you haven't checked.
- Data fetching: `"use cache"` + `cacheLife(...)`; runtime-only data goes in `<Suspense>`.
- Fonts are self-hosted via `@fontsource-variable/*` (no Google Fonts requests, GDPR-friendly).
- Before committing: `npm test && npm run lint && npm run build`.
