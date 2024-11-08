"use server";

import type { FetchOptions } from "openapi-fetch";

import type { paths } from "~/lib/api/openapi-v1";
import { BattleStadiumApiClient, defaultConfig } from "~/lib/api";

export async function getOrganizations(
  options?: FetchOptions<paths["/organizations"]["get"]>,
) {
  const organizationsOptions = {
    ...defaultConfig("getOrganizations"),
    ...options,
    params: {
      query: {
        page: options?.params.query.page ?? 0,
        per_page: options?.params.query.per_page ?? 20,
      },
    },
  };
  const skipClerkAuth = true;

  const resp = await (
    await BattleStadiumApiClient(skipClerkAuth)
  ).GET("/organizations", organizationsOptions);
  const allOrgs = resp.data?.data;
  const partnerOrgs = (allOrgs ?? []).filter((org) => org.partner);
  const nonPartnerOrgs = (allOrgs ?? []).filter((org) => !org.partner);

  return {
    partners: partnerOrgs,
    nonpartners: nonPartnerOrgs,
  };
}

export async function getOrganization(
  slug: string,
  options?: FetchOptions<paths["/organizations/{slug}"]["get"]>,
) {
  const organizationOptions = {
    ...defaultConfig(`getOrganization(${slug})`),
    ...options,
    params: { path: { slug } },
  };

  return (await BattleStadiumApiClient()).GET(
    "/organizations/{slug}",
    organizationOptions,
  );
}
