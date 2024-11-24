"use client";

import { useUser, Waitlist } from "@clerk/nextjs";

export default function WaitlistPage() {
  const { user } = useUser();

  if (user) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">Welcome, {user.firstName}! 👋</h2>
        <p>You're already signed in and don't need to join the waitlist.</p>
      </div>
    );
  }
  return <Waitlist />;
}
