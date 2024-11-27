import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";

import { Avatar, AvatarFallback, AvatarImage } from "@battle-stadium/ui";

import { getAccountMe } from "~/app/server-actions/accounts/actions";
import { SolarUserLinear } from "~/components/svg/icons";

export function SidebarNavUserDetailsAndAvatarSuspense() {
  return (
    <Suspense fallback={<SidebarNavUserDetailsAndAvatarSkeleton />}>
      <SidebarNavUserDetailsAndAvatar />
    </Suspense>
  );
}

const DEFAULT_AVATAR = "/images/solar-user-linear.svg";
async function SidebarNavUserDetailsAndAvatar() {
  const me = await getAccountMe();
  const user = await currentUser();
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={user?.imageUrl ?? me?.image_url ?? DEFAULT_AVATAR}
          alt={me?.first_name}
        />

        <AvatarFallback className="rounded-lg">
          <SolarUserLinear className="h-[30px] w-[30px]" />
        </AvatarFallback>
      </Avatar>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{`${me?.first_name} ${me?.last_name}`}</span>
        <span className="truncate text-xs">{me?.username}</span>
      </div>
    </>
  );
}

function SidebarNavUserDetailsAndAvatarSkeleton() {
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <SolarUserLinear className="h-[30px] w-[30px]" />
      </Avatar>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <span className="mt-1 h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </>
  );
}
