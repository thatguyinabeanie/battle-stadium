"use client";

import Link from "next/link";
import { SignInButton, SignOutButton } from "@clerk/nextjs";

import type { accounts } from "@battle-stadium/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@battle-stadium/ui";

import { cn } from "~/lib/utils";

interface UserMenuDropDownProps {
  me?: typeof accounts.$inferSelect | null;
  isSignedIn: boolean;
}

export default function UserMenuDropDown({
  me,
  isSignedIn,
}: Readonly<UserMenuDropDownProps>) {
  return (
    <DropdownMenu aria-label="Profile Actions">
      <DropdownMenuContent>
        <DropdownMenuItem
          key="profile"
          aria-label="dashboard"
          className={cn("hidden", { "sm:flex": me && isSignedIn })}
          color="primary"
        >
          <Link prefetch={true} aria-label="dashboard" href="/dashboard">
            <span>
              <p className="text-default-400 font-normal">Signed in as</p>
              <p className="truncate font-semibold">{`${me?.firstName} ${me?.lastName}`}</p>{" "}
            </span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          key="sign-in"
          aria-label="sign-in"
          className={cn("", {
            hidden: isSignedIn,
          })}
          color="success"
        >
          <SignInButton>
            <p className="font-semibold">Sign In</p>
          </SignInButton>
        </DropdownMenuItem>

        <DropdownMenuItem
          key="admin"
          aria-label="Admin"
          className={cn("", {
            hidden: !(me && isSignedIn) || !me.admin,
          })}
        >
          <Link prefetch={true} href="/dashboard?tab=admin">
            Admin
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          key="settings"
          aria-label="Settings"
          className={cn("", {
            hidden: !(me && isSignedIn),
          })}
        >
          <Link prefetch={true} href="/dashboard?tab=settings">
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem key="help_and_feedback">
          Help & Feedback
        </DropdownMenuItem>

        <DropdownMenuItem
          key="logout"
          aria-label="Sign Out"
          className={cn("", {
            hidden: !(me && isSignedIn),
          })}
          color="danger"
        >
          <SignOutButton>Sign out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
