"use client";

import { TreePalm } from "lucide-react";
import { useT } from "@/lib/i18n/client";
import { waLink } from "@/lib/whatsapp";

/** Shown when no tours match — invites the visitor to ask a manager. */
export function TourEmpty({ text }: { text?: string }) {
  const { t } = useT();
  return (
    <div className="card card-pad empty">
      <TreePalm />
      <p>{text ?? t("tour_none")}</p>
      <a className="btn btn-primary" href={waLink(`${t("msg_hello")} ${t("msg_tour_any")}`)} target="_blank" rel="noopener noreferrer">
        {t("wa_pick_tour")}
      </a>
    </div>
  );
}
