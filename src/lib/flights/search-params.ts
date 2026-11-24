import { rules } from "@/config/site";
import { cityByCode } from "@/lib/data/places";
import type { DictKey } from "@/lib/i18n";
import type { FlightSearch } from "./types";

const ISO = /^\d{4}-\d{2}-\d{2}$/;

export function todayISO(now = new Date()) {
  const y = now.getFullYear(), m = String(now.getMonth() + 1).padStart(2, "0"), d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(iso: string, n: number) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export type SearchError = { key: DictKey; vars?: Record<string, string | number>; leg?: number; field?: string };

/** Business rules from process §5. */
export function validateSearch(q: FlightSearch, today = todayISO()): SearchError[] {
  const errs: SearchError[] = [];
  const legs = q.trip === "round" ? q.legs.slice(0, 1) : q.legs;
  legs.forEach((l, i) => {
    if (!cityByCode(l.from)) errs.push({ key: "err_from", leg: i, field: "from" });
    if (!cityByCode(l.to)) errs.push({ key: "err_to", leg: i, field: "to" });
    if (l.from && l.from === l.to) errs.push({ key: "err_same", leg: i, field: "to" });
    if (!ISO.test(l.date)) errs.push({ key: "err_date", leg: i, field: "date" });
    else if (l.date < today) errs.push({ key: "err_past", leg: i, field: "date" });
  });
  if (q.trip === "round") {
    const r = q.legs[1]?.date ?? "";
    if (!ISO.test(r)) errs.push({ key: "err_date", leg: 1, field: "date" });
    else if (ISO.test(q.legs[0].date) && r < q.legs[0].date) errs.push({ key: "err_return_before", leg: 1, field: "date" });
  }
  if (q.trip === "multi") {
    for (let i = 1; i < q.legs.length; i++) {
      if (ISO.test(q.legs[i].date) && ISO.test(q.legs[i - 1].date) && q.legs[i].date < q.legs[i - 1].date) {
        errs.push({ key: "err_order", leg: i, field: "date" });
      }
    }
  }
  const total = q.adt + q.chd + q.inf;
  if (total > rules.maxPassengers) errs.push({ key: "err_max_pax", vars: { n: rules.maxPassengers }, field: "pax" });
  if (q.adt < 1) errs.push({ key: "err_need_adult", field: "pax" });
  if (q.inf > q.adt) errs.push({ key: "err_inf", field: "pax" });
  return errs;
}

