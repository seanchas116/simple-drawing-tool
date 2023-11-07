import { observable } from "mobx";
import * as rtdb from "firebase/database";
import { firebase } from "../firebase";

interface Layer {
  type: "text" | "rect" | "ellipse";
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

function generateRandomID(): string {
  return Math.random().toString(36).substring(7);
}

export class Drawing {
  constructor(id: string) {
    this.ref = rtdb.ref(firebase.rtdb, `drawings/${id}`);

    rtdb.onChildAdded(this.ref, (snapshot) => {
      const layer = snapshot.val() as Layer;
      this.layers.set(snapshot.key!, layer);
    });
    rtdb.onChildChanged(this.ref, (snapshot) => {
      const layer = snapshot.val() as Layer;
      this.layers.set(snapshot.key!, layer);
    });
    rtdb.onChildRemoved(this.ref, (snapshot) => {
      this.layers.delete(snapshot.key!);
    });
  }

  readonly layers = observable.map<string, Layer>();
  readonly ref: rtdb.DatabaseReference;

  addLayer(layer: Layer): string {
    const id = generateRandomID();
    rtdb.set(rtdb.child(this.ref, id), layer);
    return id;
  }

  updateLayer(id: string, layer: Layer) {
    rtdb.set(rtdb.child(this.ref, id), layer);
  }

  removeLayer(id: string) {
    rtdb.remove(rtdb.child(this.ref, id));
  }
}