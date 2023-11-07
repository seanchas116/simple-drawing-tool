import { action, makeObservable, observable } from "mobx";
import { User } from "firebase/auth";
import { firebase } from "./firebase";

class Auth {
  constructor() {
    makeObservable(this, {
      user: observable,
    });

    firebase.auth.onAuthStateChanged(
      action((user) => {
        this.user = user;
      })
    );
  }

  user: User | null = null;
}

export const auth = new Auth();
