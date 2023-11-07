import { useState } from "react";
import colors from "tailwindcss/colors";

interface Point {
  x: number;
  y: number;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function rectFrom2Points(p1: Point, p2: Point): Rect {
  const x = Math.min(p1.x, p2.x);
  const y = Math.min(p1.y, p2.y);
  const width = Math.abs(p2.x - p1.x);
  const height = Math.abs(p2.y - p1.y);
  return { x, y, width, height };
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
        rect={rect}
        onChange={(pos, initRect) => {
          const counterpart = {
            x: initRect.x + initRect.width,
            y: initRect.y + initRect.height,
          };
          onChange(rectFrom2Points(pos, counterpart));
        }}
      />
      <DragHandle
        point={{ x: rect.x + rect.width, y: rect.y }}
        rect={rect}
        onChange={(pos, initRect) => {
          const counterpart = {
            x: initRect.x,
            y: initRect.y + initRect.height,
          };
          onChange(rectFrom2Points(pos, counterpart));
        }}
      />
      <DragHandle
        point={{ x: rect.x, y: rect.y + rect.height }}
        rect={rect}
        onChange={(pos, initRect) => {
          const counterpart = { x: initRect.x + initRect.width, y: initRect.y };
          onChange(rectFrom2Points(pos, counterpart));
        }}
      />
      <DragHandle
        point={{ x: rect.x + rect.width, y: rect.y + rect.height }}
        rect={rect}
        onChange={(pos, initRect) => {
          const counterpart = { x: initRect.x, y: initRect.y };
          onChange(rectFrom2Points(pos, counterpart));
        }}
      />
    </>
  );
};

interface InitState {
  clientX: number;
  clientY: number;
  rect: Rect;
  point: Point;
}

const DragHandle: React.FC<{
  point: Point;
  rect: Rect;
  onChange: (point: Point, initRect: Rect) => void;
}> = ({ point, rect, onChange }) => {
  const [init, setInit] = useState<InitState | null>(null);

  const onPointerDown = (event: React.PointerEvent) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    setInit({
      clientX: event.clientX,
      clientY: event.clientY,
      point,
      rect,
    });
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (init) {
      const x = init.point.x + event.clientX - init.clientX;
      const y = init.point.y + event.clientY - init.clientY;
      onChange({ x, y }, init.rect);
    }
  };

  const onPointerEnd = (event: React.PointerEvent) => {
    event?.currentTarget.releasePointerCapture(event.pointerId);

    setInit(null);
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
