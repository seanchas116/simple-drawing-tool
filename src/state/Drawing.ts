import { action, makeObservable, observable } from "mobx";
import * as rtdb from "firebase/database";
import colors from "tailwindcss/colors";
import { ulid } from "ulid";
import { firebase } from "../firebase";
import { Layer, Point } from "../types";
import { auth } from "./Auth";

function getRandomColor() {
  const candidates = [
    colors.red[500],
    colors.yellow[500],
    colors.green[500],
    colors.blue[500],
    colors.purple[500],
    colors.pink[500],
  ];

  return candidates[Math.floor(Math.random() * candidates.length)];
}

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

    rtdb
      .onDisconnect(rtdb.ref(firebase.rtdb, `cursors/${this.clientID}`))
      .remove();
  }

  readonly clientID = ulid();
  readonly clientColor = getRandomColor();
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

  populateCursor(point: Point) {
    const cursorRef = rtdb.ref(firebase.rtdb, `cursors/${this.clientID}`);

    rtdb.set(cursorRef, {
      ...point,
      color: this.clientColor,
      avatar: auth.user?.photoURL,
    });
  }
}

export type Tool = "select" | "arrow" | "rect" | "ellipse" | "text";
