import { useEffect, useState, useRef } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import LayerStylePanel from "./components/LayerStylePanel";
import { MILITARY_LABELS, type LayerStyle } from "./types";
import "./MilitaryLayer.css";
import LegendPanel from "./components/LegendPanel";
import FeaturePanel from "./components/FeaturePanel";
import type { MilitaryType, GeoJSONData } from "./types";

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
        <div className="loading">
          Ładowanie: {MILITARY_LABELS[militaryType]}
        </div>
      )}

      <FeaturePanel setMilitaryType={setMilitaryType} />
      <LegendPanel
        type={MILITARY_LABELS[militaryType]}
        objectCount={data?.features.length ?? 0}
      />
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
