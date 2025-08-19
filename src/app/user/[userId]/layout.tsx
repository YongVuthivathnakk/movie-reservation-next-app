import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSideBar } from "./components/user-sidebar";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <SidebarProvider>
      <UserSideBar />
      <main>
        <SidebarTrigger className="m-2" />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default UserLayout;
