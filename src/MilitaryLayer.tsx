import { useEffect, useState, useRef } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import LayerStylePanel from "./components/LayerStylePanel";
import { MILITARY_LABELS, type LayerStyle } from "./types";
import "./MilitaryLayer.css";
import LegendPanel from "./components/LegendPanel";
import FeaturePanel from "./components/FeaturePanel";
import type { MilitaryType } from "./types";
import LoadingScreen from "./components/LoadingScreen";
import useFeatureData from "./hooks/useFeatureData";

export default function MilitaryOSMLayer() {
  const [militaryType, setMilitaryType] = useState<MilitaryType>("barracks");
  const layerRef = useRef<L.GeoJSON | null>(null);
  const [style, setStyle] = useState<LayerStyle>({
    color: "#0000ff",
    borderWeight: 6,
    opacity: 1,
  });

  const map = useMap();
  const { data, loading } = useFeatureData(militaryType);

  useEffect(() => {
    if (!data || !layerRef.current) return;

    const bounds = layerRef.current.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { animate: true });
    }
  }, [data, map]);

  return (
    <>
      {loading && <LoadingScreen label={MILITARY_LABELS[militaryType]} />}
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
