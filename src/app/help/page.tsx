import { pageMeta } from "@/lib/seo";
import type { Metadata } from "next";
import { FAQ } from "@/lib/data/home";
import { pick } from "@/lib/i18n/types";
import { getT } from "@/lib/i18n/server";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export async function generateMetadata(): Promise<Metadata> {
  const { t, lang } = await getT();
  return pageMeta({ lang, path: "/help", title: t("help_h1"), fullTitle: `${t("help_h1")} · SAKBOL Travel`, description: t("meta_help_desc") });
}

export default async function HelpPage() {
  const { t, lang } = await getT();
  return (
    <div className="wrap">
      <div className="page-head">
        <div className="eyebrow">{t("eb_faq")}</div>
        <h1>{t("help_h1")}</h1>
      </div>
      <div className="faq" style={{ margin: "20px 0 0", maxWidth: "none" }}>
        {FAQ.map((f, i) => (
          <details className="qa" key={i} open={i === 0}>
            <summary>
              {pick(f.q, lang)}
              <span className="plus">+</span>
            </summary>
            <div className="ans">{pick(f.a, lang)}</div>
          </details>
        ))}
      </div>
      <section className="card card-pad" id="payment" style={{ marginTop: 28 }}>
        <h2 className="sec-h">{t("help_pay_h")}</h2>
        <p className="intro">{t("help_pay_text")}</p>
        <a className="btn btn-wa" href={waLink(t("msg_hello"))} target="_blank" rel="noopener noreferrer" style={{ marginTop: 16 }}>
          <WhatsAppIcon />
          {t("wa_write")}
        </a>
      </section>
    </div>
  );
}
