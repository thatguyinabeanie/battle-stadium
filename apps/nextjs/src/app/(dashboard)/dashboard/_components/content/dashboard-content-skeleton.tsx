import { DashboardContentSection } from "./dashboard-content-top-section";

export default function DashboardContentSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading dashboard content"
      className="flex flex-1 flex-col gap-4 p-4"
    >
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DashboardContentSection />
        <DashboardContentSection />
        <DashboardContentSection />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-neutral-900/50 md:min-h-min" />
      <span className="sr-only">Loading dashboard content, please wait...</span>
    </section>
  );
}
