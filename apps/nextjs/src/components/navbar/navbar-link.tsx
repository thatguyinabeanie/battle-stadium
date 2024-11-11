"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

const getClassName = (pathname: string, value: string) =>
  cn(
    "rounded-md px-1 py-2 text-sm font-medium transition-colors",
    pathname.includes(`/${value}`)
      ? "bg-primary/10 text-primary"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
  );

type HREF = `/${string}`;
interface NavbarLinkProps {
  href: HREF;
  value: string;
  label: string;
  className?: string;
}

export default function NavbarLink({
  value,
  href,
  label,
  className,
}: Readonly<NavbarLinkProps>) {
  const pathname = usePathname();
  return (
    <Link
      prefetch={true}
      key={value}
      href={href}
      className={`${getClassName(pathname, value)} ${className}`}
    >
      {label}
    </Link>
  );
}
