import type { Session } from "@clerk/nextjs/server";
import { cache } from "react";
import { headers } from "next/headers";
import { createHydrationHelpers } from "@trpc/react-query/rsc";

import type { AppRouter } from "@battle-stadium/api";
import { createCaller, createTRPCContext } from "@battle-stadium/api";

import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    session: {
      id: "1",
      clientId: "1",
      userId: "1",
      status: "hello",
      lastActiveAt: 1,
      expireAt: 1,
      abandonAt: 1,
      createdAt: 1,
      updatedAt: 1,
    } as Session,
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
