import { DashboardContentBody } from "~/app/(dashboard)/dashboard/_components/content/dashboard-content-body";
// import { DashboardContentSection } from "~/app/(dashboard)/dashboard/_components/content/dashboard-content-top-section";

interface LayoutProps {
  children: React.ReactNode;
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export default function SharedLayout ({
  children,
  // left,
  // center,
  // right,
}: LayoutProps) {
  return (
    <section
      role="status"
      aria-label="Loading dashboard content"
      className="flex flex-1 flex-col gap-4 p-4"
    >
      {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DashboardContentSection>{ left }</DashboardContentSection>
        <DashboardContentSection>{ center }</DashboardContentSection>
        <DashboardContentSection>{ right }</DashboardContentSection>
      </div> */}

      <DashboardContentBody>{ children }</DashboardContentBody>
    </section>
  );
}
