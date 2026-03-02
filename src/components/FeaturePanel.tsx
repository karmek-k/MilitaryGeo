import { MILITARY_LABELS, MILITARY_TYPES, type MilitaryType } from "../types";

type Props = {
  setMilitaryType: (type: MilitaryType) => void;
};

export default function FeaturePanel({ setMilitaryType }: Props) {
  return (
    <div className="panel panel-features">
      <div className="mb">
        <strong className="text-big">Typ obiektu wojskowego</strong>
      </div>

      <div>
        {MILITARY_TYPES.map((type) => (
          <button
            className="button-feature"
            key={type}
            onClick={() => setMilitaryType(type)}
          >
            {MILITARY_LABELS[type] || type}
          </button>
        ))}
      </div>
    </div>
  );
}
