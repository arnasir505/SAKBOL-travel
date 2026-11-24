import type { L } from "@/lib/i18n/types";

/** Shorthand for a string in all three languages (ru, en, ky). */
export const l = (ru: string, en: string, ky: string): L => ({ ru, en, ky });

/** Wikimedia Commons image by file name. */
export const W = (file: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=1200`;

/** Common "what's included" items. */
export const INC = {
  flight: l("Авиаперелёт", "Return flights", "Авиаучуу"),
  transfer: l("Трансфер аэропорт — отель — аэропорт", "Airport — hotel — airport transfer", "Аэропорт — мейманкана — аэропорт трансфери"),
  groupTransfer: l("Групповой трансфер аэропорт — отель — аэропорт", "Shared airport — hotel — airport transfer", "Аэропорт — мейманкана — аэропорт топтук трансфери"),
  hotel: l("Проживание в отеле", "Hotel accommodation", "Мейманканада жашоо"),
  hotelChosen: l("Проживание в выбранном отеле", "Stay at the hotel of your choice", "Тандалган мейманканада жашоо"),
  breakfast: l("Проживание в отеле с завтраками", "Hotel with breakfast", "Эртең мененки тамак менен мейманкана"),
  breakfasts: l("Завтраки (BB)", "Breakfast (BB)", "Эртең мененки тамак (BB)"),
  meals: l("Питание согласно концепции отеля", "Meals according to the hotel's plan", "Мейманкананын концепциясына ылайык тамак-аш"),
  insurance: l("Медицинская страховка", "Medical insurance", "Медициналык камсыздандыруу"),
};

export const DOUBLE = l(
  "Цены указаны за 1 человека при двухместном размещении.",
  "Prices are per person, based on double occupancy.",
  "Баалар эки орундуу жайгашууда 1 адамга көрсөтүлгөн.",
);

export const FROM_ALMATY = l("Алматы", "Almaty", "Алматы");
