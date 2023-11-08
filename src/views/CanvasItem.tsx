import React from "react";
import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { action } from "mobx";
import { Layer } from "../types";

interface CanvasRectLikeItemDragState {
  initX: number;
  initY: number;
  initLayer: Layer;
}

export const CanvasItem: React.FC<{
  drawing: Drawing;
  id: string;
  layer: Layer;
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
      drawing.updateLayer(id, {
        x: initLayer.x + event.clientX - initX,
        y: initLayer.y + event.clientY - initY,
      });
    }
  });

  const onPointerEnd = action((event: React.PointerEvent) => {
    event?.currentTarget.releasePointerCapture(event.pointerId);

    setDragState(null);
  });

  const pointerProps = {
    onPointerDown,
    onPointerMove,
    onPointerEnd,
  };

  if (layer.type === "text") {
    return (
      <text {...pointerProps} x={layer.x} y={layer.y} fill={layer.color}>
        {layer.text}
      </text>
    );
  }

  if (layer.type === "arrow") {
    return (
      <line
        {...pointerProps}
        x1={layer.x}
        y1={layer.y}
        x2={layer.x + layer.dx}
        y2={layer.y + layer.dy}
        stroke={layer.color}
      />
    );
  }

  const fillStrokeProps = {
    fill: layer.fill ? layer.color : "transparent",
    stroke: !layer.fill ? layer.color : "none",
    strokeWidth: 2,
  };

  if (layer.type === "ellipse") {
    return (
      <ellipse
        {...pointerProps}
        {...fillStrokeProps}
        cx={layer.x + layer.width / 2}
        cy={layer.y + layer.height / 2}
        rx={layer.width / 2}
        ry={layer.height / 2}
      />
    );
  } else {
    return (
      <rect
        {...pointerProps}
        {...fillStrokeProps}
        x={layer.x}
        y={layer.y}
        width={layer.width}
        height={layer.height}
      />
    );
  }
});
