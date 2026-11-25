import type { Metadata } from "next";
import { getT } from "@/lib/i18n/server";
import { HotelsView } from "@/components/HotelsView";
import { pageMeta } from "@/lib/seo";

type SP = { searchParams: Promise<Record<string, string | undefined>> };

export async function generateMetadata({ searchParams }: SP): Promise<Metadata> {
  const { t, lang } = await getT();
  const type = (await searchParams).type;
  // Charter and visa are separate services on the same route, so each gets its own canonical URL.
  const page =
    type === "charter"
      ? { path: "/hotels?type=charter", title: t("fc_charter"), description: t("meta_charter_desc") }
      : type === "visa"
        ? { path: "/hotels?type=visa", title: t("fc_visa"), description: t("meta_visa_desc") }
        : { path: "/hotels", title: t("hotels_h1"), description: t("hotels_sub") };
  return pageMeta({ lang, ...page, fullTitle: `${page.title} · SAKBOL Travel` });
}

export default async function HotelsPage({ searchParams }: SP) {
  const sp = await searchParams;
  const type = sp.type === "charter" || sp.type === "visa" ? sp.type : "hotel";
  return <HotelsView type={type} city={sp.city ?? ""} din={sp.in ?? ""} dout={sp.out ?? ""} guests={sp.guests ?? "2"} />;
}
