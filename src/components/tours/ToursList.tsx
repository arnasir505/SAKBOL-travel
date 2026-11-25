"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown, Globe } from "lucide-react";
import { minTourPrice, tourCategories, tourCountries, type Tour } from "@/lib/data/tours";
import { useT } from "@/lib/i18n/client";
import { pick } from "@/lib/i18n/types";
import type { DictKey } from "@/lib/i18n";
import { TourCard } from "./TourCard";
import { TourEmpty } from "./TourEmpty";

const PAST_PREVIEW = 8;

export function ToursList({ tours, past, initial }: { tours: Tour[]; past: Tour[]; initial: { country: string; month: string; cat: string } }) {
  const T = useT();
  const { t, lang } = T;
  const [country, setCountry] = useState(initial.country);
  const [month, setMonth] = useState(initial.month);
  const [cat, setCat] = useState(initial.cat);
  const [sort, setSort] = useState<"date" | "price">("date");
  const [allPast, setAllPast] = useState(false);

  const months = useMemo(() => [...new Set(tours.flatMap((x) => x.departures.map((d) => d.date.slice(0, 7))))].sort(), [tours]);
  const cats = tourCategories(tours);
  const list = useMemo(() => {
    const l = tours.filter(
      (x) =>
        (!country || x.countryKey === country) &&
        (!cat || x.categories.includes(cat as (typeof x.categories)[number])) &&
        (!month || x.departures.some((d) => d.date.startsWith(month))),
    );
    return sort === "price"
      ? [...l].sort((a, b) => minTourPrice(a) - minTourPrice(b))
      : [...l].sort((a, b) => a.departures[0].date.localeCompare(b.departures[0].date));
  }, [tours, country, cat, month, sort]);
  // Past tours follow the country/category filters; months only apply to upcoming dates.
  const pastList = past.filter((x) => (!country || x.countryKey === country) && (!cat || x.categories.includes(cat as (typeof x.categories)[number])));
  const pastShown = allPast ? pastList : pastList.slice(0, PAST_PREVIEW);

  return (
    <div className="wrap">
      <div className="page-head">
        <h1>{t("tours_page_h1")}</h1>
        <p className="sub">{t("tours_page_sub")}</p>
      </div>

      {tours.length > 0 && (
        <div className="tours-filters">
          {cats.length > 1 && (
            <div className="chips" style={{ marginBottom: 0 }}>
              <button className={`chip ${!cat ? "on" : ""}`} onClick={() => setCat("")}>
                {t("all")}
              </button>
              {cats.map((c) => (
                <button key={c} className={`chip ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>
                  {t(`cat_${c}` as DictKey)}
                </button>
              ))}
            </div>
          )}
          <div className="tf-selects">
            <label className="ctl">
              <Globe />
              <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label={t("f_dest")}>
                <option value="">{t("f_any_dest")}</option>
                {tourCountries(tours).map((c) => (
                  <option key={c.key} value={c.key}>
                    {pick(c.name, lang)}
                  </option>
                ))}
              </select>
            </label>
            <label className="ctl">
              <CalendarDays />
              <select value={month} onChange={(e) => setMonth(e.target.value)} aria-label={t("f_month")}>
                <option value="">{t("f_any_month")}</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {T.date(m + "-01", { month: "long", year: "numeric" })}
                  </option>
                ))}
              </select>
            </label>
            <div className="seg">
              <button className={sort === "date" ? "on" : ""} onClick={() => setSort("date")}>
                {t("sort_dep")}
              </button>
              <button className={sort === "price" ? "on" : ""} onClick={() => setSort("price")}>
                {t("sort_price")}
              </button>
            </div>
          </div>
        </div>
      )}

      {list.length ? (
        <div className="tours" style={{ marginTop: 22 }}>
          {list.map((x) => (
            <TourCard key={x.slug} tour={x} />
          ))}
        </div>
      ) : (
        <div style={{ marginTop: 22 }}>
          <TourEmpty />
        </div>
      )}

      {pastList.length > 0 && (
        <section className="past-tours">
          <div className="head">
            <div>
              <h2>{t("tours_past_h")}</h2>
            </div>
          </div>
          <div className="tours">
            {pastShown.map((x) => (
              <TourCard key={x.slug} tour={x} past />
            ))}
          </div>
          {pastList.length > pastShown.length && (
            <div className="center" style={{ marginTop: 20 }}>
              <button className="btn btn-ghost" onClick={() => setAllPast(true)}>
                {t("show_all", { n: pastList.length })}
                <ChevronDown />
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
