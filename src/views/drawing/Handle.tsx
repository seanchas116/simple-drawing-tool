import { useState } from "react";
import colors from "tailwindcss/colors";
import { Line, Point, Rect } from "../../types";

function rectFrom2Points(p1: Point, p2: Point): Rect {
  const x = Math.min(p1.x, p2.x);
  const y = Math.min(p1.y, p2.y);
  const width = Math.abs(p2.x - p1.x);
  const height = Math.abs(p2.y - p1.y);
  return { x, y, width, height };
}

export const LineHandle: React.FC<{
  line: Line;
  onChange: (line: Line) => void;
}> = ({ line, onChange }) => {
  return (
    <>
      <DragHandle
        point={{ x: line.x, y: line.y }}
        init={line}
        onChange={(pos, initLine) => {
          onChange({
            ...initLine,
            ...pos,
          });
        }}
      />
      <DragHandle
        point={{ x: line.x + line.dx, y: line.y + line.dy }}
        init={line}
        onChange={(pos, initLine) => {
          onChange({
            ...initLine,
            dx: pos.x - initLine.x,
            dy: pos.y - initLine.y,
          });
        }}
      />
    </>
  );
};

export const RectHandle: React.FC<{
  rect: Rect;
  onChange: (rect: Rect) => void;
}> = ({ rect, onChange }) => {
  return (
    <>
      <rect
        fill="none"
        stroke={colors.blue[500]}
        strokeWidth={2}
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
      />
      <DragHandle
        point={{ x: rect.x, y: rect.y }}
        init={rect}
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
        init={rect}
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
        init={rect}
        onChange={(pos, initRect) => {
          const counterpart = { x: initRect.x + initRect.width, y: initRect.y };
          onChange(rectFrom2Points(pos, counterpart));
        }}
      />
      <DragHandle
        point={{ x: rect.x + rect.width, y: rect.y + rect.height }}
        init={rect}
        onChange={(pos, initRect) => {
          const counterpart = { x: initRect.x, y: initRect.y };
          onChange(rectFrom2Points(pos, counterpart));
        }}
      />
    </>
  );
};

interface DragState<T> {
  initX: number;
  initY: number;
  init: T;
  initPoint: Point;
}

function DragHandle<T>({
  point,
  init,
  onChange,
}: {
  point: Point;
  init: T;
  onChange: (point: Point, init: T) => void;
}) {
  const [dragState, setDragState] = useState<DragState<T> | null>(null);

  const onPointerDown = (event: React.PointerEvent) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    setDragState({
      initX: event.clientX,
      initY: event.clientY,
      initPoint: point,
      init,
    });
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (dragState) {
      const { initX, initY, initPoint, init } = dragState;
      const x = initPoint.x + event.clientX - initX;
      const y = initPoint.y + event.clientY - initY;
      onChange({ x, y }, init);
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
      r={6}
      fill="white"
      stroke={colors.blue[500]}
      strokeWidth={2}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
    />
  );
}
