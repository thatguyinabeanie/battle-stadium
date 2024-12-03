import { cn, SidebarFooter } from "@battle-stadium/ui";

import { NavUserComponent } from "../_components/nav-user";

const SIDEBAR_DEFAULT_CLASSNAMES = "m-4 rounded-xl bg-neutral-900/50";

export default function SidebarFooterSlot() {
  return (
    <SidebarFooter className={cn(SIDEBAR_DEFAULT_CLASSNAMES, "mt-0")}>
      <NavUserComponent />
    </SidebarFooter>
  );
}
