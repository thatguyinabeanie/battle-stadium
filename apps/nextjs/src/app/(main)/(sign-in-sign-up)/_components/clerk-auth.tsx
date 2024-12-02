"use client";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";

interface ClerkAuthProps {
  type: "sign-in" | "sign-up";
}

export function ClerkAuth({ type }: ClerkAuthProps) {
  const { user } = useUser();

  if (user) {
    return <div>You are signed in.. </div>;
  }

  if (type === "sign-in") {
    return <SignIn />;
  }

  return <SignUp />;
}
