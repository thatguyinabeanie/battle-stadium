import { cn } from "@battle-stadium/ui";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from "@battle-stadium/ui/sidebar";

interface SideBarSlots {
  sidebarheader: React.ReactNode;
  sidebarfooter: React.ReactNode;
  children?: React.ReactNode;
}

const SIDEBAR_DEFAULT_CLASSNAMES = "m-4 rounded-xl bg-neutral-900/50";
export default function SideBar({
  children,
  sidebarfooter,
  sidebarheader,
}: SideBarSlots) {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className={SIDEBAR_DEFAULT_CLASSNAMES}>
        {sidebarheader}
      </SidebarHeader>
      {children}
      <SidebarFooter className={cn(SIDEBAR_DEFAULT_CLASSNAMES, "mt-0")}>
        {sidebarfooter}
      </SidebarFooter>
    </Sidebar>
  );
}
