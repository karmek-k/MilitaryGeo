import type { LayerStyle } from "../types";

type Props = {
  style: LayerStyle;
  setStyle: (style: LayerStyle) => void;
};

export default function LayerStylePanel({ style, setStyle }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        zIndex: 9999,
        background: "rgba(255, 255, 255, 0.9)",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.25)",
      }}
    >
      <table>
        <thead>
          <strong style={{ fontSize: "16px" }}>Styl warstwy</strong>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Kolor</strong>
            </td>
            <td>
              <input
                type="color"
                value={style.color}
                onChange={(e) => setStyle({ ...style, color: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
