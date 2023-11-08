import React from "react";
import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { action } from "mobx";
import { EllipseLayer, Layer, RectLayer } from "../types";

interface CanvasRectLikeItemDragState {
  initX: number;
  initY: number;
  initLayer: RectLayer | EllipseLayer;
}

const CanvasRectLikeItem: React.FC<{
  drawing: Drawing;
  id: string;
  layer: RectLayer | EllipseLayer;
}> = observer(({ drawing, id, layer }) => {
  const [dragState, setDragState] =
    React.useState<CanvasRectLikeItemDragState | null>(null);

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

  const commonProps = {
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerEnd,
    fill: layer.fill ? layer.color : "transparent",
    stroke: !layer.fill ? layer.color : "none",
    strokeWidth: 2,
  };

  if (layer.type === "ellipse") {
    return (
      <ellipse
        {...commonProps}
        cx={layer.x + layer.width / 2}
        cy={layer.y + layer.height / 2}
        rx={layer.width / 2}
        ry={layer.height / 2}
      />
    );
  } else {
    return (
      <rect
        {...commonProps}
        x={layer.x}
        y={layer.y}
        width={layer.width}
        height={layer.height}
      />
    );
  }
});

export const CanvasItem: React.FC<{
  drawing: Drawing;
  id: string;
  layer: Layer;
}> = observer(({ drawing, id, layer }) => {
  switch (layer.type) {
    case "arrow":
      return null; // TODO
    case "text":
      return null; // TODO
    case "ellipse":
    case "rect":
      return <CanvasRectLikeItem drawing={drawing} id={id} layer={layer} />;
  }
});
