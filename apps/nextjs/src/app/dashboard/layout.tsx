import { Sidebar, SidebarContent } from "@battle-stadium/ui";
import { SidebarInset, SidebarProvider } from "@battle-stadium/ui/sidebar";

import type { ChildrenProps } from "~/types";
import { BreadCrumbsProvider } from "~/components/breadcrumbs/context";

interface DashboardLayoutProps extends ChildrenProps {
  sidebar: React.ReactNode;
  breadcrumbs: React.ReactNode;
}

export default function DashboardLayout({
  children,
  sidebar,
  // breadcrumbs,
}: Readonly<DashboardLayoutProps>) {
  return (
    <section className="w-full min-w-full overflow-hidden">
      <BreadCrumbsProvider>
        <SidebarProvider className="border-none">
          <Sidebar
            className="m-4 mr-0 mt-0 rounded-xl bg-neutral-950"
            variant="sidebar"
            collapsible="icon"
          >
            <SidebarContent className="pt-4">{sidebar}</SidebarContent>
          </Sidebar>

          <SidebarInset
            aria-label="dashboard content"
            className="scrollbar-gutter-stable m-4 mt-0 flex flex-1 flex-col gap-4 overflow-y-scroll rounded-xl bg-neutral-950"
          >
            {children}
          </SidebarInset>
        </SidebarProvider>
      </BreadCrumbsProvider>
    </section>
  );
}
