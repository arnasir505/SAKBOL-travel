import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { TOURS } from "@/lib/data/tours";

/** Every public page plus every tour (current and past — past tours stay online for reference). Rebuilt on each deploy. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/tours`, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/hotels`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/hotels?type=charter`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}/hotels?type=visa`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/help`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.4 },
  ];
  const tours: MetadataRoute.Sitemap = TOURS.map((t) => ({
    url: `${site.url}/tours/${t.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
    images: [t.img.startsWith("http") ? t.img : `${site.url}${t.img}`],
  }));
  return [...pages, ...tours];
}
