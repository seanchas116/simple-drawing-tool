import { useEffect } from "react";
import hotkeys from "hotkeys-js";
import { Drawing } from "../state/Drawing";
import { action } from "mobx";

export function useKeyBindings(drawing: Drawing) {
  useEffect(() => {
    // delete
    hotkeys(
      "backspace",
      action((event: KeyboardEvent) => {
        event.preventDefault();

        if (drawing.selectedID) {
          drawing.removeLayer(drawing.selectedID);
        }
      })
    );

    // undo
    hotkeys(
      "command+z, ctrl+z",
      action((event: KeyboardEvent) => {
        event.preventDefault();
        console.log("TODO: undo");
      })
    );

    // redo
    hotkeys(
      "command+shift+z, ctrl+shift+z",
      action((event: KeyboardEvent) => {
        event.preventDefault();
        console.log("TODO: redo");
      })
    );

    return () => {
      hotkeys.unbind();
    };
  }, [drawing]);
}
