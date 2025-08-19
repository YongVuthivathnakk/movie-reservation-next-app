import { SignIn } from "@/app/auth/components/sign-in";
import { SignUp } from "@/app/auth/components/sign-up";
import { useState } from "react";
import { SignInFlow } from "../types";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background layer */}
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center filter blur-xs"></div>

        {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Foreground content */}
      <div className="relative md:h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SignIn setState={setState} />
        ) : (
          <SignUp setState={setState} />
        )}
      </div>
    </div>
  );
};
