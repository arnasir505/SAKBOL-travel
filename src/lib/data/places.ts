import type { L } from "@/lib/i18n/types";

export type Airport = { code: string; name: L };

export type City = {
  /** City code used in search (IATA city/metro code). */
  code: string;
  name: L;
  country: L;
  /** Airports in this city. First is the main one. */
  airports: Airport[];
  lat: number;
  lon: number;
  /** UTC offset in hours (no DST handling in demo). */
  tz: number;
  /** Prepositional "в Стамбуле" etc. is overkill — we use "{city}". */
  popular?: boolean;
};

const a = (code: string, ru: string, en: string, ky = ru): Airport => ({ code, name: { ru, en, ky } });
const l = (ru: string, en: string, ky = ru): L => ({ ru, en, ky });

export const CITIES: City[] = [
  { code: "FRU", name: l("Бишкек", "Bishkek"), country: l("Кыргызстан", "Kyrgyzstan"), airports: [a("FRU", "Манас", "Manas")], lat: 43.06, lon: 74.48, tz: 6, popular: true },
  { code: "OSS", name: l("Ош", "Osh"), country: l("Кыргызстан", "Kyrgyzstan"), airports: [a("OSS", "Ош", "Osh")], lat: 40.61, lon: 72.79, tz: 6, popular: true },
  { code: "IST", name: l("Стамбул", "Istanbul"), country: l("Турция", "Turkey", "Түркия"), airports: [a("IST", "Стамбул", "Istanbul"), a("SAW", "Сабиха Гёкчен", "Sabiha Gökçen")], lat: 41.27, lon: 28.75, tz: 3, popular: true },
  { code: "MOW", name: l("Москва", "Moscow"), country: l("Россия", "Russia", "Орусия"), airports: [a("SVO", "Шереметьево", "Sheremetyevo"), a("DME", "Домодедово", "Domodedovo"), a("VKO", "Внуково", "Vnukovo")], lat: 55.97, lon: 37.41, tz: 3, popular: true },
  { code: "DXB", name: l("Дубай", "Dubai"), country: l("ОАЭ", "UAE", "БАЭ"), airports: [a("DXB", "Дубай", "Dubai International")], lat: 25.25, lon: 55.36, tz: 4, popular: true },
  { code: "SHJ", name: l("Шарджа", "Sharjah"), country: l("ОАЭ", "UAE", "БАЭ"), airports: [a("SHJ", "Шарджа", "Sharjah")], lat: 25.33, lon: 55.52, tz: 4 },
  { code: "AUH", name: l("Абу-Даби", "Abu Dhabi"), country: l("ОАЭ", "UAE", "БАЭ"), airports: [a("AUH", "Абу-Даби", "Zayed International")], lat: 24.43, lon: 54.65, tz: 4 },
  { code: "ALA", name: l("Алматы", "Almaty"), country: l("Казахстан", "Kazakhstan", "Казакстан"), airports: [a("ALA", "Алматы", "Almaty")], lat: 43.35, lon: 77.04, tz: 5, popular: true },
  { code: "NQZ", name: l("Астана", "Astana"), country: l("Казахстан", "Kazakhstan", "Казакстан"), airports: [a("NQZ", "Нурсултан Назарбаев", "Nursultan Nazarbayev")], lat: 51.02, lon: 71.47, tz: 5 },
  { code: "TAS", name: l("Ташкент", "Tashkent"), country: l("Узбекистан", "Uzbekistan", "Өзбекстан"), airports: [a("TAS", "Ислам Каримов", "Islam Karimov")], lat: 41.26, lon: 69.28, tz: 5 },
  { code: "DYU", name: l("Душанбе", "Dushanbe"), country: l("Таджикистан", "Tajikistan", "Тажикстан"), airports: [a("DYU", "Душанбе", "Dushanbe")], lat: 38.54, lon: 68.82, tz: 5 },
  { code: "LED", name: l("Санкт-Петербург", "St Petersburg"), country: l("Россия", "Russia", "Орусия"), airports: [a("LED", "Пулково", "Pulkovo")], lat: 59.8, lon: 30.26, tz: 3 },
  { code: "OVB", name: l("Новосибирск", "Novosibirsk"), country: l("Россия", "Russia", "Орусия"), airports: [a("OVB", "Толмачёво", "Tolmachevo")], lat: 55.01, lon: 82.65, tz: 7 },
  { code: "SVX", name: l("Екатеринбург", "Yekaterinburg"), country: l("Россия", "Russia", "Орусия"), airports: [a("SVX", "Кольцово", "Koltsovo")], lat: 56.74, lon: 60.8, tz: 5 },
  { code: "KZN", name: l("Казань", "Kazan"), country: l("Россия", "Russia", "Орусия"), airports: [a("KZN", "Казань", "Kazan")], lat: 55.61, lon: 49.28, tz: 3 },
  { code: "AYT", name: l("Анталия", "Antalya"), country: l("Турция", "Turkey", "Түркия"), airports: [a("AYT", "Анталия", "Antalya")], lat: 36.9, lon: 30.8, tz: 3, popular: true },
  { code: "DOH", name: l("Доха", "Doha"), country: l("Катар", "Qatar"), airports: [a("DOH", "Хамад", "Hamad")], lat: 25.27, lon: 51.61, tz: 3 },
  { code: "SSH", name: l("Шарм-эль-Шейх", "Sharm el-Sheikh"), country: l("Египет", "Egypt"), airports: [a("SSH", "Шарм-эль-Шейх", "Sharm el-Sheikh")], lat: 27.98, lon: 34.39, tz: 2 },
  { code: "TBS", name: l("Тбилиси", "Tbilisi"), country: l("Грузия", "Georgia"), airports: [a("TBS", "Тбилиси", "Tbilisi")], lat: 41.67, lon: 44.95, tz: 4 },
  { code: "BKK", name: l("Бангкок", "Bangkok"), country: l("Таиланд", "Thailand"), airports: [a("BKK", "Суварнабхуми", "Suvarnabhumi")], lat: 13.69, lon: 100.75, tz: 7, popular: true },
  { code: "HKT", name: l("Пхукет", "Phuket"), country: l("Таиланд", "Thailand"), airports: [a("HKT", "Пхукет", "Phuket")], lat: 8.11, lon: 98.31, tz: 7 },
  { code: "KUL", name: l("Куала-Лумпур", "Kuala Lumpur"), country: l("Малайзия", "Malaysia"), airports: [a("KUL", "Куала-Лумпур", "Kuala Lumpur")], lat: 2.75, lon: 101.71, tz: 8 },
  { code: "MLE", name: l("Мале", "Malé"), country: l("Мальдивы", "Maldives"), airports: [a("MLE", "Велана", "Velana")], lat: 4.19, lon: 73.53, tz: 5 },
  { code: "DEL", name: l("Дели", "Delhi"), country: l("Индия", "India"), airports: [a("DEL", "Индира Ганди", "Indira Gandhi")], lat: 28.56, lon: 77.1, tz: 5.5 },
  { code: "URC", name: l("Урумчи", "Ürümqi"), country: l("Китай", "China", "Кытай"), airports: [a("URC", "Дивопу", "Diwopu")], lat: 43.9, lon: 87.47, tz: 8 },
  { code: "BJS", name: l("Пекин", "Beijing"), country: l("Китай", "China", "Кытай"), airports: [a("PKX", "Дасин", "Daxing")], lat: 39.5, lon: 116.41, tz: 8 },
  { code: "SEL", name: l("Сеул", "Seoul"), country: l("Южная Корея", "South Korea", "Түштүк Корея"), airports: [a("ICN", "Инчхон", "Incheon")], lat: 37.46, lon: 126.44, tz: 9 },
  { code: "FRA", name: l("Франкфурт", "Frankfurt"), country: l("Германия", "Germany", "Германия"), airports: [a("FRA", "Франкфурт", "Frankfurt")], lat: 50.03, lon: 8.57, tz: 1 },
  { code: "LON", name: l("Лондон", "London"), country: l("Великобритания", "United Kingdom", "Улуу Британия"), airports: [a("LHR", "Хитроу", "Heathrow")], lat: 51.47, lon: -0.45, tz: 0 },
  { code: "BAK", name: l("Баку", "Baku"), country: l("Азербайджан", "Azerbaijan", "Азербайжан"), airports: [a("GYD", "Гейдар Алиев", "Heydar Aliyev")], lat: 40.47, lon: 50.05, tz: 4 },
];

