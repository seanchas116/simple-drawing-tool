import { makeObservable, observable } from "mobx";

export type Tool = "select" | "text" | "rect" | "ellipse";

class State {
  constructor() {
    makeObservable(this, {
      tool: observable,
    });
  }

  tool: Tool = "select";
}

export const state = new State();
