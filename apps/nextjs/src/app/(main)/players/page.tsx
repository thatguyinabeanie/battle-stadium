import type { Metadata } from "next";

import ComingSoon from "~/components/coming-soon";

export const metadata: Metadata = {
  title: "Player Profiles",
};

export default function PlayerProfilesPage() {
  return (
    <section
      aria-label="Player Profiles Content"
      className="z-0 m-4 mt-0 flex h-full w-full flex-col items-center gap-4 rounded-xl bg-neutral-950"
    >
      <ComingSoon title="Player Profiles" />
    </section>
  );
}
