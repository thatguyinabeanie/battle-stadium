"use client";
import { useRouter } from "next/navigation";

import React from "react";
import { Button, Input } from "../nextui-use-client";
import { createProfile } from "@/app/server-actions/profiles/actions";
import { AccountMe } from "@/lib/api";

interface CreateNewProfileProps {
  me: AccountMe;
}

export default function CreateNewProfile({ me }: Readonly<CreateNewProfileProps>) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await createProfile(formData.get("profile") as string, me.id);
    router.push("/dashboard?tab=profiles");
  };

  return (
    <form action={handleSubmit}>
      <div className="flex flex-row gap-4 justify-center items-center m-2">
        <Input
          className="w-1/2"
          label="Email"
          name="profile"
          placeholder="Enter a profile username"
          type="text"
          variant="underlined"
        />

        <Button color="primary" type="submit">
          Add Profile
        </Button>
      </div>
    </form>
  );
}
