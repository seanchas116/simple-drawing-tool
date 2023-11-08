import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { EventTarget } from "./EventTarget";
import { LineHandle, RectHandle } from "./Handle";
import { CanvasItem } from "./CanvasItem";

export const Canvas: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  const selectedLayer = drawing.selectedLayer;

  // handle cursor move

  const onPointerMove = action((event: React.PointerEvent) => {
    drawing.populateCursor({ x: event.clientX, y: event.clientY });
  });

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onPointerMove={onPointerMove}
    >
      <svg className="absolute inset-0 w-full h-full">
        <rect
          fill="white"
          width="100%"
          height="100%"
          onClick={action(() => {
            drawing.selectedID = null;
          })}
        />
        {[...drawing.layers].map(([id, layer]) => (
          <CanvasItem key={id} drawing={drawing} id={id} layer={layer} />
        ))}
        {selectedLayer &&
          (selectedLayer.type === "rect" ||
            selectedLayer.type === "ellipse") && (
            <RectHandle
              rect={selectedLayer}
              onChange={(rect) => {
                if (drawing.selectedID) {
                  drawing.updateLayer(drawing.selectedID, rect);
                }
              }}
            />
          )}
        {selectedLayer && selectedLayer.type === "arrow" && (
          <LineHandle
            line={selectedLayer}
            onChange={(line) => {
              if (drawing.selectedID) {
                drawing.updateLayer(drawing.selectedID, line);
              }
            }}
          />
        )}
      </svg>
      <EventTarget drawing={drawing} />
    </div>
  );
});
