import { createContext, useContext, useState } from "react";
import type { ChildrenProps } from "~/types";

export interface BreadCrumbsContext {
  breadCrumbs: string[];
  setBreadCrumbs: (breadCrumbs: string[]) => void;
}
export const BreadCrumbsContext = createContext<BreadCrumbsContext>({
  breadCrumbs: [],
  setBreadCrumbs: () => null,
});


export function useBreadCrumbs() {
  const context = useContext(BreadCrumbsContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (context === undefined) {
    throw new Error("useBreadCrumbs must be used within a BreadCrumbsProvider");
  }

  return context;
}

export function BreadCrumbsProvider({ children }: ChildrenProps) {
  const [breadCrumbs, setBreadCrumbs] = useState<string[]>([]);

  return (
    <BreadCrumbsContext.Provider value={{ breadCrumbs, setBreadCrumbs }}>
      {children}
    </BreadCrumbsContext.Provider>
  );
}
