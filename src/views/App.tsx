import { Icon } from "@iconify/react";
import { observer } from "mobx-react-lite";
import { Drawing } from "../state/Drawing";
import { Canvas } from "./Canvas";
import { auth } from "../state/Auth";
import { SignIn } from "./SignIn";

const drawing = new Drawing("test");

export const App = observer(() => {
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas drawing={drawing} />
      <div className="absolute left-[50%] bottom-4 translate-x-[-50%] shadow-xl border border-gray-200 rounded-full px-3 py-1 flex">
        <button
          className="p-2 rounded-full aria-selected:bg-blue-500 aria-selected:text-white"
          aria-selected={drawing.tool === "rect"}
          onClick={() => {
            drawing.tool = drawing.tool === "rect" ? "select" : "rect";
          }}
        >
          <Icon icon="icon-park-outline:square" />
        </button>
        <button
          className="p-2 rounded-full aria-selected:bg-blue-500 aria-selected:text-white"
          aria-selected={drawing.tool === "ellipse"}
          onClick={() => {
            drawing.tool = drawing.tool === "ellipse" ? "select" : "ellipse";
          }}
        >
          <Icon icon="icon-park-outline:round" />
        </button>
        <button
          className="p-2 rounded-full aria-selected:bg-blue-500 aria-selected:text-white"
          aria-selected={drawing.tool === "arrow"}
          onClick={() => {
            drawing.tool = drawing.tool === "arrow" ? "select" : "arrow";
          }}
        >
          <Icon icon="icon-park-outline:arrow-right-up" />
        </button>
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
