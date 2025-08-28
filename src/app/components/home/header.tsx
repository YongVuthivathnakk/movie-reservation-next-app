import { ThemeToggle } from "@/app/components/theme-toggle";
import { UserButton } from "@/app/features/auth/components/user-button";
import { NotificationButton } from "@/app/features/ticket/components/notification-button";
import { TicketButton } from "@/app/features/ticket/components/ticket-button";
import React   from "react";

export const HomeHeader = () => {

  return (
    <>
      <header className="w-full border-b bg-secondary">
        <div className="flex h-16 justify-between px-4 w-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Movie Reservation</h1>
            <p className="text-sm text-muted-foreground">
              Movie Seats Booking Platform
            </p>
          </div>
          <div className="flex justify-between gap-7 items-center">
            <TicketButton />
            <NotificationButton />
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </header>
    </>
  );
};
