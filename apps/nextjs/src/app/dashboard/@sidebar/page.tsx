import { cn } from "@battle-stadium/ui";
import { SidebarContent } from "@battle-stadium/ui/sidebar";

import { NavMain } from "./_components/nav-main/nav-main";

const SIDEBAR_DEFAULT_CLASSNAMES = "m-4 rounded-xl bg-neutral-900/50";
export default function DashboardSideBar() {
  return (
    <div className="flex h-full flex-col">
      <SidebarContent className={cn(SIDEBAR_DEFAULT_CLASSNAMES, "mt-0")}>
        <NavMain />
      </SidebarContent>
    </div>
  );
}
