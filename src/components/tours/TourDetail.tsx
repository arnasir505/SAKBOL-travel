"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Check, CircleAlert, Gift, Info, MapPin, Minus, Plane, Plus, Route, Sparkles, Star } from "lucide-react";
import type { Tour } from "@/lib/data/tours";
import { useT } from "@/lib/i18n/client";
import { pick } from "@/lib/i18n/types";
import type { DictKey } from "@/lib/i18n";
import { lines, openWhatsApp } from "@/lib/whatsapp";
import { Gallery } from "./Gallery";
import { TourCard } from "./TourCard";
import { TourEmpty } from "./TourEmpty";

function Counter({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="counter">
      <span>{label}</span>
      <div className="stepper">
        <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`− ${label}`}>
          <Minus />
        </button>
        <span className="n">{value}</span>
        <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`+ ${label}`}>
          <Plus />
        </button>
      </div>
    </div>
  );
}

export function TourDetail({ tour, expired, other }: { tour: Tour; expired: boolean; other: Tour[] }) {
  const T = useT();
  const { t, lang } = T;
  const [dep, setDep] = useState(0);
  const [hotel, setHotel] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const d = tour.departures[dep];
  const h = tour.hotels?.[hotel];
  const price = h ? h.price : d.price;
  const title = pick(tour.title, lang);

  const book = () => {
    openWhatsApp(
      lines(
        `${t("msg_hello")} ${t("msg_tour", { title })}`,
        `${t("rq_departure")}: ${T.dateLong(d.date)}${d.nights ? ` (${T.tn("nights", d.nights)})` : ""}${tour.from ? `, ${t("tour_from_city").toLowerCase()} ${pick(tour.from, lang)}` : ""}`,
        h &&
          `${t("rq_hotel")}: ${h.name}${h.stars ? ` ${h.stars}*` : ""}${h.room ? `, ${h.room}` : ""}${h.meal ? `, ${h.meal}` : ""} — ${t("tour_from_price", { price: T.money(h.price, tour.currency) })}`,
        !h && `${t("tour_from_price", { price: T.money(d.price, tour.currency) })} ${t("per_person")}`,
        `${t("rq_adults")}: ${adults}${children ? `, ${t("rq_children").toLowerCase()}: ${children}` : ""}`,
        `${t("msg_link")}: ${window.location.origin}/tours/${tour.slug}`,
      ),
    );
  };

  return (
    <>
      <div className="tour-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tour.img} alt="" />
        <div className="scrim" />
        <div className="wrap inner">
          <Link className="back" href="/tours">
            <ArrowLeft />
            {t("nav_tours")}
          </Link>
          <div className="tags">
            {tour.categories.map((c) => (
              <span key={c} className="badge">
                {t(`cat_${c}` as DictKey)}
              </span>
            ))}
            {tour.hot && !expired && <span className="badge badge-hot">{t("tour_hot")}</span>}
            {expired && <span className="badge badge-past">{t("tour_past_badge")}</span>}
          </div>
          <h1>{title}</h1>
          <p>{[...new Set([pick(tour.place, lang), pick(tour.country, lang)])].join(", ")}</p>
        </div>
      </div>

      <div className="wrap tour-grid">
        <div className="tour-main">
          {expired && (
            <div className="notice notice-warn">
              <Info />
              <span>{t("tour_expired")}</span>
            </div>
          )}
          <section className="card tour-about">
            {(() => {
              // Lead = first sentence, set large; the rest follows in body size. Text itself is unchanged.
              const text = pick(tour.intro, lang);
              const m = text.match(/^(.+?[.!?…])\s+([\s\S]+)$/);
              return (
                <div className="about-lead">
                  <p className="lead">{m ? m[1] : text}</p>
                  {m && <p className="intro">{m[2]}</p>}
                </div>
              );
            })()}
            {tour.bonus && (
              <div className="about-bonus">
                <span className="ic">
                  <Gift />
                </span>
                <span>{pick(tour.bonus, lang)}</span>
              </div>
            )}
            {(tour.from || tour.airline || tour.route) && (
              <div className="tour-facts">
                {tour.from && (
                  <div>
                    <span className="ic">
                      <MapPin />
                    </span>
                    <span>
                      <small>{t("tour_from_city")}</small>
                      <b>{pick(tour.from, lang)}</b>
                    </span>
                  </div>
                )}
                {tour.airline && (
                  <div>
                    <span className="ic">
                      <Plane />
                    </span>
                    <span>
                      <small>{t("tour_airline")}</small>
                      <b>{tour.airline}</b>
                    </span>
                  </div>
                )}
                {tour.route && (
                  <div className="wide">
                    <span className="ic">
                      <Route />
                    </span>
                    <span>
                      <small>{t("tour_route")}</small>
                      <b>{pick(tour.route, lang)}</b>
                    </span>
                  </div>
                )}
              </div>
            )}
          </section>

          {tour.gallery && tour.gallery.length > 1 && <Gallery images={tour.gallery} title={title} />}

          <section className="card card-pad">
            <h2 className="sec-h">
              <CalendarDays />
              {t("tour_dates")}
            </h2>
            <div className="opts">
              {tour.departures.map((x, i) => (
                <button key={`${x.date}-${x.nights ?? ""}`} className={`opt ${i === dep && !expired ? "on" : ""}`} onClick={() => setDep(i)} aria-pressed={i === dep && !expired} disabled={expired}>
                  <span>
                    <b>{T.date(x.date, { day: "numeric", month: "long", weekday: "short" })}</b>
                    {x.nights != null && <small>{T.tn("nights", x.nights)}</small>}
                  </span>
                  {!tour.hotels && <em className="tnum">{t("tour_from_price", { price: T.money(x.price, tour.currency) })}</em>}
                </button>
              ))}
            </div>
          </section>

          {tour.hotels && (
            <section className="card card-pad">
              <h2 className="sec-h">
                <Star />
                {t("tour_hotels")}
              </h2>
              <div className="opts">
                {tour.hotels.map((x, i) => (
                  <button key={x.name} className={`opt ${i === hotel && !expired ? "on" : ""}`} onClick={() => setHotel(i)} aria-pressed={i === hotel && !expired} disabled={expired}>
                    <span>
                      <b>
                        {x.name} {x.stars ? <i className="stars">{"★".repeat(x.stars)}</i> : null}
                      </b>
                      {(x.area || x.room || x.meal) && (
                        <small>
                          {[x.area && pick(x.area, lang), x.room && `${t("tour_room")}: ${x.room}`, x.meal && `${t("tour_meal")}: ${x.meal}`].filter(Boolean).join(" · ")}
                        </small>
                      )}
                    </span>
                    <em className="tnum">{t("tour_from_price", { price: T.money(x.price, tour.currency) })}</em>
                  </button>
                ))}
              </div>
            </section>
          )}

          {tour.highlights && (
            <section className="card card-pad">
              <h2 className="sec-h">
                <Sparkles />
                {t("tour_highlights")}
              </h2>
              <ul className="ticks">
                {tour.highlights.map((x, i) => (
                  <li key={i}>
                    <Check />
                    {pick(x, lang)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="card card-pad">
            {tour.includes.length > 0 && (
              <>
                <h2 className="sec-h">
                  <Check />
                  {t("tour_includes")}
                </h2>
                <ul className="ticks">
                  {tour.includes.map((x, i) => (
                    <li key={i}>
                      <Check />
                      {pick(x, lang)}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {tour.notIncluded && tour.notIncluded.length > 0 && (
              <>
                <h2 className="sec-h" style={{ marginTop: tour.includes.length ? 20 : 0 }}>
                  <CircleAlert />
                  {t("tour_not_included")}
                </h2>
                <ul className="ticks minus">
                  {tour.notIncluded.map((x, i) => (
                    <li key={i}>
                      <CircleAlert />
                      {pick(x, lang)}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="notice notice-info" style={{ marginTop: tour.includes.length || tour.notIncluded?.length ? 14 : 0 }}>
              <Info />
              <span>{pick(tour.note, lang)}</span>
            </div>
          </section>
        </div>

        <aside className="tour-aside">
          {expired ? (
            <TourEmpty text={t("tour_expired")} />
          ) : (
            <div className="card card-pad sticky">
              <div className="tour-price">
                <small>{t("from")}</small>
                <b className="tnum">{T.money(price, tour.currency)}</b>
                <span className="muted">{tour.priceNote ? pick(tour.priceNote, lang) : t("tour_price_note")}</span>
              </div>
              <p className="seats">{t("tour_seats_limited")}</p>
              <h3 style={{ marginBottom: 14 }}>{t("tour_request")}</h3>
              <dl className="pick-summary">
                <div>
                  <dt>{t("rq_departure")}</dt>
                  <dd>
                    {T.date(d.date, { day: "numeric", month: "long" })}
                    {d.nights != null && ` · ${T.tn("nights", d.nights)}`}
                  </dd>
                </div>
                {h && (
                  <div>
                    <dt>{t("rq_hotel")}</dt>
                    <dd>{h.name}</dd>
                  </div>
                )}
              </dl>
              <Counter label={t("rq_adults")} value={adults} min={1} max={9} onChange={setAdults} />
              <Counter label={t("rq_children")} value={children} min={0} max={6} onChange={setChildren} />
              <button className="btn btn-primary btn-block" onClick={book} style={{ marginTop: 16 }}>
                {t("btn_book_tour")}
              </button>
            </div>
          )}
        </aside>
      </div>

      {other.length > 0 && (
        <section className="blk">
          <div className="wrap">
            <div className="head">
              <h2>{t("tour_other")}</h2>
            </div>
            <div className="tours">
              {other.map((x) => (
                <TourCard key={x.slug} tour={x} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
