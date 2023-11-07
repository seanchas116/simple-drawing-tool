import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { useState } from "react";

interface DragState {
  initX: number;
  initY: number;
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
