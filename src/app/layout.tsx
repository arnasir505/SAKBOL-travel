import type { Metadata, Viewport } from "next";
import { Jost, Manrope } from "next/font/google";
import { getLang } from "@/lib/i18n/server";
import { makeT } from "@/lib/i18n";
import { I18nProvider } from "@/lib/i18n/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { waLink } from "@/lib/whatsapp";
import "@/styles/base.css";
import "@/styles/home.css";
import "@/styles/pages.css";

const jost = Jost({ subsets: ["latin", "cyrillic"], weight: ["500", "600", "700", "800"], variable: "--font-jost", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const { t } = makeT(await getLang());
  return {
    title: { default: "SAKBOL Travel — " + t("nav_flights").toLowerCase() + ", " + t("nav_tours").toLowerCase(), template: "%s · SAKBOL Travel" },
    description: t("hero_lead"),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffdfb" },
    { media: "(prefers-color-scheme: dark)", color: "#131519" },
  ],
};

/** Applies the saved theme before first paint to avoid a flash. */
const themeScript = `try{var t=localStorage.getItem('sbt_theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const { t } = makeT(lang);
  return (
    <html lang={lang} className={`${jost.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <I18nProvider lang={lang}>
          <Header />
          <main>{children}</main>
          <Footer />
          <a className="wa-fab" href={waLink(t("msg_hello"))} target="_blank" rel="noopener noreferrer" aria-label={t("wa_write")} title={t("wa_write")}>
            <WhatsAppIcon />
          </a>
        </I18nProvider>
      </body>
    </html>
  );
}
