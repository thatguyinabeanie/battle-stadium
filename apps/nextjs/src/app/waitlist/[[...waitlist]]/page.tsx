"use client";

import { useUser, Waitlist } from "@clerk/nextjs";

export default function WaitlistPage() {
  const { user } = useUser();

  if (user) {
    return <div>You are signed in.. </div>;
  }

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <Waitlist />
    </div>
  );
}
