import type { Metadata } from "next";
import { actualTours, pastTours } from "@/lib/data/tours";
import { todayISO } from "@/lib/flights/search-params";
import { getT } from "@/lib/i18n/server";
import { ToursList } from "@/components/tours/ToursList";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: t("tours_page_h1"), description: t("tours_page_sub") };
}

export default async function ToursPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const today = todayISO();
  return <ToursList tours={actualTours(today)} past={pastTours(today)} initial={{ country: sp.country ?? "", month: sp.month ?? "", cat: sp.cat ?? "" }} />;
}
