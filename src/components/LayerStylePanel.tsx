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
          <tr>
            <td>
              <strong>Grubość</strong>
            </td>
            <td>
              <input
                type="range"
                min="1"
                max="18"
                step="1"
                value={style.borderWeight}
                onChange={(e) =>
                  setStyle({ ...style, borderWeight: parseInt(e.target.value) })
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Przezroczystość</strong>
            </td>
            <td>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={style.opacity}
                onChange={(e) =>
                  setStyle({ ...style, opacity: parseFloat(e.target.value) })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
