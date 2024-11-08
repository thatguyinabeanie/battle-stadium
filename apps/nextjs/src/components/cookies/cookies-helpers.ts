import { headers } from "next/headers";
import { NextResponse } from "next/server";
import * as cookie from "cookie";

import { env } from "~/env.ts";

function getCookieDomain() {
  if (env.NODE_ENV === "production") {
    return env.COOKIE_DOMAIN;
  }

  return "localhost";
}

const maxAge = 60 * 60 * 24; // 1 day in seconds
const defaultCookieOptions: cookie.SerializeOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "none",
  domain: getCookieDomain(),
  path: "/",
  maxAge,
};

export function setResponseCookies() {
  const response = NextResponse.json({ message: "Cookie set successfully" });

  async function setCookies(
    key: string,
    value: string | number,
  ): Promise<void> {
    const encodedValue = encodeURIComponent(`${value}`).replace(/\./g, "%2E");
    const signedEncodedValue = `${encodedValue}.${await generateSignature(encodedValue)}`;

    response.headers.set(
      "Set-Cookie",
      cookie.serialize(key, signedEncodedValue, defaultCookieOptions),
    );

    const expires = new Date(Date.now() + maxAge * 1000).toUTCString();

    response.headers.append(
      "Set-Cookie",
      cookie.serialize(`${key}.expires`, expires, defaultCookieOptions),
    );
  }

  return [response, setCookies] as const;
}

export async function generateSignature(
  value: string | number,
): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(env.AUTH_SECRET);
  const valueData = encoder.encode(`${value}`);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, valueData);

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function getCookie(cookie: string) {
  return (await headers()).get(cookie) ?? "";
}
