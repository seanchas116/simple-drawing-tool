import React from "react";
import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { EventTarget } from "./EventTarget";
import colors from "tailwindcss/colors";
import { state } from "../state/State";

export const Canvas: React.FC<{
  drawing: Drawing;
}> = observer(({ drawing }) => {
  const selectedLayer = drawing.selectedLayer;

  return (
    <div className="absolute inset-0 w-full h-full">
      <svg className="absolute inset-0 w-full h-full">
        <rect
          fill="white"
          width="100%"
          height="100%"
          onClick={() => {
            drawing.selectedID = null;
          }}
        />
        {[...drawing.layers].map(([id, layer]) => {
          return (
            <rect
              fill={colors.blue[500]}
              key={id}
              x={layer.x}
              y={layer.y}
              width={layer.width}
              height={layer.height}
              onClick={() => {
                drawing.selectedID = id;
              }}
            />
          );
        })}
        {selectedLayer && (
          <rect
            fill="none"
            stroke={colors.red[500]}
            strokeWidth={4}
            x={selectedLayer.x}
            y={selectedLayer.y}
            width={selectedLayer.width}
            height={selectedLayer.height}
          />
        )}
      </svg>
      {state.tool !== "select" && <EventTarget drawing={drawing} />}
    </div>
  );
});
