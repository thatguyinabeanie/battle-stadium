import { cn, SidebarContent } from "@battle-stadium/ui";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from "@battle-stadium/ui/sidebar";
import Header from "./header";
import Footer from "./footer";
import { Suspense } from "react";

interface SideBarSlots {
  sidebarheader: React.ReactNode;
  sidebarfooter: React.ReactNode;
  children?: React.ReactNode;
}

const SIDEBAR_DEFAULT_CLASSNAMES = "m-4 rounded-xl bg-neutral-900/50";
export default function SideBar({
  children,
}: SideBarSlots) {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className={SIDEBAR_DEFAULT_CLASSNAMES}>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
      </SidebarHeader>

      <SidebarContent className={cn(SIDEBAR_DEFAULT_CLASSNAMES, "mt-0")}>
        {children}
      </SidebarContent>

      <SidebarFooter className={cn(SIDEBAR_DEFAULT_CLASSNAMES, "mt-0")}>
        <Suspense fallback={ null }>
          <Footer />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
