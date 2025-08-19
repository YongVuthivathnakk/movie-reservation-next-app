import { SignInFlow } from "@/app/features/auth/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

interface SignUpProps {
  setState: (state: SignInFlow) => void;
}

export const SignUp = ({ setState }: SignUpProps) => {
  const { signIn } = useAuthActions();
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const onPasswordSingUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }
    setIsPending(true);

    signIn("password", { email, name, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const onProviderSignIn = (value: "google") => {
    setIsPending(true);
    signIn(value).finally(() => {
      setIsPending(false);
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="p-0">
        <CardTitle className="font-normal">Register to continue</CardTitle>
        <CardDescription className="font-normal">
          Use your email or another to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={(e) => onPasswordSingUp(e)}>
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
                placeholder="Username"
                type="text"
                required
            />
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
            disabled={isPending}
            required
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            disabled={isPending}
            required
          />
          
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={isPending}
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            onClick={() => onProviderSignIn("google")}
            variant={"outline"}
            className="relative"
            disabled={isPending}
          >
            <FcGoogle className="size-5 absolute top-2 left-2.5" />
            <span>Contintue With Google</span>
          </Button>
        </div>
        <p
          onClick={() => {
            setState("signIn");
          }}
          className="text-xs text-muted-foreground"
        >
          Already have an account?{" "}
          <span className="text-sky-700 hover:underline cursor-pointer">
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
