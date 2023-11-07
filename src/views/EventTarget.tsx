import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { useState } from "react";

interface DragState {
  initialX: number;
  initialY: number;
  layerID: string;
}

export const EventTarget: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  const [dragState, setDragState] = useState<DragState | null>(null);

  const onMouseDown = (event: React.MouseEvent) => {
    const layerID = drawing.addLayer({
      type: "rect",
      text: "",
      x: event.clientX,
      y: event.clientY,
      width: 0,
      height: 0,
    });

    setDragState({
      initialX: event.clientX,
      initialY: event.clientY,
      layerID,
    });
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (dragState) {
      const { initialX, initialY, layerID } = dragState;
      const x = Math.min(initialX, event.clientX);
      const y = Math.min(initialY, event.clientY);
      const width = Math.abs(event.clientX - initialX);
      const height = Math.abs(event.clientY - initialY);
      drawing.updateLayer(layerID, {
        type: "rect",
        text: "",
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
