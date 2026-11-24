# SAKBOL Travel — website

Next.js 16 (App Router, TypeScript) information site for SAKBOL Travel.
There is no online booking or payment: every request (flight, tour, hotel,
charter, visa) opens **WhatsApp with a ready-made message** for a manager.
Design follows the approved demo (`../sakbol_travel_home_3.html`).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Deploy (Vercel)

Live: https://sakbol-travel-web.vercel.app (Vercel project `sakbol-travel-web`).
To publish changes, run from this folder:

```bash
npx vercel@latest deploy --prod
```

## Pages

| Route | What it does |
| --- | --- |
| `/` | Hero; search card (flights → WhatsApp, tours → catalogue, hotels → WhatsApp); current tours; how it works; destinations (→ WhatsApp); FAQ |
| `/tours` | Current tours with filters (country, month, category) and sorting |
| `/tours/[slug]` | Tour details: dates, hotels, what's included; "Забронировать" opens WhatsApp with tour, date, hotel, travellers and a link |
| `/hotels`, `?type=charter`, `?type=visa` | Request forms → WhatsApp |
| `/help`, `/about` | FAQ, payment info, contacts |

Floating WhatsApp button on every page. Russian / Kyrgyz / English, light / dark theme, responsive.

## Editing content

| What | Where |
| --- | --- |
| WhatsApp number, phone, email, social links, hours | `src/config/site.ts` |
| Tours from the Telegram channel | `src/lib/data/tours-telegram.ts` (photos in `public/tours/<slug>/`) |
| Other tours (e.g. from `tours.md`) | `src/lib/data/tours.ts` |
| Archive of past tours (shown under «Прошедшие туры») | `src/lib/data/tours-archive.ts` |
| FAQ, destinations | `src/lib/data/home.ts` |
| Interface texts | `src/lib/i18n/ru.ts`, `en.ts`, `ky.ts` |

Tours from the channel were imported from the Telegram chat export of 18.11.2026
(`../ChatExport_2026-11-18`): only offers with upcoming departures. To refresh,
export the channel again and ask for the new posts to be imported.

Departures today or earlier are hidden automatically. A tour with no upcoming dates moves to the
«Прошедшие туры» section at the bottom of `/tours` (muted, for reference); its page stays reachable.

## Notes

- Kyrgyz texts (`src/lib/i18n/ky.ts`) are a draft — get a native speaker to review.
- Tour photos from the channel are stored locally in `public/tours/`. The hero/destination photos and the two `tours.md` tours still load from Wikimedia Commons — replace them with your own images before launch.
