import { action, makeObservable, observable } from "mobx";
import { User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase } from "../firebase";

type AuthState =
  | { type: "loading" }
  | { type: "authenticated"; user: User }
  | { type: "unauthenticated" };

class Auth {
  constructor() {
    makeObservable(this, {
      state: observable.ref,
    });

    firebase.auth.onAuthStateChanged(
      action((user: User | null) => {
        this.state = user
          ? { type: "authenticated", user }
          : { type: "unauthenticated" };
      })
    );
  }

  state: AuthState = { type: "loading" };

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebase.auth, provider);
  }
}

export const auth = new Auth();
