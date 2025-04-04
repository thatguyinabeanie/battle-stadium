import type { Metadata } from "next";

import { title } from "~/components/miscellaneous/primitives";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";
import { env } from "~/env";
import AdBanner from "../../components/google-adsense/ad-banner";

export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home() {
  return (
    <>
      <section
        aria-label="Partner Organizations"
        className="z-0 m-4 mt-0 flex h-full w-full flex-col items-center gap-4 rounded-xl bg-neutral-950"
      >
        <PartneredOrganizations />
      </section>

      <section
        aria-label="Front Page Text"
        className="z-0 m-4 mt-0 flex h-svh w-full flex-col items-center gap-4 rounded-xl bg-neutral-950"
      >
        <FrontPageText />
      </section>
    </>
  );
}

function FrontPageText() {
  return (
    <div className="flex w-full max-w-fit flex-col items-center justify-center p-8 text-center">
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

      {env.SHOW_ADS && (
        <AdBanner
          data-ad-slot="slotnumber"
          data-full-width-responsive="true"
          data-ad-layout="in-article"
          data-ad-format="fluid"
        />
      )}
    </div>
  );
}

// function FrontPageTextSkeleton() {
//   return (
//     <div className="flex w-full max-w-fit animate-pulse flex-col items-center justify-center bg-transparent text-center">
//       <div className="h-8 w-48 rounded bg-gray-300"></div>
//       <div className="mt-2 h-6 w-32 rounded bg-gray-300"></div>
//       <div className="mt-2 flex flex-col justify-items-center">
//         <div className="mt-1 h-4 w-24 rounded bg-gray-300"></div>
//         <div className="mt-4 h-6 w-32 rounded bg-gray-300"></div>
//       </div>
//     </div>
//   );
// }
