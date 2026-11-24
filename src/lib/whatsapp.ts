import { site } from "@/config/site";

/** WhatsApp link with a prefilled message. Opens the app on phones, WhatsApp Web on desktop.
 *  api.whatsapp.com/send is used instead of wa.me: the wa.me redirect garbles some characters.
 *  Keep messages emoji-free — some WhatsApp clients show them as "�". */
export function waLink(text?: string) {
  return `https://api.whatsapp.com/send?phone=${site.whatsapp}${text ? `&text=${encodeURIComponent(text)}` : ""}`;
}

/** Open WhatsApp from a click/submit handler (must run inside a user gesture). */
export function openWhatsApp(text: string) {
  window.open(waLink(text), "_blank", "noopener,noreferrer");
}

/** Join non-empty message lines. */
export function lines(...parts: (string | false | null | undefined)[]) {
  // Intl puts non-breaking spaces in prices/dates; plain spaces are safest in WhatsApp.
  return parts.filter(Boolean).join("\n").replace(/[  ]/g, " ");
}
