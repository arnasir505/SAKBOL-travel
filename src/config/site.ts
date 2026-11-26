/** Site-wide settings. Replace placeholders with real contacts before launch. */
export const site = {
  name: "SAKBOL Travel",
  /** Main public address (www is primary on Vercel; sakboltravel.kg redirects here). Used for canonical URLs, sitemap and previews. */
  url: "https://www.sakboltravel.kg",
  phone: "+996 506 636 364",
  phoneHref: "tel:+996506636364",
  email: "office.sakboltravel.kg@gmail.com",
  /** WhatsApp number in international format, digits only — all requests go here. */
  whatsapp: "996506636364",
  telegram: "https://t.me/sakboltravel",
  instagram: "https://instagram.com/sakboltravel.kg",
  /** Google Business Profile (Maps). The ?cid= form is the stable link to the place; share links can expire. */
  googleMaps: "https://maps.google.com/?cid=10335929139549459302",
  /** Office location from the Google Maps pin. */
  geo: { lat: 42.8785602, lng: 74.5782963 },
  /** OPEN QUESTION: 24/7 vs 09:00–21:00 — see "Открытые вопросы". */
  hotlineHours: "09:00–18:00",
};

export const rules = {
  /** Max passengers in one request (process §5). */
  maxPassengers: 9,
  /** Max legs in a multi-city request. */
  maxLegs: 6,
  /** Show the "Comfort" cabin. Supplier sells economy/business/first only. */
  showComfortCabin: false,
};
