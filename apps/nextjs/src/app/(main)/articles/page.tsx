import type { Metadata } from "next";

import ComingSoon from "~/components/coming-soon";

export const metadata: Metadata = {
  title: "Articles",
};

export default function ArticlesPage() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <ComingSoon title="Articles" />
    </div>
  );
}
