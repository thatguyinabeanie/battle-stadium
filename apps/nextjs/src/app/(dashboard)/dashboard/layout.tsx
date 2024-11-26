import { Suspense } from "react";

import { SidebarInset, SidebarProvider } from "@battle-stadium/ui/sidebar";

import type { ChildrenProps } from "~/types";
import { AppSidebar } from "~/app/(dashboard)/dashboard/_components/sidebar/app-sidebar";
import DashboardContentSkeleton from "./_components/dashboard-content-skeleton";
import DashboardHeader from "./_components/dashboard-header";

export default function DashboardLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <SidebarProvider className="border-[1px]">
      <AppSidebar />
      <SidebarInset className="border-l-[1px] bg-transparent">
        <DashboardHeader />
        <Suspense fallback={<DashboardContentSkeleton />}>{children}</Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
