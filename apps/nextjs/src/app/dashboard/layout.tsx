import { Suspense } from "react";

import { SidebarInset, SidebarProvider } from "@battle-stadium/ui/sidebar";

import type { ChildrenProps } from "~/types";
import DashboardContentSkeleton from "~/app/dashboard/_components/dashboard-content-skeleton";
import DashboardHeader from "~/app/dashboard/_components/dashboard-header";
import { BreadCrumbsProvider } from "~/components/breadcrumbs/context";

interface DashboardLayoutProps extends ChildrenProps {
  sidebar: React.ReactNode;
}

export default function DashboardLayout({
  children,
  sidebar,
}: Readonly<DashboardLayoutProps>) {
  return (
    <BreadCrumbsProvider>
      <SidebarProvider className="border-[1px]">
        {sidebar}
        <SidebarInset className="border-l-[1px] bg-transparent">
          <DashboardHeader />
          <Suspense fallback={<DashboardContentSkeleton />}>
            <section
              role="status"
              aria-label="Loading dashboard content"
              className="flex flex-1 flex-col gap-4 p-4"
            >
              <div className="min-h-[100dvh] flex-1 rounded-xl bg-neutral-900/50 md:min-h-min">
                { children }
              </div>
            </section>
            <span className="sr-only" role="status" aria-live="polite">
              Loading dashboard content, please wait...
            </span>
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    </BreadCrumbsProvider>
  );
}
