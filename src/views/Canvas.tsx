import React from "react";
import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { EventTarget } from "./EventTarget";
import { ResizeHandle } from "./ResizeHandle";
import { CanvasItem } from "./CanvasItem";

export const Canvas: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  const selectedLayer = drawing.selectedLayer;

  return (
    <div className="absolute inset-0 w-full h-full">
      <svg className="absolute inset-0 w-full h-full">
        <rect
          fill="white"
          width="100%"
          height="100%"
          onClick={() => {
            drawing.selectedID = null;
          }}
        />
        {[...drawing.layers].map(([id, layer]) => (
          <CanvasItem key={id} drawing={drawing} id={id} layer={layer} />
        ))}
        {selectedLayer &&
          (selectedLayer.type === "rect" ||
            selectedLayer.type === "ellipse") && (
            <ResizeHandle
              rect={selectedLayer}
              onChange={(rect) => {
                if (drawing.selectedID) {
                  drawing.updateLayer(drawing.selectedID, rect);
                }
              }}
            />
          )}
      </svg>
      {drawing.tool !== "select" && <EventTarget drawing={drawing} />}
    </div>
  );
});
