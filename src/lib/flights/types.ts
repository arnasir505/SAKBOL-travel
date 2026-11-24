export type Cabin = "e" | "c" | "b" | "f";
export type TripType = "round" | "one" | "multi";

export type SearchLeg = { from: string; to: string; date: string };

/** What the customer asks for in the flight request form. */
export type FlightSearch = {
  trip: TripType;
  legs: SearchLeg[];
  adt: number;
  chd: number;
  inf: number;
  cabin: Cabin;
};
