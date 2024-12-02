import { auth } from "@clerk/nextjs/server";
import { getVercelOidcToken } from "@vercel/functions/oidc";

import { createProfile, getProfiles } from "~/app/server-actions/profiles/actions";
import NewProfile from "~/components/profiles/new-profile";
import type { Tokens } from "~/types";

export default async function Profiles() {
  const session = await auth();
  const tokens:Tokens = {
    oidc: await getVercelOidcToken(),
    clerk: await session.getToken()
  };
  const profiles = await getProfiles(session.userId, tokens);

  async function createProfileAction (formData: FormData) {
    await createProfile(formData.get("profile") as string, tokens);
  }

  return (
    <div>
      <NewProfile createProfileAction={createProfileAction}/>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <h3>{profile.username}</h3>
        </div>
      ))}
    </div>
  );
}

