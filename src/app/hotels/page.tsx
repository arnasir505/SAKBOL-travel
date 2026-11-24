import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";
import { HotelsView } from "@/components/HotelsView";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getT();
  return { title: t("hotels_h1") };
}

export default async function HotelsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const type = sp.type === "charter" || sp.type === "visa" ? sp.type : "hotel";
  return <HotelsView type={type} city={sp.city ?? ""} din={sp.in ?? ""} dout={sp.out ?? ""} guests={sp.guests ?? "2"} />;
}
