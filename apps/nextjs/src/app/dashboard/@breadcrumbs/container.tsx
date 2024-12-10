import { cn, Separator, SidebarTrigger } from "@battle-stadium/ui";

import type { ChildrenProps } from "~/types";

const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: "h-16",
  HEADER_HEIGHT_COLLAPSED: "h-12",
  SEPARATOR_HEIGHT: "h-4",
} as const;

const HEADER_CLASSES = {
  CONTAINER: cn(
    "flex shrink-0 items-center gap-2",
    "transition-[width,height] ease-linear",
    "mx-4 mt-4 rounded-xl border-none bg-neutral-950",
    LAYOUT_CONSTANTS.HEADER_HEIGHT,
    `group-has-[data-collapsible=icon]/sidebar-wrapper:${LAYOUT_CONSTANTS.HEADER_HEIGHT_COLLAPSED}`,
  ),
  INNER: `flex items-center gap-2 px-4`,
} as const;

export function BreadCrumbsContainer({ children }: ChildrenProps) {
  return (
    <header role="banner" className={HEADER_CLASSES.CONTAINER}>
      <div className={HEADER_CLASSES.INNER}>
        <SidebarTrigger className="ml-1" aria-label="Open Sidebar" />
        <Separator
          aria-hidden="true"
          orientation="vertical"
          className={`mr-2 ${LAYOUT_CONSTANTS.SEPARATOR_HEIGHT}`}
        />
        <nav aria-label="Breadcrumb navigation">{children}</nav>
      </div>
    </header>
  );
}
