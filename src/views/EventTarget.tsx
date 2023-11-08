import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { useState } from "react";
import colors from "tailwindcss/colors";

interface DragState {
  initX: number;
  initY: number;
  layerID: string;
}

const ArrowToolEventTarget: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  const [dragState, setDragState] = useState<DragState | null>(null);

  const onMouseDown = (event: React.MouseEvent) => {
    const layerID = drawing.addLayer({
      type: "arrow",
      color: colors.blue[300],
      x: event.clientX,
      y: event.clientY,
      dx: 0,
      dy: 0,
    });

    setDragState({
      initX: event.clientX,
      initY: event.clientY,
      layerID,
    });
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (dragState) {
      const { initX, initY, layerID } = dragState;
      const dx = event.clientX - initX;
      const dy = event.clientY - initY;

      drawing.updateLayer(layerID, {
        dx,
        dy,
      });
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

const RectEllipseToolEventTarget: React.FC<{
  drawing: Drawing;
  type: "rect" | "ellipse";
}> = observer(({ drawing, type }) => {
  const [dragState, setDragState] = useState<DragState | null>(null);

  const onMouseDown = (event: React.MouseEvent) => {
    const layerID = drawing.addLayer({
      type,
      color: colors.blue[300],
      fill: false,
      x: event.clientX,
      y: event.clientY,
      width: 0,
      height: 0,
    });

    setDragState({
      initX: event.clientX,
      initY: event.clientY,
      layerID,
    });
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (dragState) {
      const { initX, initY, layerID } = dragState;
      const x = Math.min(initX, event.clientX);
      const y = Math.min(initY, event.clientY);
      const width = Math.abs(event.clientX - initX);
      const height = Math.abs(event.clientY - initY);
      drawing.updateLayer(layerID, {
        x,
        y,
        width,
        height,
      });
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

const TextToolEventTarget: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  const onMouseDown = (event: React.MouseEvent) => {
    drawing.addLayer({
      type: "text",
      text: "Text",
      color: colors.blue[300],
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseDown={onMouseDown}
    ></div>
  );
});

export const EventTarget: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  switch (drawing.tool) {
    case "rect":
    case "ellipse":
      return (
        <RectEllipseToolEventTarget drawing={drawing} type={drawing.tool} />
      );
    case "arrow":
      return <ArrowToolEventTarget drawing={drawing} />;
    case "text":
      return <TextToolEventTarget drawing={drawing} />;
    case "select":
      return null;
  }
});
