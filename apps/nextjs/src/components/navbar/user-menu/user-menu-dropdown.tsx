"use client";

import { SignInButton, SignOutButton } from "@clerk/nextjs";

import { cn } from "~/lib/utils";
import type {components} from "~/lib/api/openapi-v1";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@battle-stadium/ui/dropdown-menu";
import Link from "next/link";

interface UserMenuDropDownProps {
  me?: components["schemas"]["AccountMe"];
  isSignedIn: boolean;
}

export default function UserMenuDropDown ({
  me,
  isSignedIn,
}: Readonly<UserMenuDropDownProps>) {
  return (
    <DropdownMenu aria-label="Profile Actions">
      <DropdownMenuContent>
        <DropdownMenuItem
          key="profile"
          aria-label="dashboard"
          className={ cn("hidden", { "sm:flex": me && isSignedIn }) }
          color="primary"
        >
          <Link aria-label="dashboard" href="/dashboard">
            <span>
              <p className="text-default-400 font-normal">Signed in as</p>
              <p className="truncate font-semibold">{ `${me?.first_name} ${me?.last_name}` }</p>{ " " }
            </span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          key="sign-in"
          aria-label="sign-in"
          className={ cn("", {
            hidden: isSignedIn,
          }) }
          color="success"
        >
          <SignInButton>
            <p className="font-semibold">Sign In</p>
          </SignInButton>
        </DropdownMenuItem>

        <DropdownMenuItem
          key="admin"
          aria-label="Admin"
          className={ cn("", {
            hidden: !(me && isSignedIn) || !me.admin,
          }) }
        >
          <Link href="/dashboard?tab=admin">Admin</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          key="settings"
          aria-label="Settings"
          className={ cn("", {
            hidden: !(me && isSignedIn),
          }) }
        >
          <Link href="/dashboard?tab=settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuItem key="help_and_feedback">
          Help & Feedback
        </DropdownMenuItem>

        <DropdownMenuItem
          key="logout"
          aria-label="Sign Out"
          className={ cn("", {
            hidden: !(me && isSignedIn),
          }) }
          color="danger"
        >
          <SignOutButton>Sign out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
