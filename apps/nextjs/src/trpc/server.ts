// import { cache } from "react";
// import { headers } from "next/headers";
// import { createHydrationHelpers } from "@trpc/react-query/rsc";

// import type { AppRouter } from "@battle-stadium/api";
// import { createCaller, createTRPCContext } from "@battle-stadium/api";

// import { createQueryClient } from "./query-client";

// /**
//  * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
//  * handling a tRPC call from a React Server Component.
//  */
// const createContext = cache(async () => {
//   const heads = new Headers(await headers());
//   heads.set("x-trpc-source", "rsc");

//   return createTRPCContext({
//     headers: heads,
//   });
// });

// const getQueryClient = cache(createQueryClient);
// const caller = createCaller(createContext);

// export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
//   caller,
//   getQueryClient,
// );

export default function TrpcServer() {
  return null;
}
