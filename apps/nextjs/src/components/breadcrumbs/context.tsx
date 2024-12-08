"use client";

import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import type { ChildrenProps } from "~/types";

export interface BreadCrumbsContext {
  breadCrumbs: string[];
  setBreadCrumbs: Dispatch<SetStateAction<string[]>>;
}
export const BreadCrumbsContext = createContext<BreadCrumbsContext>({
  breadCrumbs: [],
  setBreadCrumbs: () => {
    throw new Error("setBreadCrumbs function must be overridden");
  },
});

export function useBreadCrumbs() {
  const context = useContext(BreadCrumbsContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error("useBreadCrumbs must be used within a BreadCrumbsProvider");
  }

  return context;
}

export function BreadCrumbsProvider({ children }: ChildrenProps) {
  const [breadCrumbs, setBreadCrumbs] = useState<string[]>([]);

  return (
    <BreadCrumbsContext value={{ breadCrumbs, setBreadCrumbs }}>
      {children}
    </BreadCrumbsContext>
  );
}
