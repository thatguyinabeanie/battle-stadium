import { cn, Separator } from "@battle-stadium/ui";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@battle-stadium/ui/sidebar";

import type { ChildrenProps } from "~/types";
import { BreadCrumbsProvider } from "~/components/breadcrumbs/context";
import SideBar from "./@sidebar/sidebar";

const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: "h-16",
  HEADER_HEIGHT_COLLAPSED: "h-12",
  SEPARATOR_HEIGHT: "h-4",
} as const;

const HEADER_CLASSES = {
  CONTAINER: cn(
    "flex shrink-0 items-center gap-2",
    "transition-[width,height] ease-linear",
    "mx-4 mt-4 rounded-xl border-none bg-neutral-950",
    LAYOUT_CONSTANTS.HEADER_HEIGHT,
    `group-has-[data-collapsible=icon]/sidebar-wrapper:${LAYOUT_CONSTANTS.HEADER_HEIGHT_COLLAPSED}`,
  ),
  INNER: `flex items-center gap-2 px-4`,
} as const;

interface DashboardLayoutProps extends ChildrenProps {
  sidebar: React.ReactNode;
  breadcrumbs: React.ReactNode;
}

export default function DashboardLayout({
  children,
  sidebar,
  breadcrumbs,
}: Readonly<DashboardLayoutProps>) {
  return (
    <section className="min-w-screen max-w-screen h-full max-h-screen min-h-screen w-full overflow-hidden">
      <BreadCrumbsProvider>
        <SidebarProvider className="max-h-svh border-none">
          <SideBar>{sidebar}</SideBar>

          <SidebarInset className="border-none bg-transparent">
            <BreadCrumbsContainer>{breadcrumbs}</BreadCrumbsContainer>

            <div
              aria-label="dashboard content"
              className="scrollbar-gutter-stable m-4 flex flex-1 flex-col gap-4 overflow-y-scroll rounded-xl bg-neutral-950"
            >
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </BreadCrumbsProvider>
    </section>
  );
}

function BreadCrumbsContainer({ children }: ChildrenProps) {
  return (
    <header role="banner" className={HEADER_CLASSES.CONTAINER}>
      <div className={HEADER_CLASSES.INNER}>
        <SidebarTrigger className="ml-1" aria-label="Open Sidebar" />
        <Separator
          aria-hidden="true"
          orientation="vertical"
          className={`mr-2 ${LAYOUT_CONSTANTS.SEPARATOR_HEIGHT}`}
        />
        <nav aria-label="Breadcrumb navigation">{children}</nav>
      </div>
    </header>
  );
}
