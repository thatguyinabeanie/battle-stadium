import { Suspense } from "react";

import {
  SidebarInset,
  SidebarProvider,
} from "@battle-stadium/ui/sidebar";

import type { ChildrenProps } from "~/types";
import DashboardContentSkeleton from "~/app/(dashboard)/dashboard/_components/content/dashboard-content-skeleton";
import DashboardHeader from "~/app/(dashboard)/dashboard/_components/content/dashboard-header";
import { BreadCrumbsProvider } from "./_components/breadcrumbs/context";

interface DashboardLayoutProps extends ChildrenProps {
  sidebar: React.ReactNode;
}

export default function DashboardLayout ({ children, sidebar }: Readonly<DashboardLayoutProps>) {
  return (
    <BreadCrumbsProvider>
      <SidebarProvider className="border-[1px]">
        {sidebar}
        <SidebarInset className="border-l-[1px] bg-transparent">
          <DashboardHeader />
          <Suspense fallback={ <DashboardContentSkeleton /> }>
            { children }
            <span className="sr-only" role="status" aria-live="polite">
              Loading dashboard content, please wait...
            </span>
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    </BreadCrumbsProvider>
  );
}

