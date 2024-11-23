"use client";

import { SignUp, useUser } from "@clerk/nextjs";

export default function SignUpComponent () {
  const { user } = useUser();

  if (user) {
    return <div>You are signed in.. </div>;
  }

  return <SignUp />;
}
