type Props = {
  type: string;
  objectCount: number;
};

export default function LegendPanel({ type, objectCount }: Props) {
  return (
    <div className="panel panel-legend">
      <div>
        <strong style={{ fontSize: "16px" }}>Legenda</strong>
      </div>
      <div>
        <strong>Typ:</strong> {type}
      </div>
      <div>
        <strong>Liczba obiektów:</strong> {objectCount}
      </div>
    </div>
  );
}
