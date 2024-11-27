import { DashboardContentBody } from "../../_components/dashboard-content-body";
import { DashboardContentSection } from "../../_components/dashboard-content-top-section";

interface LayoutProps {
  children: React.ReactNode;
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export default function Content({
  children,
  left,
  center,
  right,
}: LayoutProps) {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DashboardContentSection>{left}</DashboardContentSection>
        <DashboardContentSection>{center}</DashboardContentSection>
        <DashboardContentSection>{right}</DashboardContentSection>
      </div>

      <DashboardContentBody>{children}</DashboardContentBody>
    </>
  );
}
