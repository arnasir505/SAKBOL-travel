"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BedDouble, CalendarDays, Globe, Hotel, MapPin, Plane, Search, Sparkles, TreePalm, Users } from "lucide-react";
import type { FlightSearch } from "@/lib/flights/types";
import { addDays } from "@/lib/flights/search-params";
import { tourCategories, tourCountries, type Tour } from "@/lib/data/tours";
import { useT } from "@/lib/i18n/client";
import { pick } from "@/lib/i18n/types";
import type { DictKey } from "@/lib/i18n";
import { lines, openWhatsApp } from "@/lib/whatsapp";
import { FlightSearchForm } from "./FlightSearchForm";

type Tab = "air" | "tour" | "hotel";

export function SearchCard({ initial, today, tours }: { initial: FlightSearch; today: string; tours: Tour[] }) {
  const { t } = useT();
  const [tab, setTab] = useState<Tab>("air");
  const tabs: { k: Tab; label: DictKey; icon: typeof Plane }[] = [
    { k: "air", label: "tab_air", icon: Plane },
    { k: "tour", label: "tab_tour", icon: TreePalm },
    { k: "hotel", label: "tab_hotel", icon: Hotel },
  ];
  return (
    <div className="searchcard">
      <div className="tabs" role="tablist">
        {tabs.map((x) => (
          <button key={x.k} role="tab" aria-selected={tab === x.k} className={`tab ${tab === x.k ? "on" : ""}`} onClick={() => setTab(x.k)}>
            <x.icon />
            <span>{t(x.label)}</span>
          </button>
        ))}
      </div>
      <div className="panel" hidden={tab !== "air"}>
        <FlightSearchForm initial={initial} today={today} />
      </div>
      {tab === "tour" && (
        <div className="panel">
          <TourSearch tours={tours} />
        </div>
      )}
      {tab === "hotel" && (
        <div className="panel">
          <HotelSearch today={today} />
        </div>
      )}
    </div>
  );
}

/** Filters the tour catalogue (information only). */
function TourSearch({ tours }: { tours: Tour[] }) {
  const { t, lang, date } = useT();
  const router = useRouter();
  const [country, setCountry] = useState("");
  const [month, setMonth] = useState("");
  const [cat, setCat] = useState("");
  const months = [...new Set(tours.flatMap((x) => x.departures.map((d) => d.date.slice(0, 7))))].sort();
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (country) p.set("country", country);
    if (month) p.set("month", month);
    if (cat) p.set("cat", cat);
    router.push(`/tours${p.size ? "?" + p : ""}`);
  };
  return (
    <form className="fields fields-tour" onSubmit={go}>
      <div className="field">
        <label>{t("f_from2")}</label>
        <div className="ctl">
          <MapPin />
          <select defaultValue="FRU" aria-label={t("f_from2")}>
            <option value="FRU">{lang === "en" ? "Bishkek" : "Бишкек"}</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label>{t("f_dest")}</label>
        <div className="ctl">
          <Globe />
          <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label={t("f_dest")}>
            <option value="">{t("f_any_dest")}</option>
            {tourCountries(tours).map((c) => (
              <option key={c.key} value={c.key}>
                {pick(c.name, lang)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label>{t("f_month")}</label>
        <div className="ctl">
          <CalendarDays />
          <select value={month} onChange={(e) => setMonth(e.target.value)} aria-label={t("f_month")}>
            <option value="">{t("f_any_month")}</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {date(m + "-01", { month: "long", year: "numeric" })}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label>{t("f_category")}</label>
        <div className="ctl">
          <Sparkles />
          <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label={t("f_category")}>
            <option value="">{t("all")}</option>
            {tourCategories(tours).map((c) => (
              <option key={c} value={c}>
                {t(`cat_${c}` as DictKey)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-primary searchbtn" type="submit">
        <Search />
        {t("btn_tour")}
      </button>
    </form>
  );
}

/** Hotel request → WhatsApp message. */
function HotelSearch({ today }: { today: string }) {
  const T = useT();
  const { t, tn } = T;
  const [city, setCity] = useState("");
  const [din, setIn] = useState(addDays(today, 14));
  const [dout, setOut] = useState(addDays(today, 21));
  const [guests, setGuests] = useState(2);
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(
      lines(
        `${t("msg_hello")} ${t("msg_hotel")}`,
        city && `${t("f_city")}: ${city}`,
        `${t("f_in")}: ${T.dateLong(din)}`,
        `${t("f_out")}: ${T.dateLong(dout)}`,
        `${tn("guests_word", guests)}`,
      ),
    );
  };
  return (
    <form className="fields fields-hotel" onSubmit={go}>
      <div className="field">
        <label htmlFor="h-city">{t("f_city")}</label>
        <div className="ctl">
          <BedDouble />
          <input id="h-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Dubai, Istanbul…" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="h-in">{t("f_in")}</label>
        <div className="ctl">
          <CalendarDays />
          <input id="h-in" type="date" min={today} value={din} onChange={(e) => setIn(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="h-out">{t("f_out")}</label>
        <div className="ctl">
          <CalendarDays />
          <input id="h-out" type="date" min={din} value={dout} onChange={(e) => setOut(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="h-g">{t("f_guests")}</label>
        <div className="ctl">
          <Users />
          <select id="h-g" value={guests} onChange={(e) => setGuests(+e.target.value)}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {tn("guests_word", n)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="btn btn-primary searchbtn" type="submit">
        <Search />
        {t("btn_find_hotel")}
      </button>
    </form>
  );
}
