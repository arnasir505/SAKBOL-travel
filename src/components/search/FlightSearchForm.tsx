"use client";

import { useState } from "react";
import { ArrowLeftRight, CalendarDays, Plus, Search, Trash2, X } from "lucide-react";
import { rules } from "@/config/site";
import { cityByCode } from "@/lib/data/places";
import { addDays, validateSearch, type SearchError } from "@/lib/flights/search-params";
import type { FlightSearch, SearchLeg, TripType } from "@/lib/flights/types";
import { useT } from "@/lib/i18n/client";
import { pick } from "@/lib/i18n/types";
import { lines, openWhatsApp } from "@/lib/whatsapp";
import { CityInput } from "./CityInput";
import { PaxPicker, cabinKey, type PaxState } from "./PaxPicker";

/**
 * Flight request form. No online booking: on submit it opens WhatsApp with a
 * ready message (route, dates, passengers, class) for a manager.
 */
export function FlightSearchForm({ initial, today, compact = false }: { initial: FlightSearch; today: string; compact?: boolean }) {
  const T = useT();
  const { t, lang } = T;
  const [trip, setTrip] = useState<TripType>(initial.trip);
  const [legs, setLegs] = useState<SearchLeg[]>(() =>
    initial.trip === "multi" ? initial.legs : [initial.legs[0] ?? { from: "FRU", to: "", date: addDays(today, 7) }],
  );
  const [ret, setRet] = useState<string>(initial.trip === "round" ? initial.legs[1]?.date ?? "" : "");
  const [pax, setPax] = useState<PaxState>({ adt: initial.adt, chd: initial.chd, inf: initial.inf, cabin: initial.cabin });
  const [errors, setErrors] = useState<SearchError[]>([]);

  const setLeg = (i: number, patch: Partial<SearchLeg>) => setLegs((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));

  const switchTrip = (tt: TripType) => {
    setErrors([]);
    if (tt === "multi" && legs.length < 2) {
      const l0 = legs[0];
      setLegs([l0, { from: l0.to, to: "", date: addDays(l0.date || today, 5) }]);
    }
    if (tt !== "multi") setLegs((ls) => [ls[0]]);
    if (tt === "round" && !ret) setRet(addDays(legs[0].date || today, 7));
    setTrip(tt);
  };

  const build = (): FlightSearch => {
    const base = { adt: pax.adt, chd: pax.chd, inf: pax.inf, cabin: pax.cabin };
    if (trip === "multi") return { trip, legs, ...base };
    const l0 = legs[0];
    if (trip === "round") return { trip, legs: [l0, { from: l0.to, to: l0.from, date: ret }], ...base };
    return { trip, legs: [l0], ...base };
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = build();
    const errs = validateSearch(q, today);
    setErrors(errs);
    if (errs.length) return;
    openWhatsApp(message(q));
  };

  const city = (code: string) => {
    const c = cityByCode(code);
    return c ? `${pick(c.name, lang)} (${c.code})` : code;
  };

  const message = (q: FlightSearch) => {
    const pax = [
      `${t("pax_adt")}: ${q.adt}`,
      q.chd ? `${t("pax_chd")}: ${q.chd}` : "",
      q.inf ? `${t("pax_inf")}: ${q.inf}` : "",
    ].filter(Boolean).join(", ");
    const route =
      q.trip === "multi"
        ? q.legs.map((l, i) => `${i + 1}. ${city(l.from)} → ${city(l.to)}, ${T.dateLong(l.date)}`)
        : [
            `${city(q.legs[0].from)} → ${city(q.legs[0].to)}${q.trip === "round" ? ` (${t("trip_round").toLowerCase()})` : ""}`,
            `${t("f_depart")}: ${T.dateLong(q.legs[0].date)}`,
            q.trip === "round" ? `${t("f_return")}: ${T.dateLong(q.legs[1].date)}` : "",
          ];
    return lines(`${t("msg_hello")} ${t("msg_flight")}`, ...route, `${pax} · ${t(cabinKey(q.cabin))}`);
  };

  const errAt = (leg: number, field: string) => {
    const e = errors.find((x) => x.leg === leg && x.field === field);
    return e ? t(e.key, e.vars) : undefined;
  };
  const paxErr = errors.find((x) => x.field === "pax");

  const button = (
    <button className="btn btn-primary searchbtn" type="submit">
      <Search />
      <span>{t("btn_find_flights")}</span>
    </button>
  );

  return (
    <form className={`fsearch ${compact ? "compact" : ""}`} onSubmit={submit} noValidate>
      <div className="tripmode">
        <div className="seg" role="radiogroup">
          {(["round", "one", "multi"] as TripType[]).map((tt) => (
            <button type="button" key={tt} role="radio" aria-checked={trip === tt} className={trip === tt ? "on" : ""} onClick={() => switchTrip(tt)}>
              {t(tt === "round" ? "trip_round" : tt === "one" ? "trip_one" : "trip_multi")}
            </button>
          ))}
        </div>
      </div>

      {trip !== "multi" ? (
        <div className="fields">
          <CityInput label={t("f_from")} value={legs[0].from} onChange={(c) => setLeg(0, { from: c })} error={errAt(0, "from")} />
          <button
            type="button"
            className="swapbtn"
            aria-label={t("swap")}
            title={t("swap")}
            onClick={() => setLeg(0, { from: legs[0].to, to: legs[0].from })}
          >
            <ArrowLeftRight />
          </button>
          <CityInput label={t("f_to")} value={legs[0].to} onChange={(c) => setLeg(0, { to: c })} error={errAt(0, "to")} />
          <div className={`field ${errAt(0, "date") ? "has-err" : ""}`}>
            <label htmlFor="dep">{t("f_depart")}</label>
            <div className="ctl">
              <CalendarDays />
              <input
                id="dep"
                type="date"
                min={today}
                value={legs[0].date}
                onChange={(e) => {
                  setLeg(0, { date: e.target.value });
                  if (ret && e.target.value > ret) setRet(e.target.value);
                }}
              />
            </div>
            {errAt(0, "date") && <span className="ferr">{errAt(0, "date")}</span>}
          </div>
          <div className={`field ${errAt(1, "date") ? "has-err" : ""}`}>
            <label htmlFor="ret">{t("f_return")}</label>
            <div className="ctl">
              <CalendarDays />
              <input
                id="ret"
                type="date"
                min={legs[0].date || today}
                value={trip === "round" ? ret : ""}
                onChange={(e) => {
                  setRet(e.target.value);
                  setTrip(e.target.value ? "round" : "one");
                }}
                aria-label={t("f_return")}
              />
              {trip === "round" && (
                <button type="button" className="clear" onClick={() => switchTrip("one")} aria-label={t("f_no_return")} title={t("f_no_return")}>
                  <X />
                </button>
              )}
            </div>
            {errAt(1, "date") && <span className="ferr">{errAt(1, "date")}</span>}
          </div>
          <PaxPicker value={pax} onChange={setPax} error={paxErr ? t(paxErr.key, paxErr.vars) : undefined} />
          {button}
        </div>
      ) : (
        <div className="multi">
          {legs.map((l, i) => (
            <div className="mrow" key={i}>
              <span className="legn">{t("leg_n", { n: i + 1 })}</span>
              <CityInput label={t("f_from")} value={l.from} onChange={(c) => setLeg(i, { from: c })} error={errAt(i, "from")} />
              <CityInput
                label={t("f_to")}
                value={l.to}
                onChange={(c) => {
                  setLeg(i, { to: c });
                  if (legs[i + 1] && !legs[i + 1].from) setLeg(i + 1, { from: c });
                }}
                error={errAt(i, "to")}
              />
              <div className={`field ${errAt(i, "date") ? "has-err" : ""}`}>
                <label>{t("f_date")}</label>
                <div className="ctl">
                  <CalendarDays />
                  <input type="date" min={legs[i - 1]?.date || today} value={l.date} onChange={(e) => setLeg(i, { date: e.target.value })} aria-label={t("f_date")} />
                </div>
                {errAt(i, "date") && <span className="ferr">{errAt(i, "date")}</span>}
              </div>
              <button
                type="button"
                className="rmseg"
                aria-label={t("remove_seg")}
                title={t("remove_seg")}
                disabled={legs.length <= 2}
                onClick={() => setLegs((ls) => ls.filter((_, j) => j !== i))}
              >
                <Trash2 />
              </button>
            </div>
          ))}
          <div className="multi-foot">
            {legs.length < rules.maxLegs && (
              <button
                type="button"
                className="addseg"
                onClick={() => {
                  const last = legs[legs.length - 1];
                  setLegs([...legs, { from: last.to, to: "", date: last.date ? addDays(last.date, 3) : "" }]);
                }}
              >
                <Plus />
                {t("add_seg")}
              </button>
            )}
            <PaxPicker value={pax} onChange={setPax} error={paxErr ? t(paxErr.key, paxErr.vars) : undefined} />
            {button}
          </div>
        </div>
      )}
    </form>
  );
}
