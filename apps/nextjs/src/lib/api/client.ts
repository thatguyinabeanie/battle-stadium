import type { Middleware } from "openapi-fetch";
import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { getVercelOidcToken } from "@vercel/functions/oidc";
import createFetchClient from "openapi-fetch";

import type { paths } from "~/lib/api/openapi-v1";
import { env } from "~/env";

export const DEFAULT_CACHE_TIMEOUT = 300;

// Cache the auth token fetching
const getAuthToken = cache(async () => {
  if (env.NODE_ENV === "development" || env.VERCEL_ENV !== "development") {
    return null;
  }

  const session = await auth();
  return session.getToken();
});

// Cache the OIDC token fetching
const getOidcToken = cache(async () => {
  if (env.NODE_ENV === "development" || env.VERCEL_ENV !== "development") {
    return null;
  }
  return getVercelOidcToken();
});

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
  skipClerkAuth = false,
  headers?: Headers,
) {
  const baseUrl = `${getBaseUrl()}/api/v1`;
  const fetchClient = createFetchClient<paths>({ baseUrl });

  const authMiddleware: Middleware = {
    async onRequest({ request }) {
      // Only attempt to get OIDC token if headers were provided
      if (env.NODE_ENV !== "development") {
        const oidcToken = await getOidcToken();
        if (oidcToken) {
          request.headers.set("X-Vercel-OIDC-Token", `${oidcToken}`);
        }
      }

      // Only attempt auth if headers were provided
      if (!skipClerkAuth && headers) {
        const token = await getAuthToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return request;
    },
  };

  fetchClient.use(authMiddleware);
  return fetchClient;
}
