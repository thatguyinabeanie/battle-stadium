import React from "react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Button } from "@battle-stadium/ui";

import { getAccountMe } from "~/app/server-actions/accounts/actions";
import UserMenu from "./user-menu/user-menu";

export default async function RightMenu() {
  const clerkAuth = await auth();
  const me = (await getAccountMe())?.data;

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Button>
        <Icon
          className="text-default-500"
          icon="solar:magnifer-linear"
          width={22}
        />
      </Button>

      <Link prefetch={true} passHref href="/dashboard?tab=settings">
        <Button>
          <Icon
            className="text-default-500"
            icon="solar:settings-linear"
            width={24}
          />
        </Button>
      </Link>

      <UserMenu isSignedIn={!!clerkAuth.sessionId} me={me} />
    </div>
  );
}
