import type { Metadata } from "next";

import ComingSoon from "~/app/components/coming-soon";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function PlayersPage() {
  return (
    <ComingSoon title={"Analytics"}>
      <div className="flex flex-col items-center">
        <h2>Analytics is under construction</h2>
      </div>
    </ComingSoon>
  );
}
