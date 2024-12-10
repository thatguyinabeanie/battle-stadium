import {
  cn,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@battle-stadium/ui";

import type { ChildrenProps } from "~/types";
import Footer from "./footer";
import Header from "./header";

const SIDEBAR_DEFAULT_CLASSNAMES = "m-4 rounded-xl bg-neutral-900/50";
export default function SideBar({ children }: ChildrenProps) {
  return (
    <Sidebar className="hidden" variant="sidebar" collapsible="icon">
      <SidebarHeader className={SIDEBAR_DEFAULT_CLASSNAMES}>
        <Header />
      </SidebarHeader>

      <SidebarContent className={cn(SIDEBAR_DEFAULT_CLASSNAMES, "mt-0")}>
        {children}
      </SidebarContent>

      <SidebarFooter className={cn(SIDEBAR_DEFAULT_CLASSNAMES, "mt-0")}>
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
