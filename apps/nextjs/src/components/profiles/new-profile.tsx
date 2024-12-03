"use client";

import { useRouter } from "next/navigation";

import { Button, Input } from "@battle-stadium/ui";

interface NewProfileProps {
  createProfileAction: (formData: FormData) => Promise<void>;
}
export default function NewProfile(props: NewProfileProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      await props.createProfileAction(formData);
      router.push("/dashboard?tab=profiles");
    } catch (error: unknown) {
      console.error("Failed to create profile:", error);
    }
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
