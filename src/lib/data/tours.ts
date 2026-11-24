import type { L } from "@/lib/i18n/types";
import { DOUBLE, INC, W, l } from "./tour-kit";
import { TELEGRAM_TOURS } from "./tours-telegram";
import { ARCHIVE_TOURS } from "./tours-archive";

export type TourCategory = "beach" | "excursion" | "mountain" | "visafree" | "family" | "newyear";
export type Currency = "USD" | "EUR" | "KGS";

export type TourHotel = { name: string; stars?: number; area?: L; room?: string; meal?: string; price: number };

export type Tour = {
  slug: string;
  title: L;
  place: L;
  country: L;
  /** Key for the country filter. */
  countryKey: string;
  categories: TourCategory[];
  /** Cover image; `gallery` adds more photos on the tour page. */
  img: string;
  gallery?: string[];
  currency: Currency;
  /** Departure city when it isn't Bishkek. */
  from?: L;
  airline?: string;
  route?: L;
  /** `nights` may be unknown (e.g. "flights every Wednesday"). */
  departures: { date: string; nights?: number; price: number }[];
  hotels?: TourHotel[];
  includes: L[];
  notIncluded?: L[];
  highlights?: L[];
  intro: L;
  bonus?: L;
  note: L;
  /** Overrides the default "per person, double occupancy" price caption. */
  priceNote?: L;
  hot?: boolean;
  /** Where the offer came from, e.g. "telegram:213". */
  source?: string;
};

