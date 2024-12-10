import type { ChildrenProps } from "~/types";

export function DashboardContentSection({ children }: ChildrenProps) {
  return (
    <div className="aspect-video rounded-xl bg-neutral-950" aria-hidden="true">
      {children}
    </div>
  );
}
