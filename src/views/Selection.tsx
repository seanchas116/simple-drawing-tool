import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { LineHandle, RectHandle } from "./Handle";
import colors from "tailwindcss/colors";
import { action } from "mobx";

export const Selection: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  const layer = drawing.selectedLayer;
  if (!layer) return null;
  if (drawing.editingID === drawing.selectedID) return null;

  switch (layer.type) {
    case "rect":
    case "ellipse":
      return (
        <RectHandle
          rect={layer}
          onChange={(rect) => {
            if (drawing.selectedID) {
              drawing.updateLayer(drawing.selectedID, rect);
            }
          }}
        />
      );
    case "arrow":
      return (
        <LineHandle
          line={layer}
          onChange={(line) => {
            if (drawing.selectedID) {
              drawing.updateLayer(drawing.selectedID, line);
            }
          }}
        />
      );
    case "text":
      return (
        <text
          x={layer.x}
          y={layer.y}
          fill={layer.color}
          stroke={colors.blue[500]}
          strokeWidth={1}
          onMouseDown={action(() => {
            drawing.editingID = drawing.selectedID;
          })}
        >
          {layer.text}
        </text>
      );
  }
});
