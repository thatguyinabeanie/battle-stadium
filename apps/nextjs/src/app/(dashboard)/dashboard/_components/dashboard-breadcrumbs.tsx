import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@battle-stadium/ui/breadcrumb";

interface BreadcrumbsProps {
  items?: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumbs({
  items = defaultItems,
}: BreadcrumbsProps) {
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

const defaultItems = [
  { label: "Battle Stadium", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
];
