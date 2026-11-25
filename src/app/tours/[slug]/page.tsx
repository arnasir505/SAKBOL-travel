import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { actualTours, tourBySlug } from "@/lib/data/tours";
import { todayISO } from "@/lib/flights/search-params";
import { pick } from "@/lib/i18n/types";
import { getLang } from "@/lib/i18n/server";
import { TourDetail } from "@/components/tours/TourDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = tourBySlug((await params).slug, todayISO());
  if (!found) return {};
  const lang = await getLang();
  const title = pick(found.tour.title, lang);
  return pageMeta({ lang, path: `/tours/${found.tour.slug}`, title, fullTitle: `${title} · SAKBOL Travel`, description: pick(found.tour.intro, lang), image: found.tour.img });
}

export default async function TourPage({ params }: Props) {
  const today = todayISO();
  const found = tourBySlug((await params).slug, today);
  if (!found) notFound();
  const other = actualTours(today).filter((x) => x.slug !== found.tour.slug).slice(0, 4);
  return <TourDetail tour={found.tour} expired={found.expired} other={other} />;
}
