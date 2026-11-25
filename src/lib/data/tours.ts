import type { L } from "@/lib/i18n/types";
import { TELEGRAM_TOURS } from "./tours-telegram";
import { ARCHIVE_TOURS } from "./tours-archive";

export type TourCategory = "beach" | "excursion" | "mountain" | "visafree" | "family" | "newyear";
export type Currency = "USD" | "EUR" | "KGS";

export type TourHotel = { name: string; stars?: number; area?: L; room?: string; meal?: string; price: number };

export type Tour = {
  slug: string;
  title: L;
  place: L;
  country: L;
  /** Key for the country filter. */
  countryKey: string;
  categories: TourCategory[];
  /** Cover image; `gallery` adds more photos on the tour page. */
  img: string;
  gallery?: string[];
  currency: Currency;
  /** Departure city when it isn't Bishkek. */
  from?: L;
  airline?: string;
  route?: L;
  /** `nights` may be unknown (e.g. "flights every Wednesday"). */
  departures: { date: string; nights?: number; price: number }[];
  hotels?: TourHotel[];
  includes: L[];
  notIncluded?: L[];
  highlights?: L[];
  intro: L;
  bonus?: L;
  note: L;
  /** Overrides the default "per person, double occupancy" price caption. */
  priceNote?: L;
  hot?: boolean;
  /** Where the offer came from, e.g. "telegram:213". */
  source?: string;
};

/** All tours come from the Telegram channel: current offers first, then the archive of past ones. */
export const TOURS: Tour[] = [...TELEGRAM_TOURS, ...ARCHIVE_TOURS];

export const TOUR_CATEGORIES: TourCategory[] = ["newyear", "beach", "excursion", "family", "mountain", "visafree"];

/** Tour with past departures removed (null if nothing is left). A same-day departure can't be booked any more, so it counts as past. */
function actualize(t: Tour, today: string): Tour | null {
  const departures = t.departures.filter((d) => d.date > today);
  return departures.length ? { ...t, departures } : null;
}

/** Only tours that still have upcoming departures — the site never shows expired offers. */
export function actualTours(today: string): Tour[] {
  return TOURS.map((t) => actualize(t, today)).filter((t): t is Tour => t !== null);
}

/** Tours whose dates have all passed — kept on the tours page for reference, most recent first. */
export function pastTours(today: string): Tour[] {
  const last = (t: Tour) => t.departures[t.departures.length - 1]?.date ?? "";
  return TOURS.filter((t) => !actualize(t, today)).sort((a, b) => last(b).localeCompare(last(a)));
}

/** Tour by slug; `expired` = exists but all dates have passed. */
export function tourBySlug(slug: string, today: string): { tour: Tour; expired: boolean } | null {
  const t = TOURS.find((x) => x.slug === slug);
  if (!t) return null;
  const a = actualize(t, today);
  return a ? { tour: a, expired: false } : { tour: t, expired: true };
}

export function minTourPrice(t: Tour) {
  if (t.hotels?.length) return Math.min(...t.hotels.map((h) => h.price));
  return Math.min(...t.departures.map((d) => d.price));
}

/** Categories / countries present in the given tours (for filters). */
export function tourCategories(tours: Tour[]) {
  return TOUR_CATEGORIES.filter((c) => tours.some((t) => t.categories.includes(c)));
}

export function tourCountries(tours: Tour[]) {
  const m = new Map<string, L>();
  for (const t of tours) m.set(t.countryKey, t.country);
  return [...m.entries()].map(([key, name]) => ({ key, name }));
}
