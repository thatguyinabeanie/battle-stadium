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
import DashboardContentSkeleton from "~/app/(dashboard)/dashboard/_components/content/dashboard-content-skeleton";
import DashboardHeader from "~/app/(dashboard)/dashboard/_components/content/dashboard-header";
import { NavMain } from "./_components/sidebar/nav-main";
import { MainAppLinksMenu } from "./_components/sidebar/nav-menu-switcher";
import { NavProjects } from "./_components/sidebar/nav-projects";
import { NavUserComponent } from "./_components/sidebar/nav-user";

export default function DashboardLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <SidebarProvider className="border-[1px]">
      <DashboardSideBar />

      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}

function DashboardSideBar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon" >
      <SidebarHeader className="bg-neutral-900/50 rounded-xl m-4">
        <MainAppLinksMenu />
      </SidebarHeader>

      <div className="flex flex-col h-full">
        <SidebarContent className="bg-neutral-900/50 rounded-xl mx-4 mb-4">
          <NavMain />
          <NavProjects />
        </SidebarContent>

        <SidebarFooter className="bg-neutral-900/50 rounded-xl mx-4 mb-4">
          <NavUserComponent />
        </SidebarFooter>
      </div>

      <SidebarRail />
    </Sidebar>
  );
}

function DashboardContent({ children }: Readonly<ChildrenProps>) {
  return (
    <SidebarInset className="border-l-[1px] bg-transparent">
      <DashboardHeader />
      <Suspense fallback={<DashboardContentSkeleton />}>
        {children}
        <span className="sr-only">
          Loading dashboard content, please wait...
        </span>
      </Suspense>
    </SidebarInset>
  );
}
