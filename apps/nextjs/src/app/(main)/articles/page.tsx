import type { Metadata } from "next";

import ComingSoon from "~/components/coming-soon";

export const metadata: Metadata = {
  title: "Articles",
};

export default function ArticlesPage() {
  return <ComingSoon title="Articles" />;
}
