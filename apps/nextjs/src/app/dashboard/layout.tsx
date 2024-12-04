import { SidebarInset, SidebarProvider } from "@battle-stadium/ui/sidebar";

import type { ChildrenProps } from "~/types";
import DashboardHeader from "~/app/dashboard/breadcrumb-header";
import { BreadCrumbsProvider } from "~/components/breadcrumbs/context";
import SideBar from "./@sidebar/sidebar";

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
          <DashboardHeader />

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
