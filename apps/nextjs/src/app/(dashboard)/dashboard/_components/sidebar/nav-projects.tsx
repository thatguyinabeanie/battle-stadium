import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Folder,
  Forward,
  Frame,
  MapIcon,
  MoreHorizontal,
  PieChart,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@battle-stadium/ui";
import { ProjectsDropDownMenuContentMobile, ProjectsSidebarMenuAction } from "./side-bar-client-components";

///Add touch-friendly styles for mobile +

export function NavProjects() {
  return (
    <SidebarGroup
      className="group-data-[collapsible=icon]:hidden"
      aria-label="Project navigation"
    >
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>

        {projects.map((item) => (

          <SidebarMenuItem key={item.name} className="flex flex-row">
            <SidebarMenuButton asChild>
              <Link href={item.url} title={item.name} className="truncate">
                <item.icon />
                <span className="truncate">{item.name}</span>
              </Link>
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ProjectsSidebarMenuAction
                >
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </ProjectsSidebarMenuAction>
              </DropdownMenuTrigger>

              <ProjectsDropDownMenuContentMobile >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </ProjectsDropDownMenuContentMobile>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>


      </SidebarMenu>
    </SidebarGroup>
  );
}

interface NavProject {
  name: string;
  url: string;
  icon: LucideIcon;
}
export const projects: NavProject[] = [
  {
    name: "Design Engineering",
    url: "#",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "#",
    icon: MapIcon,
  },
];
