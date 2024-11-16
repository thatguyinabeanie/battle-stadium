import type { Middleware } from "openapi-fetch";
import { auth } from "@clerk/nextjs/server";
import { getVercelOidcToken } from "@vercel/functions/oidc";
import createFetchClient from "openapi-fetch";

import type { paths } from "~/lib/api/openapi-v1";
import { env } from "~/env";

export const DEFAULT_CACHE_TIMEOUT = 300;

export function defaultConfig(tag: string, revalidate?: number) {
  return {
    next: {
      tags: [tag],
      revalidate: revalidate ?? DEFAULT_CACHE_TIMEOUT,
    },
  };
}

export function getBaseUrl() {
  if ([env.NODE_ENV, env.VERCEL_ENV].includes("production")) {
    return `${env.PROD_API_BASE_URL}`;
  }

  return `http://${env.LOCAL_DEV_BACKEND_HOST}:${env.LOCAL_DEV_BACKEND_PORT}`;
}

export function BattleStadiumApiClient(skipClerkAuth = false) {
  const baseUrl = `${getBaseUrl()}/api/v1`;
  const fetchClient = createFetchClient<paths>({ baseUrl });

  const authMiddleware: Middleware = {
    async onRequest({ request }) {
      if (env.NODE_ENV !== "development") {
        request.headers.set(
          "X-Vercel-OIDC-Token",
          `${await getVercelOidcToken()}`,
        );
      }

      if (!skipClerkAuth) {
        request.headers.set(
          "Authorization",
          `Bearer ${await (await auth()).getToken()}`,
        );
      }

      return request;
    },
  };

  fetchClient.use(authMiddleware);

  return fetchClient;
}
