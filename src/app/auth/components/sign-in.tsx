import { SignInFlow } from "@/app/features/auth/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface SignInProps {
    setState: (state: SignInFlow) => void;
}



export const SignIn = ({ setState }: SignInProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState("");


    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="p-0">
                <CardTitle className="font-normal">
                    Login to continue
                </CardTitle>
                <CardDescription className="font-normal">
                    Use your email or another account to continue
                </CardDescription>
            </CardHeader>
            {/* Add error here */}
            <CardContent className="space-y-5 px-0 pb-0" >
                <form className="space-y-2.5">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isPending}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type={"password"}
                        required
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        size={"lg"}

                    >
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button variant={"outline"} className="relative">
                        <FcGoogle className="size-5 absolute top-2 left-2.5" />
                        <span>Contintue With Google</span>
                    </Button>
                </div>
                <p onClick={() => { setState("signUp") }} className="text-xs text-muted-foreground">
                    Don&apos;t have account? <span className="text-sky-700 hover:underline cursor-pointer">Sign Up</span>
                </p>
            </CardContent>
        </Card>
    )

}