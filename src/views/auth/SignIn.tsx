import { auth } from "../../state/Auth";

export const SignIn = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-white flex flex-col gap-8 items-center justify-center">
      <h1 className="font-bold text-lg">Simple Drawing App</h1>
      <button
        className="rounded-full border border-gray-200 px-4 py-2 bg-white text-gray-800 shadow"
        onClick={() => auth.signInWithGoogle()}
      >
        Sign in with Google
      </button>
    </div>
  );
};
