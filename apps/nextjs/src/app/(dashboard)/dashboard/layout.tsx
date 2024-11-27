import { Suspense } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@battle-stadium/ui/sidebar";

import type { ChildrenProps } from "~/types";
import DashboardContentSkeleton from "./_components/dashboard-content-skeleton";
import DashboardHeader from "./_components/dashboard-header";
import { NavMain } from "./_components/sidebar/nav-main";
import { MainAppLinksMenu } from "./_components/sidebar/nav-menu-switcher";
import { NavProjects } from "./_components/sidebar/nav-projects";
import { NavUserComponent } from "./_components/sidebar/nav-user";

export default function DashboardLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <SidebarProvider className="border-[1px]">
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader>
          <MainAppLinksMenu />
        </SidebarHeader>

        <SidebarContent>
          <NavMain />
          <NavProjects />
        </SidebarContent>

        <SidebarFooter>
          <NavUserComponent />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
      <SidebarInset className="border-l-[1px] bg-transparent">
        <DashboardHeader />
        <Suspense fallback={<DashboardContentSkeleton />}>
          {children}
          <span className="sr-only">
            Loading dashboard content, please wait...
          </span>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
