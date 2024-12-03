import { auth } from "@clerk/nextjs/server";
import { getVercelOidcToken } from "@vercel/functions/oidc";

import type { Tokens } from "~/types";
import {
  createProfile,
  getProfilesByClerkUserId,
} from "~/app/server-actions/profiles/actions";
import NewProfile from "~/components/profiles/new-profile";

export default function ProfilesPage() {
  return <Profiles />;
}

async function Profiles() {
  const session = await auth();

  if (!session.userId) {
    return null;
  }

  const tokens: Tokens = {
    oidc: await getVercelOidcToken(),
    clerk: await session.getToken(),
  };

  return <ProfilesCached userId={session.userId} tokens={tokens} />;
}

async function ProfilesCached({
  userId,
  tokens,
}: {
  userId: string;
  tokens: Tokens;
}) {
  // "use cache";

  const profiles = await getProfilesByClerkUserId(userId, tokens);

  async function createProfileAction(formData: FormData) {
    "use server";
    await createProfile(formData.get("profile") as string, tokens);
  }

  return (
    <div>
      <NewProfile createProfileAction={createProfileAction} />
      {profiles.map((profile) => (
        <div key={profile.id}>
          <h3>{profile.username}</h3>
        </div>
      ))}
    </div>
  );
}
