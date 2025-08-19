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
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignInProps {
  setState: (state: SignInFlow) => void;
}

export const SignIn = ({ setState }: SignInProps) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const onProviderSignIn = (value: "google") => {
    setIsPending(true);
    signIn(value).finally(() => {
      setIsPending(false);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError("");
    try {
      const result = await signIn("password", {
        email,
        password,
        flow: "signIn",
      });
    } catch (err) {
      setError("Invalid Password or Email");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="p-0">
        <CardTitle className="font-normal">Login to continue</CardTitle>
        <CardDescription className="font-normal">
          Use your email or another account to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={(e) => handleSubmit(e)}>
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
            setState("signUp");
          }}
          className="text-xs text-muted-foreground"
        >
          Don&apos;t have account?{" "}
          <span className="text-sky-700 hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
