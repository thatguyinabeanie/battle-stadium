// import { Suspense } from "react";

// import { getProfiles } from "~/app/server-actions/profiles/actions";
import ComingSoon from "~/components/coming-soon";

// interface PlayerProfilePageProps {
//   params: Promise<{
//     username: string;
//   }>;
// }

// export async function generateStaticParams() {
//   const profiles = await getProfiles();

//   return profiles.map((profile) => ({ username: profile.username }));
// }

// export default async function PlayerProfilePageSuspenseWrapper(
//   props: Readonly<PlayerProfilePageProps>,
// ) {
//   const params = await props.params;
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <PlayerProfile username={params.username} />
//     </Suspense>
//   );
// }

// function PlayerProfile({ username }: { username: string }) {
//   return (
//     <ComingSoon title={username}>
//       <h2>The Player Profiles are under construction</h2>
//     </ComingSoon>
//   );
// }


export default function PlayersPage() {
  return (
    <ComingSoon title={"Player Profiles"}>
      <div className="flex flex-col items-center">
        <h2>Player profiles are under construction</h2>
      </div>
    </ComingSoon>
  );
}
