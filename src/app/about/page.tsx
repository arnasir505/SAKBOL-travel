import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/config/site";
import { getT } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t, lang } = await getT();
  return pageMeta({ lang, path: "/about", title: t("about_h1"), fullTitle: `${t("about_h1")} · SAKBOL Travel`, description: t("meta_about_desc") });
}

export default async function AboutPage() {
  const { t } = await getT();
  return (
    <div className="wrap">
      <div className="page-head">
        <h1>{t("about_h1")}</h1>
        <p className="sub">{t("foot_about")}</p>
      </div>
      <div className="steps" style={{ marginTop: 20 }}>
        <div className="step">
          <h3>{t("how_1_t")}</h3>
          <p>{t("how_1_d")}</p>
        </div>
        <div className="step main">
          <h3>{t("how_2_t")}</h3>
          <p>{t("how_2_d")}</p>
        </div>
        <div className="step">
          <h3>{t("how_3_t")}</h3>
          <p>{t("how_3_d")}</p>
        </div>
      </div>
      <section className="card card-pad contacts" id="contacts" style={{ marginTop: 24 }}>
        <h2 className="sec-h">{t("nav_contacts")}</h2>
        <p className="contact-line">
          <Phone />
          <a href={site.phoneHref}>{site.phone}</a>
        </p>
        <p className="contact-line">
          <Mail />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p className="contact-line">
          <Clock />
          {t("hot_wh", { hours: site.hotlineHours })}
        </p>
        <p className="contact-line">
          <MapPin />
          <a href={site.twoGis} target="_blank" rel="noopener noreferrer">{t("office_addr")}</a>
        </p>
      </section>
    </div>
  );
}
