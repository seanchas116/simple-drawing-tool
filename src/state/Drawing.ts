import { action, makeObservable, observable } from "mobx";
import * as rtdb from "firebase/database";
import colors from "tailwindcss/colors";
import { ulid } from "ulid";
import { firebase } from "../firebase";
import { Layer } from "../types";

export class Drawing {
  constructor(id: string) {
    this.ref = rtdb.ref(firebase.rtdb, `drawings/${id}`);

    rtdb.onChildAdded(
      this.ref,
      action((snapshot) => {
        const layer = snapshot.val() as Layer;
        this.layers.set(snapshot.key!, layer);
      })
    );
    rtdb.onChildChanged(
      this.ref,
      action((snapshot) => {
        const layer = snapshot.val() as Layer;
        this.layers.set(snapshot.key!, layer);
      })
    );
    rtdb.onChildRemoved(
      this.ref,
      action((snapshot) => {
        this.layers.delete(snapshot.key!);
      })
    );

    makeObservable(this, {
      selectedID: observable,
      tool: observable,
      color: observable,
    });
  }

  readonly layers = observable.map<string, Layer>();
  readonly ref: rtdb.DatabaseReference;
  selectedID: string | null = null;
  tool: Tool = "select";
  color: string = colors.gray[800];

  addLayer(layer: Layer): string {
    const id = ulid();
    rtdb.set(rtdb.child(this.ref, id), layer);
    return id;
  }

  updateLayer(id: string, layer: Partial<Layer>) {
    rtdb.update(rtdb.child(this.ref, id), layer);
  }

  removeLayer(id: string) {
    rtdb.remove(rtdb.child(this.ref, id));
  }

  get selectedLayer(): Layer | null {
    return this.selectedID === null
      ? null
      : this.layers.get(this.selectedID) ?? null;
  }

  setColor(color: string) {
    this.color = color;
    if (this.selectedLayer) {
      this.updateLayer(this.selectedID!, { color });
    }
  }
}

export type Tool = "select" | "arrow" | "rect" | "ellipse" | "text";
