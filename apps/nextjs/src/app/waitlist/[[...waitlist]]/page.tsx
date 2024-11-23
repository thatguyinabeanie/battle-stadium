"use client";

import { useUser, Waitlist } from "@clerk/nextjs";

export default function WaitlistPage() {
  const { user } = useUser();

  if (user) {
    return <div>You are signed in.. </div>;
  }
  return <Waitlist />;
}
