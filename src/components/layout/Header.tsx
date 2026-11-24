"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Hotel, Menu, Moon, Phone, Plane, Sun, TreePalm, X, CircleHelp } from "lucide-react";
import { site } from "@/config/site";
import { useT } from "@/lib/i18n/client";
import { LANGS, type Lang } from "@/lib/i18n/types";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const LANG_LABEL: Record<Lang, string> = { ru: "РУ", ky: "КГ", en: "EN" };

export function LangSwitch() {
  const { lang, setLang } = useT();
  return (
    <div className="langs" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button key={l} className={l === lang ? "on" : ""} onClick={() => l !== lang && setLang(l)} aria-pressed={l === lang}>
          {LANG_LABEL[l]}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { t } = useT();
  const [dark, setDark] = useState<boolean | null>(null);
  useEffect(() => {
    const cur = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read DOM state once after hydration
    setDark(cur === "dark" || (!cur && matchMedia("(prefers-color-scheme: dark)").matches));
  }, []);
  const toggle = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("sbt_theme", next);
    } catch {}
    setDark(!dark);
  };
  return (
    <button className={`icon-btn ${className}`} onClick={toggle} aria-label={t("theme")} title={t("theme")}>
      {dark ? <Moon /> : <Sun />}
    </button>
  );
}

export function Header() {
  const { t } = useT();
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the mobile menu on navigation
    setOpen(false);
  }, [path]);

  // While the menu is open: lock page scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const nav = [
    { href: "/", label: t("nav_flights"), icon: Plane, on: path === "/" },
    {
      href: "/tours",
      label: t("nav_tours"),
      icon: TreePalm,
      on: path.startsWith("/tours"),
    },
    {
      href: "/hotels",
      label: t("nav_hotels"),
      icon: Hotel,
      on: path.startsWith("/hotels"),
    },
    {
      href: "/help",
      label: t("nav_help"),
      icon: CircleHelp,
      on: path.startsWith("/help"),
    },
  ];

  return (
    <header className="top">
      <div className="wrap bar">
        <Link className="logo" href="/" aria-label="SAKBOL Travel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-orange.png" alt="SAKBOL Travel" width={97} height={32} />
        </Link>
        <nav className="main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={n.on ? "on" : ""}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="right">
          <a className="phone" href={site.phoneHref}>
            <Phone />
            {site.phone}
          </a>
          <LangSwitch />
          <ThemeToggle className="theme-desktop" />
          <a className="icon-btn wa-icon" href={waLink(t("msg_hello"))} target="_blank" rel="noopener noreferrer" aria-label={t("wa_write")} title={t("wa_write")}>
            <WhatsAppIcon />
          </a>
          <button className="icon-btn burger" onClick={() => setOpen(true)} aria-label={t("menu")}>
            <Menu />
          </button>
        </div>
      </div>

      {/* Portal to <body>: the header's backdrop-filter would otherwise clip this fixed overlay to the header box (iOS Safari/Chrome). */}
      {open &&
        createPortal(
          <div className="mnav" onClick={() => setOpen(false)}>
            <div className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={t("menu")}>
              <div className="mnav-head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo-orange.png" alt="SAKBOL Travel" style={{ height: 28 }} />
                <button className="icon-btn" onClick={() => setOpen(false)} aria-label={t("close")}>
                  <X />
                </button>
              </div>
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="item">
                  <n.icon />
                  {n.label}
                </Link>
              ))}
              <a href={waLink(t("msg_hello"))} className="item" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                {t("wa_write")}
              </a>
              <div className="foot">
                <a className="phone" href={site.phoneHref}>
                  <Phone />
                  {site.phone}
                </a>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <LangSwitch />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
