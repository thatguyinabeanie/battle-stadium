import type { Metadata } from "next";

import { title } from "~/components/miscellaneous/primitives";
import PartneredOrganizations from "~/components/organizations/partnered-organizations";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "battlestadium.gg",
};

export default function Home() {
  return (
    <HydrateClient>
      <div className="min--h-screen flex flex-col items-center justify-between">
        <div className="mt-8 md:mt-20">
          <PartneredOrganizations />
        </div>
        <div className="flex w-full max-w-fit flex-col items-center justify-center bg-transparent pt-10 text-center">
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
      </div>
    </HydrateClient>
  );
}

// export default function HomePage () {
//   return (
//     <HydrateClient>
//       <main className="container h-screen py-16">
//         <div className="flex flex-col items-center justify-center gap-4">
//           <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//             Create <span className="text-primary">T3</span> Turbo
//           </h1>
//         </div>
//       </main>
//     </HydrateClient>
//   );
// }
