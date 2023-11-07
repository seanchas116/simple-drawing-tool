import { action, makeObservable, observable } from "mobx";
import { User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase } from "../firebase";

class Auth {
  constructor() {
    makeObservable(this, {
      user: observable,
    });

    firebase.auth.onAuthStateChanged(
      action((user: User | null) => {
        this.user = user;
      })
    );
  }

  user: User | null = null;

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebase.auth, provider);
  }
}

export const auth = new Auth();
