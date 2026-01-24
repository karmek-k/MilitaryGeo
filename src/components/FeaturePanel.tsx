import { MILITARY_LABELS, MILITARY_TYPES, type MilitaryType } from "../types";

type Props = {
  setMilitaryType: (type: MilitaryType) => void;
};

export default function FeaturePanel({ setMilitaryType }: Props) {
  return (
    <div className="panel panel-features">
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
  );
}
