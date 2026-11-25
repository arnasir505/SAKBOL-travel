import Link from "next/link";
import { ArrowRight, CircleCheck, CreditCard, MessageCircle, Search, ShieldCheck, Star, TreePalm } from "lucide-react";
import { site } from "@/config/site";
import { addDays, todayISO } from "@/lib/flights/search-params";
import type { FlightSearch } from "@/lib/flights/types";
import { CITY_IMG, DESTS, FAQ } from "@/lib/data/home";
import { cityByCode } from "@/lib/data/places";
import { actualTours } from "@/lib/data/tours";
import { pick } from "@/lib/i18n/types";
import { getT } from "@/lib/i18n/server";
import { lines, waLink } from "@/lib/whatsapp";
import { SearchCard } from "@/components/search/SearchCard";
import { ToursShowcase } from "@/components/home/ToursShowcase";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import type { Metadata } from "next";
import { agencyJsonLd, pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { t, lang } = await getT();
  return pageMeta({ lang, path: "/", fullTitle: t("meta_title"), description: t("meta_desc") });
}

export default async function Home() {
  const { t, lang } = await getT();
  const today = todayISO();
  const tours = actualTours(today);
  const bishkek = pick(cityByCode("FRU")!.name, lang);

  const initial: FlightSearch = {
    trip: "round",
    legs: [
      { from: "FRU", to: "IST", date: addDays(today, 10) },
      { from: "IST", to: "FRU", date: addDays(today, 17) },
    ],
    adt: 1, chd: 0, inf: 0, cabin: "e",
  };

  return (
    <>
      {/* schema.org: agency name, logo and contacts for search engines */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agencyJsonLd()) }} />
      {/* HERO */}
      <div className="hero on-dark">
        <div className="photo" />
        <div className="tint" />
        <div className="scrim" />
        <div className="orn" />
        <div className="wrap inner">
          <h1>{t("hero_h1")}</h1>
          <p className="lead">{t("hero_lead")}</p>
          <div className="trust">
            <span><CircleCheck />{t("trust_1")}</span>
            <span><Star />{t("trust_2")}</span>
            <span><CreditCard />{t("trust_3")}</span>
            <span><ShieldCheck />{t("trust_4")}</span>
          </div>
          <div className="diamond-band" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
        </div>
      </div>

      <div className="wrap searchwrap">
        <SearchCard initial={initial} today={today} tours={tours} />
      </div>

      {/* TOURS */}
      <section className="blk" id="tours">
        <div className="wrap">
          <div className="head">
            <div>
              <div className="eyebrow">{t("eb_tours")}</div>
              <h2>{t("tours_h2")}</h2>
              <p className="sub">{t("tours_sub")}</p>
            </div>
            <Link className="morelink" href="/tours">
              {t("more_tours")}
              <ArrowRight />
            </Link>
          </div>
          <ToursShowcase tours={tours} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="blk how tours-head">
        <div className="wrap">
          <div className="head">
            <div>
              <div className="eyebrow">{t("eb_how")}</div>
              <h2>{t("how_h2")}</h2>
            </div>
          </div>
          <div className="steps">
            <div className="step"><span className="ic"><TreePalm /></span><h3>{t("how_1_t")}</h3><p>{t("how_1_d")}</p></div>
            <div className="step main"><span className="ic"><MessageCircle /></span><h3>{t("how_2_t")}</h3><p>{t("how_2_d")}</p></div>
            <div className="step"><span className="ic"><ShieldCheck /></span><h3>{t("how_3_t")}</h3><p>{t("how_3_d")}</p></div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS → WhatsApp */}
      <section className="blk">
        <div className="wrap">
          <div className="head">
            <div>
              <div className="eyebrow">{t("eb_dest")}</div>
              <h2>{t("dest_h2")}</h2>
              <p className="sub">{t("dest_sub")}</p>
            </div>
          </div>
          <div className="dests">
            {DESTS.map((code) => {
              const name = pick(cityByCode(code)!.name, lang);
              return (
                <a key={code} className="dest" href={waLink(lines(`${t("msg_hello")} ${t("msg_dest", { from: bishkek, to: name })}`))} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={CITY_IMG[code]} alt="" loading="lazy" />
                  <b>{name}</b>
                  <small>{t("btn_dest_price")}</small>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="blk" id="about">
        <div className="wrap">
          <div className="ctaband">
            <div className="orn" />
            <div className="in">
              <div>
                <h2>{t("cta_h2")}</h2>
                <p>{t("cta_p")}</p>
                <div className="stores">
                  <a className="btn btn-wa" href={waLink(t("msg_hello"))} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    {t("wa_write")}
                  </a>
                  <Link className="store" href="/tours">
                    <Search />
                    <span><b>{t("more_tours")}</b></span>
                  </Link>
                </div>
              </div>
              <div className="hotcard">
                <div className="lbl">{t("hot_line")}</div>
                <a className="num" href={site.phoneHref}>{site.phone}</a>
                <div className="wh">{t("hot_wh", { hours: site.hotlineHours })}</div>
                <div className="diamond-band" style={{ marginTop: 18 }}><i /><i /><i /><i /><i /><i /><i /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="blk" id="faq">
        <div className="wrap">
          <div className="head center">
            <div>
              <div className="eyebrow">{t("eb_faq")}</div>
              <h2>{t("faq_h2")}</h2>
            </div>
          </div>
          <div className="faq">
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
        </div>
      </section>
    </>
  );
}
