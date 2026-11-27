import type { Metadata } from "next";
import { site } from "@/config/site";
import type { Lang } from "@/lib/i18n/types";

const OG_LOCALE: Record<Lang, string> = { ru: "ru_RU", en: "en_US", ky: "ky_KG" };

/** Default share image (1200×630) in /public. */
export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630 };

/**
 * Per-page metadata: canonical URL, description and the Open Graph / Twitter preview
 * shown by Google, WhatsApp, Telegram, etc. `path` is relative to `site.url`.
 * Child metadata replaces the parent's `openGraph` object as a whole, so every page builds the full set here.
 */
export function pageMeta({ lang, path, title, fullTitle, description, image }: { lang: Lang; path: string; title?: string; fullTitle: string; description: string; image?: string }): Metadata {
  const images = image ? [{ url: image, alt: fullTitle }] : [{ ...OG_IMAGE, alt: fullTitle }];
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, locale: OG_LOCALE[lang], url: path, title: fullTitle, description, images },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
  };
}

/** Other spellings people search for: Cyrillic forms of the name (Russian and Kyrgyz use the same spelling). */
const ALT_NAMES = ["SAKBOL", "Сакбол Тревел", "Сакбол Travel", "Сакбол"];

/** schema.org data for the home page — lets search engines show the agency's name, logo and contacts.
 *  WebSite is what Google reads for the site name shown above the result (instead of the bare domain). */
export function agencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: site.name,
        alternateName: ALT_NAMES,
        url: `${site.url}/`,
      },
      {
        "@type": "TravelAgency",
        name: site.name,
        alternateName: ALT_NAMES,
        url: site.url,
        logo: `${site.url}/brand/logo-orange.png`,
        image: `${site.url}${OG_IMAGE.url}`,
        telephone: site.phone.replace(/\s/g, ""),
        email: site.email,
        address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.district, addressCountry: site.address.country },
        openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
        geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
        hasMap: site.googleMaps,
        sameAs: [site.instagram, site.telegram, site.googleMaps, site.twoGis],
      },
    ],
  };
}
