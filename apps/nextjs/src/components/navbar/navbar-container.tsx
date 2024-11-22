"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@battle-stadium/ui";

interface NavbarContainerProps {
  children: React.ReactNode;
  disableHide?: boolean; // Optional prop
}

export default function NavbarContainer({
  children,
  disableHide = false,
}: Readonly<NavbarContainerProps>) {

  const { isVisible } = useNavbarVisibility(disableHide);

  return (
    <div
      className={cn(
        "sticky top-0 z-40 w-full transform backdrop-blur-3xl transition-transform duration-300",
        !isVisible && "-translate-y-full",
      )}
    >
      {children}
    </div>
  );
}

function useNavbarVisibility (disableHide: boolean) {
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
