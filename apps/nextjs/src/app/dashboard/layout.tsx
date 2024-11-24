import type { DashboardLayoutSlots } from "~/types";

export default function DashboardLayout(slots: Readonly<DashboardLayoutSlots>) {
  return <>{slots.organizations}</>;
}
