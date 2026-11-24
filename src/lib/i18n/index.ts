import { ru, type DictKey, type Dict } from "./ru";
import { en } from "./en";
import { ky } from "./ky";
import { LOCALE, type Lang } from "./types";

export * from "./types";
export type { DictKey };

const DICTS: Record<Lang, Dict> = { ru, ky, en };

type Vars = Record<string, string | number>;

function interpolate(s: string, vars?: Vars) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`));
}

function pluralIndex(lang: Lang, n: number, forms: number) {
  if (forms === 1) return 0;
  if (lang === "ru") {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return 0;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 1;
    return Math.min(2, forms - 1);
  }
  return n === 1 ? 0 : 1;
}

export type Translator = ReturnType<typeof makeT>;

export function makeT(lang: Lang) {
  const dict = DICTS[lang] ?? ru;
  const locale = LOCALE[lang];

  /** Translate a key with optional {placeholders}. */
  const t = (key: DictKey, vars?: Vars) => interpolate(dict[key] ?? ru[key] ?? key, vars);

  /** Plural word only, e.g. tp("nights", 5) → "ночей". */
  const tp = (key: DictKey, n: number) => {
    const forms = (dict[key] ?? ru[key]).split("|");
    return forms[pluralIndex(lang, n, forms.length)];
  };

  /** "5 ночей" */
  const tn = (key: DictKey, n: number) => `${n} ${tp(key, n)}`;

  const nf = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const num = (n: number) => nf.format(Math.round(n));

  /** Money: KGS by default. */
  const money = (n: number, currency: "KGS" | "USD" | "EUR" = "KGS") =>
    currency === "USD" ? `$${num(n)}` : currency === "EUR" ? `${num(n)} €` : `${num(n)} ${t("cur")}`;

  const date = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) => {
    const d = iso.length === 10 ? new Date(iso + "T00:00:00") : new Date(iso);
    return new Intl.DateTimeFormat(locale, opts).format(d);
  };

  const dateLong = (iso: string) => date(iso, { day: "numeric", month: "long", year: "numeric" });
  const dateWeek = (iso: string) => date(iso, { day: "numeric", month: "short", weekday: "short" });


  return { lang, locale, t, tp, tn, num, money, date, dateLong, dateWeek };
}
