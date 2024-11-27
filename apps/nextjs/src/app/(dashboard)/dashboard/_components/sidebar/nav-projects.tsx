"use client";

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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@battle-stadium/ui";

///Add touch-friendly styles for mobile +

export function NavProjects() {
  const { isMobile } = useSidebar();
  const touchStyles = isMobile ? "min-h-[44px] active:bg-accent/80" : "";
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
                <SidebarMenuAction
                  showOnHover
                  role="button"
                  aria-label={`More actions for ${item.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                >
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className={`max-h-[300px] w-48 overflow-y-auto rounded-lg bg-background ${touchStyles}`}
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
                sideOffset={isMobile ? 8 : 2}
                alignOffset={-4}
                avoidCollisions
              >
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
              </DropdownMenuContent>
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
