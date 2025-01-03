"use client";

import Link from "next/link";
import { SignInButton, SignOutButton } from "@clerk/nextjs";

import { cn, DropdownMenuContent, DropdownMenuItem } from "@battle-stadium/ui";

interface UserMenuDropDownProps {
  isSignedIn: boolean;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export default function UserMenuDropDown({
  isSignedIn,
  firstName,
  lastName,
  isAdmin,
}: Readonly<UserMenuDropDownProps>) {
  return (
    <DropdownMenuContent className="bg-background">
      <DropdownMenuItem
        key="profile"
        aria-label="dashboard"
        className={cn("hidden", { "sm:flex": isSignedIn })}
        color="primary"
      >
        <Link prefetch={true} aria-label="dashboard" href="/dashboard">
          <span>
            <p className="text-default-400 font-normal">Signed in as</p>
            <p className="truncate font-semibold">
              {[firstName, lastName].filter(Boolean).join(" ") ||
                "Anonymous User"}
            </p>
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
          hidden: !isSignedIn || !isAdmin,
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
          hidden: !isSignedIn,
        })}
      >
        <Link prefetch={true} href="/dashboard?tab=settings">
          Settings
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem key="help_and_feedback">
        <Link href="/help" prefetch={true}>
          Help & Feedback
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem
        key="logout"
        aria-label="Sign Out"
        className={cn("", {
          hidden: !isSignedIn,
        })}
        color="danger"
      >
        <SignOutButton>Sign out</SignOutButton>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
