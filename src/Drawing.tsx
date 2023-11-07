import { observable } from "mobx";
import * as rtdb from "firebase/database";
import { firebase } from "./firebase";

interface Layer {
  type: "text" | "rect" | "ellipse";
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
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

  addLayer(layer: Layer) {
    rtdb.push(this.ref, layer);
  }

  removeLayer(id: string) {
    rtdb.remove(rtdb.child(this.ref, id));
  }
}
