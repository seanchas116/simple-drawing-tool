import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { useState } from "react";
import colors from "tailwindcss/colors";
import { Layer } from "../types";

interface DragState {
  initX: number;
  initY: number;
  layerID: string;
}

export const ToolEventTarget: React.FC<{
  drawing: Drawing;
  type: "rect" | "ellipse" | "arrow" | "text";
}> = observer(({ drawing, type }) => {
  const [dragState, setDragState] = useState<DragState | null>(null);

  const onMouseDown = (event: React.MouseEvent) => {
    const color = colors.gray[800];
    const x = event.clientX;
    const y = event.clientY;

    let layer: Layer;
    switch (type) {
      case "rect":
      case "ellipse":
        layer = { type, color, fill: false, x, y, width: 0, height: 0 };
        break;
      case "arrow":
        layer = { type: "arrow", color, x, y, dx: 0, dy: 0 };
        break;
      case "text":
        layer = { type: "text", text: "Text", color, x, y };
        break;
    }

    const layerID = drawing.addLayer(layer);

    setDragState({
      initX: event.clientX,
      initY: event.clientY,
      layerID,
    });
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (dragState) {
      const { initX, initY, layerID } = dragState;

      if (type === "ellipse" || type === "rect") {
        const x = Math.min(initX, event.clientX);
        const y = Math.min(initY, event.clientY);
        const width = Math.abs(event.clientX - initX);
        const height = Math.abs(event.clientY - initY);
        drawing.updateLayer(layerID, { x, y, width, height });
      } else if (type === "arrow") {
        const dx = event.clientX - initX;
        const dy = event.clientY - initY;
        drawing.updateLayer(layerID, { dx, dy });
      }
    }
  };

  const onMouseEnd = () => {
    setDragState(null);
  };

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseEnd}
      onMouseLeave={onMouseEnd}
    ></div>
  );
});

export const EventTarget = observer(({ drawing }: { drawing: Drawing }) => {
  if (drawing.tool === "select") {
    return null;
  }
  return <ToolEventTarget drawing={drawing} type={drawing.tool} />;
});
