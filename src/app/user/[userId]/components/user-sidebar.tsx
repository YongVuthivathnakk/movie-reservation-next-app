"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AlignJustify,
  ArrowLeft,
  ArrowLeftToLine,
  Home,
  icons,
  Settings,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { title } from "process";

// Menu items.
const items = [
  {
    title: "My Profile",
    url: "/profile",
    icon: UserCircle2,
  },
  {
    title: "General",
    url: "/general",
    icon: AlignJustify,
  },
];

export const UserSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const targetUrl = pathname + "/" + item.url;
                const isActive = pathname.startsWith(targetUrl);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton disabled={isActive} asChild>
                      <a href={`${pathname}/${item.url}`}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
