export type LayerStyle = {
  color: string;
  borderWeight: number;
  opacity: number;
};

export type MilitaryType =
  | "barracks"
  | "naval_base"
  | "airfield"
  | "training_area"
  | "range"
  | "primary"
  | "office"
  | "danger_area"
  | "shelter"
  | "bunker";

export type GeoJSONData = GeoJSON.FeatureCollection;

export const MILITARY_TYPES: MilitaryType[] = [
  "barracks",
  "naval_base",
  "airfield",
  "training_area",
  "range",
  "primary",
  "office",
  "danger_area",
  "shelter",
  "bunker",
];

export const MILITARY_LABELS: Record<MilitaryType, string> = {
  barracks: "Koszary",
  naval_base: "Baza morska",
  airfield: "Lotnisko",
  training_area: "Obszar treningowy",
  range: "Strzelnica",
  primary: "Baza logistyczna",
  office: "Biuro",
  danger_area: "Obszar zagrożenia",
  shelter: "Schron",
  bunker: "Bunkier",
};
