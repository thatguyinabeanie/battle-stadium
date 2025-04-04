"use client";

import type { ComponentPropsWithoutRef, ComponentRef } from "react";
import React, { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@battle-stadium/ui";

type HREF = `/${string}`;

interface NavbarLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  href: HREF;
  value: string;
  label: string;
  className?: string;
}

export const NavbarLink = forwardRef<
  ComponentRef<typeof Link>,
  NavbarLinkProps
>(({ value, href, className, label, ...props }, ref) => (
  <Link
    prefetch={true}
    key={value}
    ref={ref}
    href={href}
    className={cn(usePathClassName(href), className)}
    {...props}
  >
    {label}
  </Link>
));

NavbarLink.displayName = "NavbarLink";

const BASE_CLASSNAMES =
  "rounded-md px-1 py-2 font-medium transition-colors text-lg";
const ACTIVE_CLASSNAMES = "bg-primary/10 text-primary";
const INACTIVE_CLASSNAMES =
  "text-muted-foreground hover:bg-accent hover:text-accent-foreground";
function usePathClassName(href: `/${string}`) {
  const pathname = usePathname();

  return cn(BASE_CLASSNAMES, {
    [ACTIVE_CLASSNAMES]: pathname === href,
    [INACTIVE_CLASSNAMES]: pathname !== href,
  });
}
export default NavbarLink;
