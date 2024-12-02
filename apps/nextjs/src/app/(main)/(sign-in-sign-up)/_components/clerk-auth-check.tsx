"use client";
import { useUser } from "@clerk/nextjs";
import type { ChildrenProps } from "~/types";

export function ClerkAuthCheck ({ children }: ChildrenProps) {
  const { user } = useUser();

  if (user) {
    return <div>You are signed in.. </div>;
  }

  return (
    <>
      {children}
    </>
  );
}
