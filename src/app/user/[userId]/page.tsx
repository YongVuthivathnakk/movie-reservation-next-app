"use client";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserIdpageProps {
  params: {
    userId: string;
  };
}

const UserIdPage = ({ params }: UserIdpageProps) => {
  const router = useRouter();
  const { userData, isCurrentUserLoading } = useCurrentUser();
  if (isCurrentUserLoading) {
    return (
      <div className="flex flex-col h-full gap-y-4 items-center justify-center">
        <p className="text-lg font-bold">Loading</p>
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  const { _creationTime, name, image, email, phone } = userData;

  const avatarFallback = name!.charAt(0).toUpperCase();

  const memberTime = new Date(_creationTime).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className=" w-full flex flex-col ">
      {/* <header className="w-full mb-10 px-5 pt-5">
        <Button variant={"outline"} onClick={() => router.back()}>
          <ArrowLeft />
          <span>Back</span>
        </Button>
      </header>
      <main className="px-5 sm:px-20 lg:px-40 ">
        <Card className="fex justify-center items-center w-full">
          <CardHeader className="w-50">
            <CardTitle className="text-center">My Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 flex flex-col justify-center items-center">
            <Avatar className="size-20 hover:opacity-75 transition ">
              <AvatarImage alt={name} src={image} />
              <AvatarFallback className="bg-[#ee3d41] text-white text-4xl">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
            <p className="text-center text-2xl font-medium">{name}</p>
          </CardContent>
          <CardFooter>
            <CardDescription>Member since {memberTime}</CardDescription>
          </CardFooter>
        </Card>
      </main> */}
    </div>
  );
};

export default UserIdPage;
