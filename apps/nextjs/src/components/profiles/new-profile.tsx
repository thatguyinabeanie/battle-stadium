"use client";

import { useRouter } from "next/navigation";

import { Button, Input } from "@battle-stadium/ui";

import { createProfile } from "~/app/server-actions/profiles/actions";

export default function NewProfile() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await createProfile(formData.get("profile") as string);
    router.push("/dashboard?tab=profiles");
  };

  return (
    <form action={handleSubmit} className="flex flex-row">
      <Input name="profile" placeholder="new profile" />
      <Button color="primary" type="submit">
        Add Profile
      </Button>
    </form>
  );
}
