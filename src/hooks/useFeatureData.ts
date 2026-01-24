import { useEffect, useState } from "react";
import type { GeoJSONData, MilitaryType } from "../types";

export default function useFeatureData(militaryType: MilitaryType) {
  const [data, setData] = useState<GeoJSONData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  return { data, loading };
}
