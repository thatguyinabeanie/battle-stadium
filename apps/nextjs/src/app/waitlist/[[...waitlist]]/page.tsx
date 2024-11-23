"use client";

import { Waitlist } from '@clerk/nextjs'
import { useUser } from "@clerk/nextjs";

export default function WaitlistPage () {
  const { user } = useUser();

  if (user) {
    return <div>You are signed in.. </div>;
  }
  return <Waitlist />;
}
