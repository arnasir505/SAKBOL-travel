"use client";

import { useState } from "react";
import { BadgeCheck, Languages, Wallet } from "lucide-react";
import { useT } from "@/lib/i18n/client";
import type { DictKey } from "@/lib/i18n";
import { lines, openWhatsApp } from "@/lib/whatsapp";

type Kind = "hotel" | "charter" | "visa";
type FieldDef = { name: string; label: string; type?: "text" | "date" | "number"; options?: { value: string; label: string }[]; initial?: string };

/** Hotel / charter / visa request — composed into a WhatsApp message. */
export function HotelsView({ type, city, din, dout, guests }: { type: Kind; city: string; din: string; dout: string; guests: string }) {
  const T = useT();
  const { t } = T;
  const title = type === "charter" ? t("fc_charter") : type === "visa" ? t("fc_visa") : t("hotels_h1");
  const intro: DictKey = type === "charter" ? "msg_charter" : type === "visa" ? "msg_visa" : "msg_hotel";

  const fields: FieldDef[] =
    type === "hotel"
      ? [
          { name: "city", label: t("f_city"), initial: city },
          { name: "in", label: t("f_in"), type: "date", initial: din },
          { name: "out", label: t("f_out"), type: "date", initial: dout },
          { name: "guests", label: t("f_guests"), type: "number", initial: guests || "2" },
          { name: "stars", label: t("rq_stars"), options: [{ value: "", label: t("rq_any") }, { value: "3★", label: "3★" }, { value: "4★", label: "4★" }, { value: "5★", label: "5★" }] },
        ]
      : type === "charter"
        ? [
            { name: "route", label: `${t("f_from")} → ${t("f_to")}` },
            { name: "date", label: t("f_date"), type: "date", initial: din },
            { name: "guests", label: t("f_pax"), type: "number", initial: guests || "2" },
          ]
        : [{ name: "country", label: t("f_dest"), initial: city }];

  const [vals, setVals] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((f) => [f.name, f.initial ?? ""])));
  const [comment, setComment] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(
      lines(
        `${t("msg_hello")} ${t(intro)}`,
        ...fields.map((f) => {
          const v = vals[f.name];
          if (!v) return "";
          return `• ${f.label}: ${f.type === "date" ? T.dateLong(v) : v}`;
        }),
        comment && `${comment}`,
      ),
    );
  };

  return (
    <div className="wrap">
      <div className="page-head">
        <h1>{title}</h1>
        <p className="sub">{t("hotels_sub")}</p>
      </div>
      <div className="hotels-grid">
        <form className="card card-pad rq" onSubmit={send}>
          <div className="grid2">
            {fields.map((f) => (
              <label className="field" key={f.name}>
                <span className="lbl">{f.label}</span>
                <span className="ctl">
                  {f.options ? (
                    <select value={vals[f.name]} onChange={(e) => setVals((v) => ({ ...v, [f.name]: e.target.value }))}>
                      {f.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type ?? "text"}
                      min={f.type === "number" ? 1 : undefined}
                      value={vals[f.name]}
                      onChange={(e) => setVals((v) => ({ ...v, [f.name]: e.target.value }))}
                    />
                  )}
                </span>
              </label>
            ))}
          </div>
          <label className="field">
            <span className="lbl">{t("rq_comment")}</span>
            <span className="ctl">
              <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder={t("rq_comment_ph")} />
            </span>
          </label>
          <button className="btn btn-primary btn-block" type="submit">
            {t("btn_send_request")}
          </button>
        </form>
        <ul className="why">
          <li>
            <BadgeCheck />
            {t("hotels_why_1")}
          </li>
          <li>
            <Languages />
            {t("hotels_why_2")}
          </li>
          <li>
            <Wallet />
            {t("hotels_why_3")}
          </li>
        </ul>
      </div>
    </div>
  );
}
