"use client";

import { createContext, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, makeT, type Lang, type Translator } from "./index";

type Ctx = Translator & { setLang: (l: Lang) => void };

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const router = useRouter();
  const value = useMemo<Ctx>(() => {
    const tr = makeT(lang);
    return {
      ...tr,
      setLang: (l: Lang) => {
        document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
        router.refresh();
      },
    };
  }, [lang, router]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used inside I18nProvider");
  return ctx;
}
