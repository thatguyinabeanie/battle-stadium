import { SidebarInset, SidebarProvider } from "@battle-stadium/ui/sidebar";

import type { ChildrenProps } from "~/types";
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

          <main
            aria-label="dashboard content"
            className="flex min-h-[100dvh] flex-1 flex-col gap-4 rounded-xl bg-neutral-900/50 p-4 md:min-h-min"
          >
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </BreadCrumbsProvider>
  );
}
