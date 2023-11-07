import { auth } from "../state/Auth";

export const SignIn = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-white">
      <button onClick={() => auth.signInWithGoogle()}>Sign In</button>
    </div>
  );
};
