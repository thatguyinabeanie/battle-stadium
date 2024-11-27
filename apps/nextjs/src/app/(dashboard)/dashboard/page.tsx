import { DashboardContentBody } from "./_components/dashboard-content-body";
import { DashboardContentSection } from "./_components/dashboard-content-top-section";

export default function DashboardProfiles() {
  return (
    <section
      role="status"
      aria-label="Loading dashboard content"
      className="flex flex-1 flex-col gap-4 p-4"
    >
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DashboardContentSection>Hello</DashboardContentSection>
        <DashboardContentSection>World</DashboardContentSection>
        <DashboardContentSection>Good Morning</DashboardContentSection>
      </div>

      <DashboardContentBody />
    </section>
  );
}
