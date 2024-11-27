"use client";

import { forwardRef } from "react";

import { cn, DropdownMenuContent, useSidebar } from "@battle-stadium/ui";

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
