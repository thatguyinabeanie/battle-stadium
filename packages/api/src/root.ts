import { accountsRouter } from "./router/accounts";
import { authRouter } from "./router/auth";
import { organizationsRouter } from "./router/organizations";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  accounts: accountsRouter,
  organizations: organizationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
