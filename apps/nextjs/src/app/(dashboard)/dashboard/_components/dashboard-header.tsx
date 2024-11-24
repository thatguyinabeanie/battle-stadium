import { Separator } from "@battle-stadium/ui/separator";
import { SidebarTrigger } from "@battle-stadium/ui/sidebar";

import Breadcrumbs from "./dashboard-breadcrumbs";

export default function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[data-collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs />
      </div>
    </header>
  );
}
