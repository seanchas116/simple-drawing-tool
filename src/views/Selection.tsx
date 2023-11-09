import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { LineHandle, RectHandle } from "./Handle";
import colors from "tailwindcss/colors";

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
  }
});

const canvas = new OffscreenCanvas(0, 0);
const context = canvas.getContext("2d")!;

function measureTextWidth(text: string, fontSize: number) {
  context.font = `${fontSize}px sans-serif`;
  return context.measureText(text).width;
}

export const TextSelectionUnderline: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  const layer = drawing.selectedLayer;
  if (!layer) return null;
  if (drawing.editingID === drawing.selectedID) return null;

  if (layer.type !== "text") return null;

  const width = measureTextWidth(layer.text, 16);
  console.log(width);

  return (
    <line
      pointerEvents="none"
      x1={layer.x}
      y1={layer.y}
      x2={layer.x + width}
      y2={layer.y}
      stroke={colors.blue[500]}
      strokeWidth={2}
    />
  );
});
