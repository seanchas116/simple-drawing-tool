import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { Drawing } from "../../state/Drawing";
import { EventTarget } from "./EventTarget";
import { CanvasItem } from "./CanvasItem";
import { Icon } from "@iconify/react";
import { Selection, TextSelectionUnderline } from "./Selection";
import { TextEditor } from "./TextEditor";

export const Canvas: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  const onPointerMove = action((event: React.PointerEvent) => {
    drawing.populateCursor({ x: event.clientX, y: event.clientY });
  });

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onPointerMove={onPointerMove}
    >
      <svg className="absolute inset-0 w-full h-full">
        <rect
          fill="white"
          width="100%"
          height="100%"
          onClick={action(() => {
            drawing.selectedID = null;
          })}
        />
        <TextSelectionUnderline drawing={drawing} />
        {[...drawing.layers].map(([id, layer]) => {
          if (id === drawing.editingID) return null;
          return (
            <CanvasItem key={id} drawing={drawing} id={id} layer={layer} />
          );
        })}
        <Selection drawing={drawing} />
      </svg>
      <EventTarget drawing={drawing} />
      <div className="pointer-events-none">
        {drawing.cursors.map((cursor) => {
          return (
            <div
              key={cursor.id}
              style={{
                position: "absolute",
                left: cursor.x - 2 + "px",
                top: cursor.y - 2 + "px",
                fontSize: "16px",
                color: cursor.color,
              }}
            >
              <Icon icon="fluent:cursor-16-filled" />
              <img
                className="absolute left-[3px] top-2 w-5 h-5 rounded-full border-2 max-w-none"
                style={{ borderColor: cursor.color }}
                alt="avatar"
                src={cursor.avatar}
              />
            </div>
          );
        })}
      </div>
      {drawing.editingID !== null && <TextEditor drawing={drawing} />}
    </div>
  );
});
