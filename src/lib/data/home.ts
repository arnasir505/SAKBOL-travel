import type { L } from "@/lib/i18n/types";

/** Destination photos in /public/img/places (file name with extension). */
const P = (file: string) => `/img/places/${file}`;

export const CITY_IMG: Record<string, string> = {
  IST: P("istanbul.webp"),
  MOW: P("moscow.webp"),
  DXB: P("dubai.webp"),
  ALA: P("almaty.webp"),
  AYT: P("antalya.webp"),
  BKK: P("bangkok.webp"),
};

/** Popular destinations from Bishkek — each card opens a WhatsApp request. */
export const DESTS: string[] = ["IST", "DXB", "MOW", "ALA", "AYT", "BKK"];

export const FAQ: { q: L; a: L }[] = [
  {
    q: { ru: "Как купить авиабилет?", ky: "Авиабилетти кантип сатып алам?", en: "How do I buy a flight ticket?" },
    a: {
      ru: "Укажите на сайте города, даты и пассажиров и нажмите «Найти билеты» — заявка уйдёт менеджеру. Он подберёт рейсы по лучшей цене, забронирует и пришлёт электронный билет.",
      ky: "Сайтта шаарларды, күндөрдү жана жүргүнчүлөрдү көрсөтүп, «Билет издөө» баскычын басыңыз — өтүнмө менеджерге жөнөтүлөт. Менеджер эң жакшы баадагы рейстерди тандап, брондоп, электрондук билетти жөнөтөт.",
      en: "Enter cities, dates and passengers on the site and press “Find flights” — your request goes to a manager, who will find the best fares, book them and send you the e-ticket.",
    },
  },
  {
    q: { ru: "Как оформить тур?", ky: "Турду кантип тариздейм?", en: "How do I book a tour?" },
    a: {
      ru: "Откройте тур, выберите дату вылета, отель и количество туристов и нажмите «Забронировать». Менеджер подтвердит наличие мест и пришлёт договор и реквизиты для оплаты.",
      ky: "Турду ачып, учуу күнүн, мейманкананы жана туристтердин санын тандап, «Брондоо» баскычын басыңыз. Менеджер орундарды ырастап, келишимди жана төлөм реквизиттерин жөнөтөт.",
      en: "Open a tour, choose the departure date, hotel and number of travellers and press “Book now”. A manager will confirm availability and send the contract and payment details.",
    },
  },
  {
    q: { ru: "Цены на сайте окончательные?", ky: "Сайттагы баалар акыркыбы?", en: "Are the prices on the site final?" },
    a: {
      ru: "Цены туров указаны «от» за 1 человека при двухместном размещении и зависят от наличия мест. Точную стоимость менеджер подтвердит перед оплатой.",
      ky: "Турлардын баалары эки орундуу жайгашууда 1 адамга «баштап» көрсөтүлгөн жана орундардын болушуна жараша. Так бааны менеджер төлөмгө чейин ырастайт.",
      en: "Tour prices are “from” per person in a double room and depend on availability. A manager will confirm the exact price before you pay.",
    },
  },
  {
    q: { ru: "Как оплатить?", ky: "Кантип төлөйм?", en: "How can I pay?" },
    a: {
      ru: "Картой Visa или MasterCard, по QR через мобильный банкинг или в офисе. Все расчёты — в сомах по курсу на день оплаты.",
      ky: "Visa же MasterCard картасы, мобилдик банкинг аркылуу QR же кеңседе. Бардык эсептешүүлөр — төлөм күнүндөгү курс боюнча сом менен.",
      en: "By Visa or MasterCard, by QR via mobile banking or at the office. All payments are in KGS at the rate on the day of payment.",
    },
  },
  {
    q: { ru: "Как вернуть или обменять билет?", ky: "Билетти кантип кайтарып же алмаштырсам болот?", en: "How do I refund or change a ticket?" },
    a: {
      ru: "Сообщите менеджеру номер брони. Возврат и обмен оформляются по правилам тарифа авиакомпании — сумму к возврату или доплате мы сообщим заранее.",
      ky: "Менеджерге брондун номерин жазыңыз. Кайтаруу жана алмаштыруу авиакомпаниянын тарифинин эрежелери боюнча тариздейт — кайтарыла турган же кошумча төлөнө турган сумманы алдын ала айтабыз.",
      en: "Send your booking number to a manager. Refunds and changes follow the airline's fare rules — we'll tell you the refund or extra amount in advance.",
    },
  },
  {
    q: { ru: "Нужна ли виза и помогаете ли вы с ней?", ky: "Виза керекпи жана силер жардам бересиңерби?", en: "Do I need a visa and do you help with it?" },
    a: {
      ru: "Для многих направлений из Кыргызстана виза не нужна. Для остальных подскажем список документов и поможем с визовой поддержкой.",
      ky: "Кыргызстандан көптөгөн багыттарга виза керек эмес. Калгандары үчүн документтердин тизмесин айтып, виза колдоосуна жардам беребиз.",
      en: "Many destinations are visa-free from Kyrgyzstan. For the rest we'll advise on documents and help with visa support.",
    },
  },
];
