"use client";

import {
  Armchair,
  Calendar,
  CalendarClock,
  DoorOpen,
  Home,
  Inbox,
  LayoutDashboard,
  Popcorn,
  Search,
  Settings,
  Tickets,
  Users2,
} from "lucide-react";

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
import { UserButton } from "@/app/features/auth/components/user-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users2,
  },
  {
    title: "Movies",
    url: "/admin/movies",
    icon: Popcorn,
  },
  {
    title: "Rooms",
    url: "/admin/rooms",
    icon: DoorOpen,
  },
  {
    title: "Seats",
    url: "/admin/seats",
    icon: Armchair,
  },
  {
    title: "ShowTimes",
    url: "/admin/show-times",
    icon: CalendarClock,
  },
  {
    title: "Tickets",
    url: "/admin/tickets",
    icon: Tickets,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Movie Reservation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={active} asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button asChild>
          <Link className="flex gap-3 justify-center items-center"
            href={
              "https://github.com/YongVuthivathnakk/movie-reservation-next-app.git"
            }
            target="_blank"
          >
            <FaGithub />
            Github
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