const MANUAL_TOURS: Tour[] = [
  // ---- Offers from tours.md ----
  {
    slug: "uae-sharjah-air-arabia",
    title: l("ОАЭ из Бишкека с Air Arabia", "UAE from Bishkek with Air Arabia", "Бишкектен БАЭге Air Arabia менен"),
    place: l("Шарджа и Дубай", "Sharjah & Dubai", "Шарджа жана Дубай"),
    country: l("ОАЭ", "UAE", "БАЭ"),
    countryKey: "uae",
    categories: ["beach"],
    img: "/tours/uae-sharjah-air-arabia/1.jpg",
    gallery: ["/tours/uae-sharjah-air-arabia/1.jpg", W("Sharjah_skyline_mamzar.jpg"), W("Burj_Al_Arab_and_Jumeirah_Beach_(9601659067).jpg")],
    currency: "USD",
    airline: "Air Arabia",
    route: l("Бишкек – Шарджа – Бишкек", "Bishkek – Sharjah – Bishkek", "Бишкек – Шарджа – Бишкек"),
    departures: [
      { date: "2026-11-18", nights: 6, price: 535 },
      { date: "2026-11-21", nights: 5, price: 515 },
      { date: "2026-11-22", nights: 7, price: 545 },
      { date: "2026-11-23", nights: 6, price: 536 }, // Telegram post 211 (13.11.2026)
    ],
    includes: [INC.flight, INC.hotel, INC.transfer],
    highlights: [
      l("Комфортный отдых на берегу Персидского залива", "A relaxing stay on the Persian Gulf coast", "Перс булуңунун жээгинде ыңгайлуу эс алуу"),
      l("Пляжи и тёплое море", "Beaches and warm sea", "Пляждар жана жылуу деңиз"),
      l("Шопинг и развлечения", "Shopping and entertainment", "Шопинг жана көңүл ачуу"),
      l("Яркие достопримечательности Дубая и Шарджи", "The sights of Dubai and Sharjah", "Дубай менен Шарджанын кооз жерлери"),
    ],
    intro: l(
      "Откройте для себя солнечные Эмираты — отдых, шопинг, пляжи и незабываемые впечатления! Большой выбор отелей на любой бюджет.",
      "Discover the sunny Emirates — relaxation, shopping, beaches and unforgettable experiences! A wide choice of hotels for any budget.",
      "Күнөстүү Эмираттарды ачыңыз — эс алуу, шопинг, пляждар жана унутулгус таасирлер! Ар кандай бюджетке мейманканалардын кеңири тандоосу.",
    ),
    note: DOUBLE,
    hot: true,
  },
  {
    slug: "abu-dhabi-yas-island-winter",
    title: l("Зимние каникулы в Абу-Даби — остров Яс", "Winter holidays in Abu Dhabi — Yas Island", "Абу-Дабиде кышкы каникул — Яс аралы"),
    place: l("Абу-Даби, остров Яс", "Abu Dhabi, Yas Island", "Абу-Даби, Яс аралы"),
    country: l("ОАЭ", "UAE", "БАЭ"),
    countryKey: "uae",
    categories: ["family", "beach"],
    img: W("2011_Ales_Jungmann_The_Yas_Hotel_Abu_Dhabi_Asymptote_Jestico_Whiles.jpg"),
    currency: "USD",
    departures: [{ date: "2027-01-05", nights: 6, price: 1466 }],
    hotels: [
      { name: "Fairway, Yas World Resort", stars: 4, price: 1466 },
      { name: "Horizon, Yas World Resort", stars: 5, price: 1602 },
      { name: "Verde, Yas World Resort", stars: 5, price: 1602 },
      { name: "Vista, Yas World Resort", stars: 4, price: 1701 },
    ],
    includes: [
      INC.flight,
      l("Трансфер", "Transfers", "Трансфер"),
      INC.breakfast,
      l("Билеты в тематические парки острова Яс", "Tickets to Yas Island theme parks", "Яс аралынын тематикалык парктарына билеттер"),
    ],
    highlights: [
      l("Ferrari World — скорость, адреналин и захватывающие аттракционы", "Ferrari World — speed, adrenaline and thrilling rides", "Ferrari World — ылдамдык, адреналин жана кызыктуу аттракциондор"),
      l("Yas Waterworld — водные горки, бассейны и развлечения для всей семьи", "Yas Waterworld — water slides, pools and fun for the whole family", "Yas Waterworld — суу тепкичтери, бассейндер жана бүт үй-бүлө үчүн көңүл ачуу"),
      l("Warner Bros. World — встреча с любимыми героями мультфильмов и кино", "Warner Bros. World — meet your favourite cartoon and movie characters", "Warner Bros. World — сүйүктүү мультфильм жана кино каармандары менен жолугушуу"),
      l("SeaWorld Abu Dhabi — путешествие в мир морских обитателей", "SeaWorld Abu Dhabi — a journey into the world of marine life", "SeaWorld Abu Dhabi — деңиз жаныбарларынын дүйнөсүнө саякат"),
    ],
    intro: l(
      "Проведите зимние каникулы на солнечном острове Яс — месте, где каждый день наполнен яркими впечатлениями, приключениями и развлечениями для всей семьи. Семь дней ярких впечатлений для взрослых и детей.",
      "Spend the winter holidays on sunny Yas Island, where every day is full of vivid experiences, adventures and fun for the whole family. Seven days of excitement for adults and kids.",
      "Кышкы каникулду күнөстүү Яс аралында өткөрүңүз — бул жерде ар бир күн бүт үй-бүлө үчүн жаркын таасирлерге, укмуштуу окуяларга жана көңүл ачууга толгон. Чоңдор жана балдар үчүн жети күндүк жаркын таасирлер.",
    ),
    note: l(
      "Стоимость указана на одного взрослого при двухместном размещении. Даты: 05.01.2027–11.01.2027.",
      "Price per adult, double occupancy. Dates: 05.01.2027–11.01.2027.",
      "Баа эки орундуу жайгашууда бир чоң адамга көрсөтүлгөн. Күндөрү: 05.01.2027–11.01.2027.",
    ),
    hot: true,
  },
  {
    slug: "maldives-island-of-dreams",
    title: l("Мальдивы — ваш остров мечты", "Maldives — your dream island", "Мальдив — сиздин кыялыңыздагы арал"),
    place: l("Мальдивы", "Maldives", "Мальдив"),
    country: l("Мальдивы", "Maldives", "Мальдив"),
    countryKey: "maldives",
    categories: ["beach", "visafree"],
    img: W("Diamonds_Thudufushi_Beach_and_Water_Villas,_May_2017_-03.jpg"),
    gallery: [W("Diamonds_Thudufushi_Beach_and_Water_Villas,_May_2017_-03.jpg"), W("Beach_and_pier._Eriyadu,_Maldives.jpg")],
    currency: "USD",
    departures: [{ date: "2026-11-22", nights: 6, price: 1571 }],
    hotels: [
      { name: "Kiha Beach Maldives — Guest House", area: l("Баа Атолл", "Baa Atoll", "Баа атоллу"), price: 1571 },
      { name: "Malahini Kuda Bandos", stars: 4, area: l("Северный Мале Атолл", "North Malé Atoll", "Түндүк Мале атоллу"), price: 1671 },
      { name: "Barcelo Nasandhura Male", stars: 5, area: l("Северный Мале Атолл", "North Malé Atoll", "Түндүк Мале атоллу"), price: 1720 },
      { name: "Sheraton Maldives Full Moon Resort & Spa", stars: 5, area: l("Северный Мале Атолл", "North Malé Atoll", "Түндүк Мале атоллу"), price: 1946 },
      { name: "Kandima Maldives", stars: 5, area: l("Даалу Атолл", "Dhaalu Atoll", "Даалу атоллу"), price: 2031 },
      { name: "Hard Rock Hotel Maldives", stars: 5, area: l("Южный Мале Атолл", "South Malé Atoll", "Түштүк Мале атоллу"), price: 2230 },
    ],
    includes: [INC.flight, l("Проживание в выбранном отеле", "Stay at the hotel of your choice", "Тандалган мейманканада жашоо"), INC.transfer, INC.meals],
    intro: l(
      "Бирюзовый океан, белоснежный песок, пальмы и полное ощущение тропического рая. Мальдивы — возможность забыть о повседневной суете, насладиться уединением и провести незабываемые дни среди красоты Индийского океана.",
      "Turquoise ocean, white sand, palm trees and a true tropical paradise. The Maldives are a chance to forget everyday bustle, enjoy privacy and spend unforgettable days amid the beauty of the Indian Ocean.",
      "Көгүлтүр океан, ак кум, пальмалар жана тропикалык бейиштин толук сезими. Мальдив — күнүмдүк убаракерчиликти унутуп, жалгыздыктан ырахат алып, Инди океанынын кооздугунда унутулгус күндөрдү өткөрүү мүмкүнчүлүгү.",
    ),
    bonus: l(
      "Приятный бонус: транзитная виза ОАЭ на 48 часов — в подарок!",
      "Bonus: a 48-hour UAE transit visa — free!",
      "Белек: 48 сааттык БАЭ транзиттик визасы — бекер!",
    ),
    note: l(
      "Стоимость указана на 1 человека при двухместном размещении. Даты: 22.11.2026–28.11.2026.",
      "Price per person, double occupancy. Dates: 22.11.2026–28.11.2026.",
      "Баа эки орундуу жайгашууда 1 адамга. Күндөрү: 22.11.2026–28.11.2026.",
    ),
    hot: true,
  },
];

