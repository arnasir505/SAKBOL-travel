"use client";

import { useId, useMemo, useRef, useState } from "react";
import { MapPin, Plane } from "lucide-react";
import { cityByCode, searchCities } from "@/lib/data/places";
import { useT } from "@/lib/i18n/client";
import { pick } from "@/lib/i18n/types";

export function CityInput({
  label,
  value,
  onChange,
  error,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (code: string) => void;
  error?: string;
  autoFocus?: boolean;
}) {
  const { t, lang } = useT();
  const id = useId();
  const city = cityByCode(value);
  const [text, setText] = useState<string | null>(null); // null = show selected city
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const shown = text ?? (city ? pick(city.name, lang) : "");
  const list = useMemo(() => (open ? searchCities(text ?? "", 8) : []), [open, text]);

  const choose = (code: string) => {
    onChange(code);
    setText(null);
    setOpen(false);
  };

  return (
    <div className={`field city ${error ? "has-err" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="ctl">
        <MapPin />
        <input
          id={id}
          ref={inputRef}
          autoFocus={autoFocus}
          value={shown}
          placeholder={t("f_city_ph")}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          onFocus={(e) => {
            e.target.select();
            setOpen(true);
            setHi(0);
          }}
          onChange={(e) => {
            setText(e.target.value);
            setOpen(true);
            setHi(0);
          }}
          onBlur={() => {
            // keep a typed exact match, otherwise restore the selection
            setTimeout(() => {
              setOpen(false);
              setText(null);
            }, 150);
          }}
          onKeyDown={(e) => {
            if (!open) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHi((h) => Math.min(h + 1, list.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHi((h) => Math.max(h - 1, 0));
            } else if (e.key === "Enter" && list[hi]) {
              e.preventDefault();
              choose(list[hi].code);
              inputRef.current?.blur();
            } else if (e.key === "Escape") {
              setOpen(false);
              setText(null);
            }
          }}
        />
        {city && text == null && <span className="code">{city.code}</span>}
      </div>
      {error && <span className="ferr">{error}</span>}
      {open && (
        <ul className="dropdown" id={`${id}-list`} role="listbox">
          {list.length === 0 && <li className="empty">{t("no_matches")}</li>}
          {list.map((c, i) => (
            <li
              key={c.code}
              role="option"
              aria-selected={i === hi}
              className={i === hi ? "hi" : ""}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(c.code);
                inputRef.current?.blur();
              }}
              onMouseEnter={() => setHi(i)}
            >
              <Plane />
              <span className="nm">
                <b>{pick(c.name, lang)}</b>
                <small>
                  {pick(c.country, lang)}
                  {c.airports.length > 1 ? " · " + c.airports.map((a) => a.code).join(", ") : ""}
                </small>
              </span>
              <span className="code">{c.code}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
