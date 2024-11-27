"use client";

import { forwardRef } from "react";

import {
  cn,
  DropdownMenuContent,
  DropdownMenuPrimitive,
  SidebarMenuAction,
  useSidebar,
} from "@battle-stadium/ui";

export const DropDownMenuContentMobile = forwardRef<
  React.ComponentRef<typeof DropdownMenuContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuContent>
>(({ className, ...props }, ref) => {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenuContent
      ref={ref}
      className={cn(
        "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-background",
        className,
      )}
      align="start"
      side={isMobile ? "bottom" : "right"}
      sideOffset={4}
      {...props}
    >
      {props.children}
    </DropdownMenuContent>
  );
});
DropDownMenuContentMobile.displayName = "DropDownMenuContentMobile";

export const ProjectsDropDownMenuContentMobile = forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, ...props }, ref) => {
  const { isMobile } = useSidebar();
  const touchStyles = isMobile ? "min-h-[44px] active:bg-accent/80" : "";

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        className={`max-h-[300px] w-48 overflow-y-auto rounded-lg bg-background ${touchStyles} ${className}`}
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "end" : "start"}
        sideOffset={isMobile ? 8 : 2}
        alignOffset={-4}
        avoidCollisions
        {...props}
      >
        {props.children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});
ProjectsDropDownMenuContentMobile.displayName = "DropDownMenuContentMobile";

export const ProjectsSidebarMenuAction = forwardRef<
  React.ComponentRef<typeof SidebarMenuAction>,
  React.ComponentPropsWithoutRef<typeof SidebarMenuAction>
>(({ children, ...props }, ref) => {
  return (
    <SidebarMenuAction
      ref={ref}
      showOnHover
      role="button"
      aria-label={props["aria-label"]}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
    >
      {children}
    </SidebarMenuAction>
  );
});