/** All tours: Telegram channel offers, manually added ones, then the archive of past offers. */
export const TOURS: Tour[] = [...TELEGRAM_TOURS, ...MANUAL_TOURS, ...ARCHIVE_TOURS];

export const TOUR_CATEGORIES: TourCategory[] = ["newyear", "beach", "excursion", "family", "mountain", "visafree"];

/** Tour with past departures removed (null if nothing is left). A same-day departure can't be booked any more, so it counts as past. */
function actualize(t: Tour, today: string): Tour | null {
  const departures = t.departures.filter((d) => d.date > today);
  return departures.length ? { ...t, departures } : null;
}

/** Only tours that still have upcoming departures — the site never shows expired offers. */
export function actualTours(today: string): Tour[] {
  return TOURS.map((t) => actualize(t, today)).filter((t): t is Tour => t !== null);
}

/** Tours whose dates have all passed — kept on the tours page for reference, most recent first. */
export function pastTours(today: string): Tour[] {
  const last = (t: Tour) => t.departures[t.departures.length - 1]?.date ?? "";
  return TOURS.filter((t) => !actualize(t, today)).sort((a, b) => last(b).localeCompare(last(a)));
}

/** Tour by slug; `expired` = exists but all dates have passed. */
export function tourBySlug(slug: string, today: string): { tour: Tour; expired: boolean } | null {
  const t = TOURS.find((x) => x.slug === slug);
  if (!t) return null;
  const a = actualize(t, today);
  return a ? { tour: a, expired: false } : { tour: t, expired: true };
}

export function minTourPrice(t: Tour) {
  if (t.hotels?.length) return Math.min(...t.hotels.map((h) => h.price));
  return Math.min(...t.departures.map((d) => d.price));
}

/** Categories / countries present in the given tours (for filters). */
export function tourCategories(tours: Tour[]) {
  return TOUR_CATEGORIES.filter((c) => tours.some((t) => t.categories.includes(c)));
}

export function tourCountries(tours: Tour[]) {
  const m = new Map<string, L>();
  for (const t of tours) m.set(t.countryKey, t.country);
  return [...m.entries()].map(([key, name]) => ({ key, name }));
}
