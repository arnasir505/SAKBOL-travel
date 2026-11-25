"use client";

import Image from "next/image";
import Link from "next/link";
import { Flame, History, Moon, Plane } from "lucide-react";
import { minTourPrice, type Tour } from "@/lib/data/tours";
import { useT } from "@/lib/i18n/client";
import { pick } from "@/lib/i18n/types";
import type { DictKey } from "@/lib/i18n";

/** `past` = all dates have passed: shown muted, for reference only. */
export function TourCard({ tour, past }: { tour: Tour; past?: boolean }) {
  const { t, tn, lang, money, date } = useT();
  const nights = [...new Set(tour.departures.map((d) => d.nights).filter((n): n is number => n != null))].sort((a, b) => a - b);
  const first = tour.departures[0];
  return (
    <Link className={`tour ${past ? "past" : ""}`} href={`/tours/${tour.slug}`}>
      <div className="ph">
        <Image src={tour.img} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 300px" />
        <span className="cat">{t(`cat_${tour.categories[0]}` as DictKey)}</span>
        {past ? (
          <span className="hotflag pastflag">
            <History />
            {t("tour_past_badge")}
          </span>
        ) : tour.hot && (
          <span className="hotflag">
            <Flame />
            {t("tour_hot")}
          </span>
        )}
        <div className="place">
          <b>{pick(tour.place, lang)}</b>
          {pick(tour.country, lang) !== pick(tour.place, lang) && <small>{pick(tour.country, lang)}</small>}
        </div>
      </div>
      <div className="body">
        <h3>{pick(tour.title, lang)}</h3>
        <div className="facts">
          {nights.length > 0 && (
            <span>
              <Moon />
              {nights.length > 1 ? `${nights[0]}–${tn("nights", nights[nights.length - 1])}` : tn("nights", nights[0])}
            </span>
          )}
          <span>
            <Plane />
            {date(first.date)}
            {tour.departures.length > 1 ? ` +${tour.departures.length - 1}` : ""}
            {tour.from ? ` · ${pick(tour.from, lang)}` : ""}
          </span>
        </div>
        <div className="foot">
          <div className="price">
            <div className="lbl">{t("from")}</div>
            <span className="val">{money(minTourPrice(tour), tour.currency)}</span>
          </div>
          <span className="btn btn-dark btn-sm">{t("details")}</span>
        </div>
      </div>
    </Link>
  );
}
