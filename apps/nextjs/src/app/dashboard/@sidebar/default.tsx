import { cn } from "@battle-stadium/ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@battle-stadium/ui/sidebar";

import { MainAppLinksMenu } from "./_components/main-app-links-menu";
import { NavMain } from "./_components/nav-main/nav-main";
import { NavUserComponent } from "./_components/nav-user";

const SIDEBAR_DEFAULT_CLASSNAMES = "m-4 rounded-xl bg-neutral-900/50";
export default function DashboardSideBar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className={SIDEBAR_DEFAULT_CLASSNAMES}>
        <MainAppLinksMenu />
      </SidebarHeader>

      <div className="flex h-full flex-col">
        <SidebarContent className={cn(SIDEBAR_DEFAULT_CLASSNAMES, "mt-0")}>
          <NavMain />
        </SidebarContent>

        <SidebarFooter className={cn(SIDEBAR_DEFAULT_CLASSNAMES, "mt-0")}>
          <NavUserComponent />
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
