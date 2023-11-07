import { useState } from "react";
import colors from "tailwindcss/colors";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ResizeHandle: React.FC<{
  rect: Rect;
  onChange: (rect: Rect) => void;
}> = ({ rect, onChange }) => {
  // WIP: resize
  return (
    <>
      <rect
        fill="none"
        stroke={colors.red[500]}
        strokeWidth={2}
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
      />
      <DragHandle
        point={{ x: rect.x, y: rect.y }}
        onChange={({ x, y }) => {
          onChange({ ...rect, x, y });
        }}
      />
      <DragHandle
        point={{ x: rect.x + rect.width, y: rect.y }}
        onChange={({ x, y }) => {
          onChange({ ...rect, x: x - rect.width, y });
        }}
      />
      <DragHandle
        point={{ x: rect.x, y: rect.y + rect.height }}
        onChange={({ x, y }) => {
          onChange({ ...rect, x, y: y - rect.height });
        }}
      />
      <DragHandle
        point={{ x: rect.x + rect.width, y: rect.y + rect.height }}
        onChange={({ x, y }) => {
          onChange({ ...rect, x: x - rect.width, y: y - rect.height });
        }}
      />
    </>
  );
};

interface DragState {
  initialX: number;
  initialY: number;
  point: { x: number; y: number };
}

const DragHandle: React.FC<{
  point: { x: number; y: number };
  onChange: (point: { x: number; y: number }) => void;
}> = ({ point, onChange }) => {
  const [dragState, setDragState] = useState<DragState | null>(null);

  const onPointerDown = (event: React.PointerEvent) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    setDragState({
      initialX: event.clientX,
      initialY: event.clientY,
      point,
    });
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (dragState) {
      const { initialX, initialY, point } = dragState;
      const x = point.x + event.clientX - initialX;
      const y = point.y + event.clientY - initialY;
      onChange({ x, y });
    }
  };

  const onPointerEnd = (event: React.PointerEvent) => {
    event?.currentTarget.releasePointerCapture(event.pointerId);

    setDragState(null);
  };

  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={4}
      fill={colors.red[500]}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
    />
  );
};
