import type { Metadata } from "next";

import ComingSoon from "~/components/coming-soon";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function AnalyticsPage() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col" >
      <ComingSoon title="Analytics" />
    </div>
  );
}
