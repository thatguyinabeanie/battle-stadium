import { Suspense } from "react";

import { SidebarInset, SidebarProvider } from "@battle-stadium/ui/sidebar";

import type { DashboardLayoutSlots } from "~/types";
import { AppSidebar } from "~/components/sidebar/app-sidebar";
import DashboardContentSkeleton from "./_components/dashboard-content-skeleton";
import DashboardHeader from "./_components/dashboard-header";
import UploadThingSSR from "./_components/upload-thing-ssr";

export default function DashboardLayout(slots: Readonly<DashboardLayoutSlots>) {
  return (
    <>
      <Suspense>
        <UploadThingSSR />
      </Suspense>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <Suspense fallback={<DashboardContentSkeleton />}>
            {slots.children}
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
