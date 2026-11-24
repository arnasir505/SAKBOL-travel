"use client";

import { useState } from "react";
import { tourCategories, type Tour, type TourCategory } from "@/lib/data/tours";
import { useT } from "@/lib/i18n/client";
import type { DictKey } from "@/lib/i18n";
import { TourCard } from "@/components/tours/TourCard";
import { TourEmpty } from "@/components/tours/TourEmpty";

export function ToursShowcase({ tours }: { tours: Tour[] }) {
  const { t } = useT();
  const [cat, setCat] = useState<TourCategory | "all">("all");
  const cats = tourCategories(tours);
  const list = (cat === "all" ? tours : tours.filter((x) => x.categories.includes(cat))).slice(0, 8);
  if (!tours.length) return <TourEmpty />;
  return (
    <>
      {cats.length > 1 && (
        <div className="chips" role="tablist">
          {(["all", ...cats] as const).map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={`chip ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>
              {c === "all" ? t("all") : t(`cat_${c}` as DictKey)}
            </button>
          ))}
        </div>
      )}
      <div className="tours">
        {list.map((x) => (
          <TourCard key={x.slug} tour={x} />
        ))}
      </div>
    </>
  );
}
