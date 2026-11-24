export const LANGS = ["ru", "ky", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "ru";
export const LANG_COOKIE = "sbt_lang";

/** A string in all three site languages. */
export type L = { ru: string; ky: string; en: string };

export function pick(l: L | undefined, lang: Lang): string {
  if (!l) return "";
  return l[lang] || l.ru;
}

export function isLang(v: unknown): v is Lang {
  return typeof v === "string" && (LANGS as readonly string[]).includes(v);
}

export const LOCALE: Record<Lang, string> = { ru: "ru-RU", ky: "ky-KG", en: "en-GB" };