const BY_CODE = new Map(CITIES.map((c) => [c.code, c]));
const AIRPORT_TO_CITY = new Map<string, City>();
for (const c of CITIES) for (const ap of c.airports) AIRPORT_TO_CITY.set(ap.code, c);

export function cityByCode(code: string | undefined | null): City | undefined {
  if (!code) return undefined;
  return BY_CODE.get(code.toUpperCase()) ?? AIRPORT_TO_CITY.get(code.toUpperCase());
}

export function cityOfAirport(code: string): City | undefined {
  return AIRPORT_TO_CITY.get(code);
}

export function airportByCode(code: string): Airport | undefined {
  return AIRPORT_TO_CITY.get(code)?.airports.find((x) => x.code === code);
}

/** Search cities by any language name, country, or code. */
export function searchCities(q: string, limit = 8): City[] {
  const s = q.trim().toLowerCase();
  if (!s) return CITIES.filter((c) => c.popular).slice(0, limit);
  const scored: [number, City][] = [];
  for (const c of CITIES) {
    const names = [c.name.ru, c.name.en, c.name.ky].map((x) => x.toLowerCase());
    const codes = [c.code, ...c.airports.map((x) => x.code)].map((x) => x.toLowerCase());
    const countries = [c.country.ru, c.country.en, c.country.ky].map((x) => x.toLowerCase());
    let score = 0;
    if (codes.includes(s)) score = 100;
    else if (names.some((n) => n.startsWith(s))) score = 80;
    else if (names.some((n) => n.includes(s))) score = 50;
    else if (countries.some((n) => n.startsWith(s))) score = 30;
    else if (c.airports.some((ap) => [ap.name.ru, ap.name.en].some((n) => n.toLowerCase().startsWith(s)))) score = 25;
    if (score) scored.push([score + (c.popular ? 5 : 0), c]);
  }
  return scored.sort((x, y) => y[0] - x[0]).slice(0, limit).map((x) => x[1]);
}

/** Great-circle distance in km. */
export function distanceKm(x: City, y: City) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (y.lat - x.lat) * rad, dLon = (y.lon - x.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(x.lat * rad) * Math.cos(y.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
