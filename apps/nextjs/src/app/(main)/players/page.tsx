import type { Metadata } from "next";

import ComingSoon from "~/components/coming-soon";

export const metadata: Metadata = {
  title: "Player Profiles",
};

export default function PlayerProfilesPage() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col" >
      <ComingSoon title="Player Profiles" />
    </div>
  );
}
