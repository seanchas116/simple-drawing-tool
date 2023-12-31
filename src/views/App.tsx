import { observer } from "mobx-react-lite";
import { auth } from "../state/Auth";
import { SignIn } from "./auth/SignIn";
import { DrawingApp } from "./drawing/DrawingApp";

export const App = observer(() => {
  return (
    <div className="fixed inset-0 w-screen h-screen select-none">
      {auth.state.type === "authenticated" && <DrawingApp />}
      {auth.state.type === "unauthenticated" && <SignIn />}
    </div>
  );
});
