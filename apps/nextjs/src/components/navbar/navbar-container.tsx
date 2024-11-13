"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@battle-stadium/ui";

interface NavbarContainerProps {
  children: React.ReactNode;
}

export default function NavbarContainer({
  children,
}: Readonly<NavbarContainerProps>) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
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
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "sticky top-0 z-40 w-full transform bg-transparent backdrop-blur-2xl transition-transform duration-300",
        !isVisible && "-translate-y-full",
      )}
    >
      {children}
    </div>
  );
}
