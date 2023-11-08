import { Icon } from "@iconify/react";
import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { Canvas } from "./Canvas";
import { auth } from "../state/Auth";
import { SignIn } from "./SignIn";
import { action } from "mobx";
import { useKeyBindings } from "./useKeyBindings";
import * as Popover from "@radix-ui/react-popover";
import colors from "tailwindcss/colors";

const drawing = new Drawing("test");

const tools = [
  { type: "select", icon: "icon-park-outline:move-one" },
  { type: "rect", icon: "icon-park-outline:square" },
  { type: "ellipse", icon: "icon-park-outline:round" },
  { type: "arrow", icon: "icon-park-outline:arrow-right-up" },
  { type: "text", icon: "icon-park-outline:font-size" },
] as const;

const buttonStyle =
  "w-8 h-8 flex items-center justify-center rounded-full aria-selected:bg-blue-500 aria-selected:text-white hover:bg-gray-200";

const paletteColors = [
  colors.gray[800],
  colors.red[500],
  colors.yellow[500],
  colors.green[500],
  colors.blue[500],
  colors.purple[500],
];

export const App = observer(() => {
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
        <Popover.Root>
          <Popover.Trigger className={buttonStyle}>
            <div className="w-5 h-5 bg-black rounded-full" />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="rounded-3xl bg-white border border-gray-200 shadow-xl p-2 flex">
              {paletteColors.map((color) => {
                return (
                  <button
                    className={buttonStyle}
                    onClick={action(() => {
                      // TODO
                    })}
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                );
              })}
              <Popover.Arrow asChild>
                <svg
                  width="16"
                  height="8"
                  viewBox="0 0 16 8"
                  className="translate-y-[-1px]"
                >
                  <path
                    d="M0,0 L8,8 L16,0"
                    className="fill-white stroke-gray-200"
                  />
                </svg>
              </Popover.Arrow>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <div className="absolute right-4 bottom-4 shadow-xl border border-gray-200 rounded-full px-3 py-1 flex bg-white">
        <button className={buttonStyle}>
          <Icon icon="icon-park-outline:undo" />
        </button>
        <button className={buttonStyle}>
          <Icon icon="icon-park-outline:redo" />
        </button>
      </div>
      {auth.user ? null : <SignIn />}
    </div>
  );
});
