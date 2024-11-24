import { Separator } from "@battle-stadium/ui/separator";
import { SidebarTrigger } from "@battle-stadium/ui/sidebar";

import Breadcrumbs from "./dashboard-breadcrumbs";

export default function DashboardHeader() {
  return (
const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: 'h-16',
  HEADER_HEIGHT_COLLAPSED: 'h-12',
  SEPARATOR_HEIGHT: 'h-4',
} as const;

    <header className={`flex ${LAYOUT_CONSTANTS.HEADER_HEIGHT} shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[data-collapsible=icon]/sidebar-wrapper:${LAYOUT_CONSTANTS.HEADER_HEIGHT_COLLAPSED}`}>
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className={`mr-2 ${LAYOUT_CONSTANTS.SEPARATOR_HEIGHT}`} />
        <Breadcrumbs />
      </div>
    </header>
  );
}
