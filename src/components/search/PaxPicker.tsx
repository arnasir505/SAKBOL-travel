"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Users } from "lucide-react";
import { rules } from "@/config/site";
import type { Cabin } from "@/lib/flights/types";
import { useT } from "@/lib/i18n/client";
import type { DictKey } from "@/lib/i18n";

export type PaxState = { adt: number; chd: number; inf: number; cabin: Cabin };

export const CABINS: Cabin[] = rules.showComfortCabin ? ["e", "c", "b", "f"] : ["e", "b", "f"];
export const cabinKey = (c: Cabin) => `cab_${c}` as DictKey;

export function PaxPicker({ value, onChange, error }: { value: PaxState; onChange: (v: PaxState) => void; error?: string }) {
  const { t, tn } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const total = value.adt + value.chd + value.inf;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Process §5: max 9 in total, ≥1 adult, infants ≤ adults.
  const full = total >= rules.maxPassengers;
  const rows: { k: "adt" | "chd" | "inf"; t: DictKey; s: DictKey; min: number; canInc: boolean }[] = [
    { k: "adt", t: "pax_adt", s: "pax_adt_s", min: 1, canInc: !full },
    { k: "chd", t: "pax_chd", s: "pax_chd_s", min: 0, canInc: !full },
    { k: "inf", t: "pax_inf", s: "pax_inf_s", min: 0, canInc: !full && value.inf < value.adt },
  ];

  const set = (k: "adt" | "chd" | "inf", d: number) => {
    const next = { ...value, [k]: value[k] + d };
    if (next.inf > next.adt) next.inf = next.adt; // reducing adults also trims infants
    onChange(next);
  };

  return (
    <div className={`field pax ${error ? "has-err" : ""}`} ref={ref}>
      <span className="lbl">{t("f_pax")}</span>
      <button type="button" className="ctl pax-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <Users />
        <span className="pax-label">
          {tn("pax_word", total)}
          <small>{t(cabinKey(value.cabin))}</small>
        </span>
      </button>
      {error && <span className="ferr">{error}</span>}
      {open && (
        <div className="pax-pop">
          {rows.map((r) => (
            <div className="pax-row" key={r.k}>
              <div>
                <div className="t">{t(r.t)}</div>
                <div className="s">{t(r.s)}</div>
              </div>
              <div className="stepper">
                <button type="button" onClick={() => set(r.k, -1)} disabled={value[r.k] <= r.min} aria-label={`− ${t(r.t)}`}>
                  <Minus />
                </button>
                <span className="n">{value[r.k]}</span>
                <button type="button" onClick={() => set(r.k, 1)} disabled={!r.canInc} aria-label={`+ ${t(r.t)}`}>
                  <Plus />
                </button>
              </div>
            </div>
          ))}
          <div className="pax-cabins">
            <div className="t">{t("f_class")}</div>
            <div className="seg">
              {CABINS.map((c) => (
                <button type="button" key={c} className={value.cabin === c ? "on" : ""} onClick={() => onChange({ ...value, cabin: c })}>
                  {t(cabinKey(c))}
                </button>
              ))}
            </div>
          </div>
          {full && <p className="hint" style={{ padding: "4px 10px" }}>{t("err_max_pax", { n: rules.maxPassengers })}</p>}
          <button type="button" className="btn btn-soft btn-block btn-sm" onClick={() => setOpen(false)}>
            {t("pax_done")}
          </button>
        </div>
      )}
    </div>
  );
}
