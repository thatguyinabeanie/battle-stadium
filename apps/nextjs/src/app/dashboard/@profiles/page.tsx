import { getAccountMe } from "~/app/server-actions/accounts/actions";
import { getProfilesByAccountId } from "~/app/server-actions/profiles/actions";
import NewProfile from "~/components/profiles/new-profile";

export default async function Profiles() {
  const me = (await getAccountMe())?.data;

  if (!me) {
    return null;
  }

  const profiles = await getProfilesByAccountId(me.id);

  return (
    <div>
      <NewProfile me={me} />
      {profiles.map((profile) => (
        <div key={profile.id}>
          <h3>{profile.username}</h3>
        </div>
      ))}
    </div>
  );
}
