"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import { HomeIcon, LayoutDashboard, Loader, LogOut, Settings } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "../api/use-current-user";
import { CreatePhoneModel } from "@/app/components/home/create-phone-model";

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { userData, isCurrentUserLoading } = useCurrentUser();
  const pathname = usePathname();

  if (isCurrentUserLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!userData) {
    return null;
  }

  const { _id, name, image, phone, role } = userData;

  const avatarFallback = name!.charAt(0).toUpperCase();

  const handleProfile = () => {
    router.push(`/user/${_id}`);
  };


  const handleAdmin = () => {
    router.push(`/admin/dashboard`);
  };

  const handleHome = () => {
    router.push(`/`);
  };

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative">
          <Avatar className="size-10 hover:opacity-75 transition">
            <AvatarImage alt={name} src={image} />
            <AvatarFallback className="bg-[#ee3d41] text-white">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="right" className="w-60">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          {role === "admin" && pathname === "/" && (
            <DropdownMenuItem onClick={() => handleAdmin()} className="h-10">
              <LayoutDashboard />
              Admin Dashboard
            </DropdownMenuItem>
          )}

          {pathname.startsWith("/admin") && (
            <DropdownMenuItem onClick={() => handleHome()} className="h-10">
              <HomeIcon />
              Home
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => handleProfile()}>
            <Settings className="size-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()} className="h-10">
            <LogOut className="size-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreatePhoneModel phone={phone}/>
    </div>
  );
};