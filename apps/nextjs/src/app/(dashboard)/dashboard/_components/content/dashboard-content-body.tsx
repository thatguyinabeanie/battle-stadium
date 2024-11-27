import type { ChildrenProps } from "~/types";

export function DashboardContentBody({ children }: ChildrenProps) {
  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-neutral-900/50 md:min-h-min">
      {children}
    </div>
  );
}
