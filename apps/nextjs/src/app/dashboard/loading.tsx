import { DashboardContentSection } from "./_components/dashboard-content-section";

export default function Loading() {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DashboardContentSection />
        <DashboardContentSection />
        <DashboardContentSection />
      </div>
      <section className="min-h-[100vh] flex-1 animate-pulse rounded-xl bg-neutral-900/50 md:min-h-min" />
      <div className="sr-only" aria-live="polite">
        Loading dashboard content, please wait...
      </div>
    </>
  );
}
