import { Icon } from "@iconify/react";
import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { Canvas } from "./Canvas";
import { auth } from "../state/Auth";
import { SignIn } from "./SignIn";
import { action } from "mobx";
import { useKeyBindings } from "./useKeyBindings";

const drawing = new Drawing("test");

const tools = [
  { type: "select", icon: "icon-park-outline:move-one" },
  { type: "rect", icon: "icon-park-outline:square" },
  { type: "ellipse", icon: "icon-park-outline:round" },
  { type: "arrow", icon: "icon-park-outline:arrow-right-up" },
  { type: "text", icon: "icon-park-outline:font-size" },
] as const;

export const App = observer(() => {
  useKeyBindings(drawing);

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas drawing={drawing} />
      <div className="absolute left-[50%] bottom-4 translate-x-[-50%] shadow-xl border border-gray-200 rounded-full px-3 py-1 flex">
        {tools.map((tool) => {
          return (
            <button
              className="p-2 rounded-full aria-selected:bg-blue-500 aria-selected:text-white"
              aria-selected={drawing.tool === tool.type}
              onClick={action(() => {
                drawing.tool = tool.type;
              })}
            >
              <Icon icon={tool.icon} />
            </button>
          );
        })}
      </div>
      <div className="absolute right-4 bottom-4 shadow-xl border border-gray-200 rounded-full px-3 py-1 flex">
        <button className="p-2">
          <Icon icon="icon-park-outline:undo" />
        </button>
        <button className="p-2">
          <Icon icon="icon-park-outline:redo" />
        </button>
      </div>
      {auth.user ? null : <SignIn />}
    </div>
  );
});
