import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import {
  generateSignature,
  getCookie,
  setResponseCookies,
} from "~/lib/cookies/cookies";

export const runtime = "edge";

export async function POST (_req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: "Logged in account is required" },
      { status: 401 },
    );
  }

  const [response, setCookies] = setResponseCookies();
  const userIdCookie = await getCookie("userId");

  if (userIdCookie) {
    const [storedUserId, signature] = userIdCookie.split(".");
    const expectedSignature = await generateSignature(storedUserId ?? "");

    if (!storedUserId || !signature || signature !== expectedSignature) {
      const msg = `Signature verification failed for userId cookie. Stored userId: ${storedUserId}, Expected signature: ${expectedSignature}`;

      console.warn(msg); // esl   return await setUserIdCookie(setCookies, userId, response);
    }

    const cookieExpiryDateValue = await getCookie("userId.expires");

    if (!cookieExpiryDateValue) {
      console.warn("Missing 'userId.expires' cookie."); // esl   return await setUserIdCookie(setCookies, userId, response);
    }

    const cookieExpiryDate = new Date(cookieExpiryDateValue);

    if (Number.isNaN(cookieExpiryDate.getTime())) {
      console.warn("Invalid date in 'userId.expires' cookie."); // esl   return await setUserIdCookie(setCookies, userId, response);
    }

    if (cookieExpiryDate > new Date()) {
      return response;
    }
  }

  return await setUserIdCookie(setCookies, userId, response);
}

async function setUserIdCookie (
  setCookies: (name: string, value: string) => Promise<void>,
  userId: string,
  response: NextResponse,
) {
  await setCookies("userId", userId);

  return response;
}
