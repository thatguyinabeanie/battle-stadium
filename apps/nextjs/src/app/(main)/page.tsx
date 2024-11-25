import type { Metadata } from "next";
import { Suspense } from "react";

import { title } from "~/components/miscellaneous/primitives";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";

export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home() {
  return (
    <>
      <div className="min--h-screen flex flex-col items-center justify-between">
        <PartneredOrganizations />

        <Suspense fallback={<FrontPageTextSkeleton />}>
          <FrontPageText />
        </Suspense>
      </div>
    </>
  );
}

function FrontPageText() {
  return (
    <div className="flex w-full max-w-fit flex-col items-center justify-center bg-transparent text-center">
      <h1 className={title({ color: "violet", size: "xl" })}>
        battlestadium.gg
      </h1>
      <h2 className={`${title({ size: "xs" })} pt-2`}>
        a next-gen tournament website
      </h2>
      <div className="flex flex-col justify-items-center">
        <h2 className={`${title({ size: "xxs" })} pt-1`}>
          beautiful, fast, modern
        </h2>
        <h2 className={`${title({ color: "violet", size: "xs" })} pt-4`}>
          Coming Soon
        </h2>
      </div>
    </div>
  );
}

function FrontPageTextSkeleton() {
  return (
    <div className="flex w-full max-w-fit animate-pulse flex-col items-center justify-center bg-transparent text-center">
      <div className="h-8 w-48 rounded bg-gray-300"></div>
      <div className="mt-2 h-6 w-32 rounded bg-gray-300"></div>
      <div className="mt-2 flex flex-col justify-items-center">
        <div className="mt-1 h-4 w-24 rounded bg-gray-300"></div>
        <div className="mt-4 h-6 w-32 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
