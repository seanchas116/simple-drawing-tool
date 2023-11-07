import { Icon } from "@iconify/react";

export default function App() {
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <div className="absolute left-[50%] bottom-4 translate-x-[-50%] shadow-xl border border-gray-200 rounded-full px-3 py-1 flex">
        <button className="p-2">
          <Icon icon="icon-park-outline:square" />
        </button>
        <button className="p-2">
          <Icon icon="icon-park-outline:round" />
        </button>
        <button className="p-2">
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
    </div>
  );
}
