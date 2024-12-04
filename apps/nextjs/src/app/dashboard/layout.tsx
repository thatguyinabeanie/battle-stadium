import { SidebarInset, SidebarProvider, SidebarTrigger } from "@battle-stadium/ui/sidebar";

import type { ChildrenProps } from "~/types";
import { Breadcrumbs } from "~/app/dashboard/breadcrumbs";
import { BreadCrumbsProvider } from "~/components/breadcrumbs/context";
import SideBar from "./@sidebar/sidebar";
import { Separator } from "@battle-stadium/ui";
import { Suspense } from "react";

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
        <SideBar>{sidebar}</SideBar>

        <SidebarInset className="border-none bg-transparent">
          <DashboardBreadcrumbHeader />

          <div
            aria-label="dashboard content"
            className="my-4 mr-4 flex min-h-[100dvh] flex-1 flex-col gap-4 rounded-xl bg-neutral-900/50 md:min-h-min"
          >
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </BreadCrumbsProvider>
  );
}

const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: "h-16",
  HEADER_HEIGHT_COLLAPSED: "h-12",
  SEPARATOR_HEIGHT: "h-4",
} as const;

function DashboardBreadcrumbHeader () {
  return (
    <header
      className={ `flex ${LAYOUT_CONSTANTS.HEADER_HEIGHT} shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[data-collapsible=icon]/sidebar-wrapper:${LAYOUT_CONSTANTS.HEADER_HEIGHT_COLLAPSED} mr-4 mt-4 rounded-xl border-none bg-neutral-900/50` }
    >
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="ml-1" aria-label="Open Sidebar" />
        <Separator
          orientation="vertical"
          className={ `mr-2 ${LAYOUT_CONSTANTS.SEPARATOR_HEIGHT}` }
        />
        <Suspense fallback={ null }>
          <Breadcrumbs />
        </Suspense>
      </div>
    </header>
  );
}
