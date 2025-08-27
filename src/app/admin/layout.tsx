"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./components/admin-sidebar";
import { usePathname } from "next/navigation";
import { UserButton } from "../features/auth/components/user-button";
import { ThemeToggle } from "../components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";

export default function adminLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <SidebarProvider>
    <AdminSidebar />
    <main className="w-full">
      <div className="flex justify-between items-center bg-secondary w-full p-2.5">
        <div className="flex gap-7">
          <SidebarTrigger />
          <p className="text-lg">Admin Panel</p>
        </div>
        <div className="flex gap-7 items-center justify-center">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
      {children}
    </main>
    <Toaster position="top-center" />
    </SidebarProvider>
  );
}
