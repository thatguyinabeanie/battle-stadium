"use client";

import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

import { cn } from "@battle-stadium/ui";

interface NavbarContainerProps {
  children: ReactNode;
  disableHide?: boolean; // Optional prop
  className?: string; // Optional prop
}

export default function NavbarContainer({
  children,
  disableHide = false,
  className,
}: Readonly<NavbarContainerProps>) {
  const { isVisible } = useNavbarVisibility(disableHide);

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 flex h-24 w-full transform transition-transform duration-300",
        !isVisible && "-translate-y-full",
        className,
      )}
    >
      {children}
    </nav>
  );
}

function useNavbarVisibility(disableHide: boolean) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (disableHide) {
        setIsVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;

      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY, disableHide]);

  return { isVisible };
}
