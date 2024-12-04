import type { Metadata } from "next";

import ComingSoon from "~/components/coming-soon";

export const metadata: Metadata = {
  title: "Player Profiles",
};

export default function PlayerProfilesPage() {
  return <ComingSoon title="Player Profiles" />;
}
