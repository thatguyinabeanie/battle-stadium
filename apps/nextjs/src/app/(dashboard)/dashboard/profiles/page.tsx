import NewProfile from "~/app/components/profiles/new-profile";
import { getProfilesMe } from "~/app/server-actions/profiles/actions";

export default async function Profiles() {
  const profiles = await getProfilesMe();

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
