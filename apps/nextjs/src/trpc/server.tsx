import { cache, Suspense } from "react";
import { headers } from "next/headers";
import { connection } from "next/server";
import { createHydrationHelpers } from "@trpc/react-query/rsc";

import type { AppRouter } from "@battle-stadium/api";
import { createCaller, createTRPCContext } from "@battle-stadium/api";

import type { ChildrenProps } from "~/types";
import { env } from "~/env"; // Add this import
import { createQueryClient } from "./query-client";
import { TRPCReactProviderClient } from "./react";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);

export function TRPCReactProvider({ children }: ChildrenProps) {
  return (
    <Suspense fallback={null}>
      <TRPCReactProviderAsync>
        <HydrateClient>{children}</HydrateClient>
      </TRPCReactProviderAsync>
    </Suspense>
  );
}

async function TRPCReactProviderAsync({ children }: ChildrenProps) {
  if (env.LOG_PERFORMANCE === true) {
    const start = performance.now(); // Start performance marker
    await connection();
    const end = performance.now(); // End performance marker
    console.log(
      `TRPCReactProvider Connection initialization took ${end - start}ms`,
    );
  } else {
    await connection();
  }

  return <TRPCReactProviderClient>{children}</TRPCReactProviderClient>;
}
