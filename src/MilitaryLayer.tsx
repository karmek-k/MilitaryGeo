import { useEffect, useState, useRef } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import LayerStylePanel from "./components/LayerStylePanel";
import type { LayerStyle } from "./types";

type MilitaryType =
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

type GeoJSONData = GeoJSON.FeatureCollection;

const MILITARY_TYPES: MilitaryType[] = [
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

const MILITARY_LABELS: Record<MilitaryType, string> = {
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

export default function MilitaryOSMLayer() {
  const [militaryType, setMilitaryType] = useState<MilitaryType>("barracks");
  const [data, setData] = useState<GeoJSONData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const layerRef = useRef<L.GeoJSON | null>(null);
  const [style, setStyle] = useState<LayerStyle>({
    color: "#0000ff",
    borderWeight: 6,
    opacity: 1,
  });

  const map = useMap();

  const fetchData = async (type: MilitaryType) => {
    setLoading(true);
    setData(null);

    const url = `/data/${type}.json`;

    try {
      const result = await fetch(url);

      if (!result.ok) {
        console.log("Nie znaleziono pliku.", url);
        return;
      }

      const geojson = await result.json();
      setData(geojson);
    } catch (e) {
      console.error("Błąd podczas pobierania danych:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(militaryType);
  }, [militaryType]);

  useEffect(() => {
    if (!data || !layerRef.current) return;

    const bounds = layerRef.current.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { animate: true });
    }
  }, [data, map]);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 99999,
            display: "flex",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Ładowanie: {MILITARY_LABELS[militaryType]}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 9999,
          background: "rgba(255, 255, 255, 0.9)",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
          width: "80vw",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
          Typ obiektu wojskowego:
        </div>

        {MILITARY_TYPES.map((type) => (
          <button
            style={{ color: "white" }}
            key={type}
            onClick={() => setMilitaryType(type)}
          >
            {MILITARY_LABELS[type] || type}
          </button>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          zIndex: 9999,
          background: "rgba(255, 255, 255, 0.9)",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div>
          <strong style={{ fontSize: "16px" }}>Legenda</strong>
        </div>
        <div>
          <strong>Typ:</strong> {MILITARY_LABELS[militaryType]}
        </div>
        <div>
          <strong>Liczba obiektów:</strong> {data?.features.length || 0}
        </div>
      </div>

      <LayerStylePanel style={style} setStyle={setStyle} />

      {data && (
        <GeoJSON
          key={militaryType}
          data={data}
          ref={layerRef}
          style={() => ({
            color: style.color,
            weight: style.borderWeight,
            opacity: style.opacity,
            fillOpacity: style.opacity / 2.0,
          })}
        />
      )}
    </>
  );
}
