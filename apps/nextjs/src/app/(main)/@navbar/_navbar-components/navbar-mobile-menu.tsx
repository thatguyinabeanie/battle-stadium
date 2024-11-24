"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
  Button,
  cn,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@battle-stadium/ui";

import { NavbarItemsConfigs } from "~/lib/config/site";

export default function MobileMenu() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[240px] sm:w-[300px]">
          <div className="mt-6 flex flex-col space-y-4">
            {NavbarItemsConfigs.map(({ label, value }) => (
              <Link
                prefetch={true}
                key={value}
                href={`/${value}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === `/${value}`
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
