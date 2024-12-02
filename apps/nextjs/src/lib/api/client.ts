import type { Middleware } from "openapi-fetch";
import createFetchClient from "openapi-fetch";

import type { paths } from "~/lib/api/openapi-v1";
import { env } from "~/env";
import type { Tokens } from "~/types";

export const DEFAULT_CACHE_TIMEOUT = 300;

export function defaultConfig(tag: string) {
  return {
    next: { tags: [tag] },
  };
}

export function getBaseUrl() {
  if ([env.NODE_ENV, env.VERCEL_ENV].includes("production")) {
    return `${env.PROD_API_BASE_URL}`;
  }
  return `http://${env.LOCAL_DEV_BACKEND_HOST}:${env.LOCAL_DEV_BACKEND_PORT}`;
}

export function BattleStadiumApiClient(
  tokens: Tokens,
  skipClerkAuth = false,
) {
  const baseUrl = `${getBaseUrl()}/api/v1`;
  const fetchClient = createFetchClient<paths>({ baseUrl });

  const authMiddleware: Middleware = {
    onRequest({ request }) {
      // Only attempt to get OIDC token if headers were provided
      if (env.NODE_ENV !== "development") {
        if (!tokens.oidc) {
          throw new Error("OIDC token not provided");
        }
        request.headers.set("X-Vercel-OIDC-Token", `${tokens.oidc}`);
      }

      // Only attempt auth if headers were provided
      if (!skipClerkAuth) {
        if (!tokens.clerk) {
          throw new Error("Clerk token not provided");
        }
        request.headers.set("Authorization", `Bearer ${tokens.clerk}`);
      }
      return request;
    },
  };

  fetchClient.use(authMiddleware);
  return fetchClient;
}
