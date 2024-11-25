import { Suspense } from "react";

import { SidebarInset, SidebarProvider } from "@battle-stadium/ui/sidebar";

import type { ChildrenProps } from "~/types";
import { AppSidebar } from "~/components/sidebar/app-sidebar";
import DashboardContentSkeleton from "./_components/dashboard-content-skeleton";
import DashboardHeader from "./_components/dashboard-header";

export default function DashboardLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <Suspense fallback={<DashboardContentSkeleton />}>{children}</Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
