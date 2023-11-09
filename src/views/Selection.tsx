import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { LineHandle, RectHandle } from "./Handle";

export const Selection: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  const selectedLayer = drawing.selectedLayer;
  if (!selectedLayer) return null;

  switch (selectedLayer.type) {
    case "rect":
    case "ellipse":
      return (
        <RectHandle
          rect={selectedLayer}
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
          line={selectedLayer}
          onChange={(line) => {
            if (drawing.selectedID) {
              drawing.updateLayer(drawing.selectedID, line);
            }
          }}
        />
      );
    case "text":
    // TODO
  }
});
