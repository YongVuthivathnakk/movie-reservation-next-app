import { SignInFlow } from "@/app/features/auth/types"
import { Button } from "@/components/ui/button"


interface SignUpProps {
    setState: (state: SignInFlow) => void;
}


export const SignUp = ({ setState } : SignUpProps) => {
    return(
        <div>
            Sign Up

            <Button onClick={() => setState("signIn")}>
                Sign In
            </Button>
        </div>
    )
}