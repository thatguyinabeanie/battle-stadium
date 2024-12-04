import { Fragment, Suspense } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@battle-stadium/ui/breadcrumb";
import { Separator } from "@battle-stadium/ui/separator";
import { SidebarTrigger } from "@battle-stadium/ui/sidebar";

const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: "h-16",
  HEADER_HEIGHT_COLLAPSED: "h-12",
  SEPARATOR_HEIGHT: "h-4",
} as const;

export default function DashboardBreadcrumbHeader() {
  return (
    <header
      className={ `flex ${LAYOUT_CONSTANTS.HEADER_HEIGHT} shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[data-collapsible=icon]/sidebar-wrapper:${LAYOUT_CONSTANTS.HEADER_HEIGHT_COLLAPSED} border-none bg-neutral-900/50 rounded-xl mt-4 mr-4`}
    >
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="ml-1" aria-label="Open Sidebar" />
        <Separator
          orientation="vertical"
          className={`mr-2 ${LAYOUT_CONSTANTS.SEPARATOR_HEIGHT}`}
        />
        <Suspense fallback={null}>
          <Breadcrumbs />
        </Suspense>
      </div>
    </header>
  );
}

interface BreadcrumbsProps {
  items?: {
    label: string;
    href?: string;
  }[];
}

const defaultItems = [
  { label: "Battle Stadium", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
];

function Breadcrumbs({ items = defaultItems }: BreadcrumbsProps) {
  return (
    <Breadcrumb aria-label="Navigation breadcrumbs">
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            <BreadcrumbItem
              className={index === 0 ? "hidden md:block" : undefined}
            >
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator
                className={index === 0 ? "hidden md:block" : undefined}
              />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
