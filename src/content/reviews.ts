/**
 * Editor sign-off for hub pages. Put the reviewer's full name to approve a page:
 * it then loses its "Draft" label and can be indexed by search engines (in production).
 * Articles, guides, glossary terms and School lessons are approved in their own files
 * with `reviewedBy:` (or `npm run approve`).
 */
export const PAGE_REVIEWS: Record<"fintech" | "watches" | "collectibles" | "memes" | "movers" | "gold", string | null> = {
  fintech: null,
  watches: null,
  collectibles: null,
  memes: null,
  movers: null,
  gold: null,
};
