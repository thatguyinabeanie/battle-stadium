import type { Metadata } from "next";

import { title } from "~/components/miscellaneous/primitives";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home () {
  return (
    <HydrateClient>
      <div className="min--h-screen flex flex-col items-center justify-between">
        <div className="mt-8 md:mt-20">
          <PartneredOrganizations />
        </div>
        <div className="flex w-full max-w-fit flex-col items-center justify-center bg-transparent pt-10 text-center">
          <h1 className={ title({ color: "violet", size: "xl" }) }>
            battlestadium.gg
          </h1>
          <h2 className={ `${title({ size: "xs" })} pt-2` }>
            a next-gen tournament website
          </h2>
          <div className="flex flex-col justify-items-center">
            <h2 className={ `${title({ size: "xxs" })} pt-1` }>
              beautiful, fast, modern
            </h2>
            <h2 className={ `${title({ color: "violet", size: "xs" })} pt-4` }>
              Coming Soon
            </h2>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
