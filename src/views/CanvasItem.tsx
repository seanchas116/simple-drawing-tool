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

  const onPointerUp = action((event: React.PointerEvent) => {
    event?.currentTarget.releasePointerCapture(event.pointerId);

    setDragState(null);
  });

  const pointerProps = {
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };

  if (layer.type === "text") {
    return (
      <text {...pointerProps} x={layer.x} y={layer.y} fill={layer.color}>
        {layer.text}
      </text>
    );
  }

  const arrowID = `arrow-${id}`;

  if (layer.type === "arrow") {
    return (
      <g {...pointerProps}>
        <defs>
          <marker
            id={arrowID}
            viewBox="-12 -12 24 24"
            markerUnits="strokeWidth"
            orient="auto"
            markerWidth={12}
            markerHeight={12}
          >
            <polyline
              points="-8,-8 0,0 -8,8"
              fill="none"
              stroke={layer.color}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </marker>
        </defs>
        <line
          // Thicker invisible line for easier drag
          strokeWidth={8}
          x1={layer.x}
          y1={layer.y}
          x2={layer.x + layer.dx}
          y2={layer.y + layer.dy}
          stroke="transparent"
        />
        <line
          strokeWidth={2}
          x1={layer.x}
          y1={layer.y}
          x2={layer.x + layer.dx}
          y2={layer.y + layer.dy}
          stroke={layer.color}
          markerEnd={`url(#${arrowID})`}
        />
      </g>
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
