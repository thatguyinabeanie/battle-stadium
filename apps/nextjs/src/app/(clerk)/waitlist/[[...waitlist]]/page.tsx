"use client";

import Link from "next/link";
import { useUser, Waitlist } from "@clerk/nextjs";

export default function WaitlistPage() {
  const { user } = useUser();

  if (user) {
    return (
      <div className="flex h-full min-h-screen w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome, {user.firstName}!</h2>
          <p className="mt-2">
            You're already signed up. Ready to get started?
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <Waitlist />
    </div>
  );
}
