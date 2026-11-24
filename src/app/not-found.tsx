import Link from "next/link";
import { Plane } from "lucide-react";
import { getT } from "@/lib/i18n/server";

export default async function NotFound() {
  const { t } = await getT();
  return (
    <div className="wrap narrow" style={{ paddingTop: 60 }}>
      <div className="card card-pad empty">
        <Plane />
        <h1 style={{ fontSize: 26 }}>{t("not_found_t")}</h1>
        <p className="muted">{t("not_found_d")}</p>
        <Link className="btn btn-primary" href="/">
          {t("to_home")}
        </Link>
      </div>
    </div>
  );
}
