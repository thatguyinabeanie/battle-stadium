import { SidebarHeader } from "@battle-stadium/ui/sidebar";

import { MainAppLinksMenu } from "./links-menu";

const SIDEBAR_DEFAULT_CLASSNAMES = "m-4 rounded-xl bg-neutral-900/50";

export default function SidebarHeaderSlot() {
  return (
    <SidebarHeader className={SIDEBAR_DEFAULT_CLASSNAMES}>
      <MainAppLinksMenu />
    </SidebarHeader>
  );
}
