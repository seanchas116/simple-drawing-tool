import React from "react";
import { observer } from "mobx-react-lite";
import { Drawing, Layer } from "../state/Drawing";
import colors from "tailwindcss/colors";
import { action } from "mobx";

interface DragState {
  initX: number;
  initY: number;
  initLayer: Layer;
}

export const CanvasItem: React.FC<{
  drawing: Drawing;
  id: string;
  layer: Layer;
}> = observer(({ drawing, id, layer }) => {
  const [dragState, setDragState] = React.useState<DragState | null>(null);

  const onPointerDown = action((event: React.PointerEvent) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.selectedID = id;

    setDragState({
      initX: event.clientX,
      initY: event.clientY,
      initLayer: layer,
    });
  });

  const onPointerMove = action((event: React.PointerEvent) => {
    if (dragState) {
      const { initX, initY, initLayer } = dragState;
      const newRect = {
        x: initLayer.x + event.clientX - initX,
        y: initLayer.y + event.clientY - initY,
        width: initLayer.width,
        height: initLayer.height,
      };
      drawing.updateLayer(id, newRect);
    }
  });

  const onPointerEnd = action((event: React.PointerEvent) => {
    event?.currentTarget.releasePointerCapture(event.pointerId);

    setDragState(null);
  });

  return (
    <rect
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      fill={colors.blue[300]}
      key={id}
      x={layer.x}
      y={layer.y}
      width={layer.width}
      height={layer.height}
    />
  );
});
