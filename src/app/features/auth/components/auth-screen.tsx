import { SignIn } from "@/app/auth/components/sign-in";
import { SignUp } from "@/app/auth/components/sign-up";
import { useState } from "react"
import { SignInFlow } from "../types";

export const AuthScreen = () => {

    const [state, setState] = useState<SignInFlow>("signIn");


    return (
        <div className="h-screen flex items-center justify-center bg-neutral-800">

            <div className="md:h-auto md:w-[420px]">
                {state === "signIn" ? <SignIn setState={setState} /> : <SignUp setState={setState} />}
            </div>
        </div>
    )
}