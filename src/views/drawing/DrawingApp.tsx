import { Icon } from "@iconify/react";
import { observer } from "mobx-react-lite";
import { Drawing } from "../../state/Drawing";
import { Canvas } from "./Canvas";
import { action } from "mobx";
import { useKeyBindings } from "./useKeyBindings";
import { ColorPopover } from "./ColorPopover";
import { auth } from "../../state/Auth";
import { useState } from "react";

const tools = [
  { type: "select", icon: "icon-park-outline:move-one" },
  { type: "rect", icon: "icon-park-outline:square" },
  { type: "ellipse", icon: "icon-park-outline:round" },
  { type: "arrow", icon: "icon-park-outline:arrow-right-up" },
  { type: "text", icon: "icon-park-outline:font-size" },
] as const;

const buttonStyle =
  "w-8 h-8 flex items-center justify-center rounded-full aria-selected:bg-blue-500 aria-selected:text-white hover:bg-gray-200";

export const DrawingApp = observer(() => {
  const [drawing] = useState(() => new Drawing("test"));

  useKeyBindings(drawing);

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas drawing={drawing} />
      <div className="absolute left-[50%] bottom-4 translate-x-[-50%] shadow-xl border border-gray-200 rounded-full px-3 py-1 flex bg-white">
        {tools.map((tool) => {
          return (
            <button
              className={buttonStyle}
              aria-selected={drawing.tool === tool.type}
              onClick={action(() => {
                drawing.tool = tool.type;
              })}
            >
              <Icon icon={tool.icon} />
            </button>
          );
        })}
        <hr className="border-gray-200 border-r-2 h-4 my-auto mx-2" />
        <ColorPopover drawing={drawing}>
          <button className={buttonStyle}>
            <div
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: drawing.color }}
            />
          </button>
        </ColorPopover>
      </div>
      <div className="absolute right-4 bottom-4 shadow-xl border border-gray-200 rounded-full px-3 py-1 flex bg-white">
        <button className={buttonStyle} onClick={() => auth.signOut()}>
          <Icon icon="icon-park-outline:logout" />
        </button>
      </div>
    </div>
  );
});
