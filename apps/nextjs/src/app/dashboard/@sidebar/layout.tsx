import { Sidebar } from "@battle-stadium/ui/sidebar";

interface SideBarSlots {
  "sidebar-header": React.ReactNode;
  "sidebar-footer": React.ReactNode;
  children?: never;
}
export default function SideBar(props: SideBarSlots) {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {props["sidebar-header"]}

      {props.children}
      {props["sidebar-footer"]}
    </Sidebar>
  );
}
