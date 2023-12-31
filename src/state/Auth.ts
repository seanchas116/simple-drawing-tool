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

  get user() {
    switch (this.state.type) {
      case "authenticated":
        return this.state.user;
      default:
        return null;
    }
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebase.auth, provider);
  }

  signOut() {
    firebase.auth.signOut();
  }
}

export const auth = new Auth();
