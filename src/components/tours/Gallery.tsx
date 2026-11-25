"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useT } from "@/lib/i18n/client";
import { Modal } from "@/components/ui/Modal";

/** Photo grid with a simple lightbox (arrow keys / buttons to browse). */
export function Gallery({ images, title }: { images: string[]; title: string }) {
  const { t } = useT();
  const [open, setOpen] = useState<number | null>(null);
  const n = images.length;

  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpen((i) => (i == null ? i : (i + 1) % n));
      if (e.key === "ArrowLeft") setOpen((i) => (i == null ? i : (i - 1 + n) % n));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, n]);

  return (
    <section className="card card-pad">
      <h2 className="sec-h">
        <Images />
        {t("tour_gallery")}
      </h2>
      <div className="gallery">
        {images.map((src, i) => (
          <button key={src} className="gal-item" onClick={() => setOpen(i)} aria-label={t("tour_photo_n", { n: i + 1, total: n })}>
            <Image src={src} alt="" fill sizes="(max-width: 720px) 50vw, 240px" />
          </button>
        ))}
      </div>
      {open != null && (
        <Modal title={`${title} · ${t("tour_photo_n", { n: open + 1, total: n })}`} onClose={() => setOpen(null)} wide>
          <div className="lightbox">
            {/* Size comes from CSS (max 72vh tall); width/height are only the aspect-ratio hint before load. */}
            <Image src={images[open]} alt={title} width={1200} height={800} sizes="(max-width: 1100px) 100vw, 1100px" loading="eager" />
            {n > 1 && (
              <>
                <button className="lb-nav prev" onClick={() => setOpen((open - 1 + n) % n)} aria-label={t("prev")}>
                  <ChevronLeft />
                </button>
                <button className="lb-nav next" onClick={() => setOpen((open + 1) % n)} aria-label={t("next")}>
                  <ChevronRight />
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
}
