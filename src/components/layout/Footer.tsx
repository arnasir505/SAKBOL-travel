"use client";

import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";
import { site } from "@/config/site";
import { useT } from "@/lib/i18n/client";
import { waLink } from "@/lib/whatsapp";
import { InstagramIcon, TelegramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="site">
      <div className="wrap">
        <div className="fgrid">
          <div className="fcol fabout">
            <Link className="logo" href="/">
              <Image src="/brand/logo-orange.png" alt="SAKBOL Travel" width={97} height={32} />
            </Link>
            <p>{t("foot_about")}</p>
            <div className="fsoc">
              <a href={site.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><InstagramIcon /></a>
              <a href={site.telegram} aria-label="Telegram" target="_blank" rel="noreferrer"><TelegramIcon /></a>
              <a href={waLink()} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><WhatsAppIcon /></a>
            </div>
          </div>
          <div className="fcol">
            <h3>{t("fc_serv")}</h3>
            <Link href="/">{t("nav_flights")}</Link>
            <Link href="/tours">{t("nav_tours")}</Link>
            <Link href="/hotels">{t("nav_hotels")}</Link>
            <Link href="/hotels?type=charter">{t("fc_charter")}</Link>
            <Link href="/hotels?type=visa">{t("fc_visa")}</Link>
          </div>
          <div className="fcol">
            <h3>{t("fc_comp")}</h3>
            <Link href="/about">{t("nav_about")}</Link>
            <Link href="/help#payment">{t("fc_pay")}</Link>
            <a href={waLink(t("msg_hello"))} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <div className="fcol">
            <h3>{t("fc_help")}</h3>
            <Link href="/about#contacts">{t("nav_contacts")}</Link>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <Link href="/help">{t("fc_faq")}</Link>
          </div>
        </div>
        <div className="fbot">
          <span>
            © {new Date().getFullYear()} SAKBOL Travel · {t("foot_rights")}
          </span>
          <span className="badge-demo">
            <Info />
            {t("foot_demo")}
          </span>
        </div>
      </div>
    </footer>
  );
}
