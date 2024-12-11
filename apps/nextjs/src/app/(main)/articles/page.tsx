import type { Metadata } from "next";

import ComingSoon from "~/components/coming-soon";
import { PageSection } from "~/components/page-section";

export const metadata: Metadata = {
  title: "Articles",
};

export default function ArticlesPage() {
  return (
    <PageSection label="Articles">
      <ComingSoon title="Articles" />
    </PageSection>
  );
}
