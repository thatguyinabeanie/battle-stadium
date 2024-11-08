import React from "react";
import Link from "next/link";
import { Button } from "@battle-stadium/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@battle-stadium/ui/popover";
import { Badge } from "@battle-stadium/ui/badge";
import { Icon } from "@iconify/react/dist/iconify.js";
import UserMenu from "./user-menu/user-menu";
import { auth } from "@clerk/nextjs/server";
import { getAccountMe } from "~/app/server-actions/accounts/actions";

export default async function RightMenu () {
  const clerkAuth = await auth();
  const me = (await getAccountMe())?.data;

  return (
    <div>
      <Button>
        <Icon
          className="text-default-500"
          icon="solar:magnifer-linear"
          width={ 22 }
        />
      </Button>

      <Link passHref href="/dashboard?tab=settings">
        <Button>
          <Icon
            className="text-default-500"
            icon="solar:settings-linear"
            width={ 24 }
          />
        </Button>

        <Popover>
          <PopoverTrigger>
            <Badge color="danger" content="5">
              <Icon
                className="text-default-500"
                icon="solar:bell-linear"
                width={ 22 }
              />
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="max-w-[90vw] p-0 sm:max-w-[380px]">
            <p className="text-default-500 py-4 text-center">
              See all notifications
            </p>
          </PopoverContent>
        </Popover>

        <UserMenu isSignedIn={ !!clerkAuth.sessionId } me={ me } />
      </Link>
    </div>
  );
}
