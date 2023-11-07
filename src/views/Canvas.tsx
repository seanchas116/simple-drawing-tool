import React from "react";
import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { EventTarget } from "./EventTarget";
import colors from "tailwindcss/colors";

export const Canvas: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <svg className="absolute inset-0 w-full h-full">
        {[...drawing.layers].map(([id, layer]) => {
          return (
            <rect
              fill={colors.blue[500]}
              key={id}
              x={layer.x}
              y={layer.y}
              width={layer.width}
              height={layer.height}
            />
          );
        })}
      </svg>
      <EventTarget drawing={drawing} />
    </div>
  );
});
