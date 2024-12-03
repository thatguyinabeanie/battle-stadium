// import { Suspense } from "react";

import { db } from "@battle-stadium/db";

import { getProfile } from "~/app/server-actions/profiles/actions";
import ComingSoon from "~/components/coming-soon";

interface ProfilePageProps {
  username: string;
}

interface PlayerProfilePageParams {
  params: Promise<ProfilePageProps>;
}

export async function generateStaticParams() {
  return (await db.query.profiles.findMany()).map(({ username }) => ({
    username,
  }));
}

export default async function PlayerProfilePage(
  {params}: Readonly<PlayerProfilePageParams>,
) {
  const { username } = await params;
  const profile = await getProfile(username);

  return (
    // <Suspense fallback={null}>
      // <PlayerProfileParamsUnwrap params={ params } />
    // </Suspense>
    // <PlayerProfileParamsUnwrap params={ params } />

    <>
      <ComingSoon title={ `${profile?.username}'s Profile` }>
        <h2>The Player Profiles are under construction</h2>
      </ComingSoon>
      </>
  );
}

// async function PlayerProfileParamsUnwrap({ params }: PlayerProfilePageParams) {
//   const { username } = await params;
//   return <PlayerProfileCached username={username} />;
// }

// async function PlayerProfileCached({ username }: ProfilePageProps) {

//   const profile = await getProfile(username);
//   return (
//     <ComingSoon title={`${profile?.username}'s Profile`}>
//       <h2>The Player Profiles are under construction</h2>
//     </ComingSoon>
//   );
// }
