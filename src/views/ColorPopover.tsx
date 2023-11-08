import { Drawing } from "../state/Drawing";
import { action } from "mobx";
import * as Popover from "@radix-ui/react-popover";
import colors from "tailwindcss/colors";
import { useState } from "react";

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

export const ColorPopover: React.FC<{
  children: React.ReactElement;
  drawing: Drawing;
}> = ({ children, drawing }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded-3xl bg-white border border-gray-200 shadow-xl p-2 flex">
          {paletteColors.map((color) => {
            return (
              <button
                className={buttonStyle}
                onClick={action(() => {
                  drawing.setColor(color);
                  setOpen(false);
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
  );
};
