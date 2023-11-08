import { Icon } from "@iconify/react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { twMerge } from "tailwind-merge";
import { Drawing } from "../state/Drawing";
import { Canvas } from "./Canvas";
import { auth } from "../state/Auth";
import { SignIn } from "./SignIn";

import { useKeyBindings } from "./useKeyBindings";

const drawing = new Drawing("test");

const tools = [
  { type: "select", icon: "icon-park-outline:move-one" },
  { type: "rect", icon: "icon-park-outline:square" },
  { type: "ellipse", icon: "icon-park-outline:round" },
  { type: "arrow", icon: "icon-park-outline:arrow-right-up" },
  { type: "text", icon: "icon-park-outline:font-size" },
] as const;

const toolbarStyle =
  "shadow-xl border border-gray-200 rounded-full px-3 py-1 flex bg-white";
const buttonStyle =
  "p-2 rounded-full aria-selected:bg-blue-500 aria-selected:text-white";

export const App = observer(() => {
  useKeyBindings(drawing);

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas drawing={drawing} />
      <div
        className={twMerge(
          toolbarStyle,
          "absolute left-[50%] bottom-4 translate-x-[-50%]"
        )}
      >
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
      </div>
      <div className={twMerge(toolbarStyle, "absolute right-4 bottom-4")}>
        <button className="p-2">
          <Icon icon="icon-park-outline:undo" />
        </button>
        <button className="p-2">
          <Icon icon="icon-park-outline:redo" />
        </button>
      </div>
      {drawing.selectedID !== null && (
        <div
          className={twMerge(
            toolbarStyle,
            "absolute left-[50%] top-4 translate-x-[-50%]"
          )}
        >
          <button className={buttonStyle}>
            <div className="w-4 h-4 rounded-full bg-gray-800" />
          </button>
          <button className={buttonStyle} aria-selected>
            <Icon icon="icon-park-outline:fill" />
          </button>
          <button className={buttonStyle}>
            <Icon icon="material-symbols:line-weight-rounded" />
          </button>
        </div>
      )}
      {auth.user ? null : <SignIn />}
    </div>
  );
});
