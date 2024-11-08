"use client";
import { useRouter } from "next/navigation";

import { createProfile } from "~/app/server-actions/profiles/actions";
import type { AccountMe } from "~/lib/api";

import { Input } from "@battle-stadium/ui/input";
import { Button } from "@battle-stadium/ui/button";

interface NewProfileProps {
  me: AccountMe;
}

export default function NewProfile ({ me }: Readonly<NewProfileProps>) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await createProfile(formData.get("profile") as string, me.id);
    router.push("/dashboard?tab=profiles");
  };

  return (
    <form action={ handleSubmit } className="flex flex-row">
      <Input name="profile" placeholder="new profile" />
      <Button color="primary" type="submit">
        Add Profile
      </Button>
    </form>
  );
}
