/**
 * Paid ad placements. Empty list = the slot shows our own "advertise here" card.
 * Every paid ad renders with an "Advertisement" label and rel="sponsored noopener" (house rules).
 * Remove an entry when its campaign ends (pages are pre-rendered, so dates aren't checked at runtime).
 * Placements: "home", "movers", "gold", "article".
 */
export type Ad = {
  placement: string;
  advertiser: string;
  href: string;
  headline: string;
  body?: string;
  /** Optional image (https or /images/...). */
  image?: string;
  imageAlt?: string;
  /** Campaign end (ISO date), for the editor: remove the entry when it passes. */
  until: string;
};

export const ADS: Ad[] = [];
