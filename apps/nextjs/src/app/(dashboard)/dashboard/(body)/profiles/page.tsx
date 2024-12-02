import { auth } from "@clerk/nextjs/server";

import { getProfiles } from "~/app/server-actions/profiles/actions";
import NewProfile from "~/components/profiles/new-profile";

export default async function Profiles() {
  const { userId } = await auth();
  const profiles = await getProfiles(userId);

  return (
    <div>
      <NewProfile />
      {profiles.map((profile) => (
        <div key={profile.id}>
          <h3>{profile.username}</h3>
        </div>
      ))}
    </div>
  );
}
