import { useEffect, useState } from "react";
import { MILITARY_TYPES, type GeoJSONData, type MilitaryType } from "../types";

export default function useFeatureData(militaryType: MilitaryType) {
  const [data, setData] = useState<GeoJSONData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (type: MilitaryType) => {
    setLoading(true);
    setData(null);

    const urls =
      type === "all"
        ? MILITARY_TYPES.map((type) => `/data/${type}.json`)
        : [`/data/${type}.json`];

    try {
      const allDataPromises = urls.map(async (url) => {
        try {
          const res = await fetch(url);

          // TU PRZYWRACAMY SPRAWDZANIE:
          if (!res.ok) {
            console.warn(
              `Nie znaleziono pliku: ${url} (Status: ${res.status})`,
            );
            return null; // Zwracamy null, by pominąć ten plik
          }

          return await res.json();
        } catch (err) {
          console.error(`Błąd sieci dla pliku ${url}`, err);
          return null;
        }
      });

      // Czekamy na wszystkie odpowiedzi
      const results = await Promise.all(allDataPromises);

      // Filtrujemy null-e (pliki, których nie znaleziono)
      const validData = results.filter((item) => item !== null);
      const combinedFeatures = validData.flatMap((data) => data.features);

      setData({
        type: "FeatureCollection",
        features: combinedFeatures,
      });
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
