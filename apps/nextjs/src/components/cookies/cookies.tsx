"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

import { Button } from "@battle-stadium/ui";

/**
 * Interface for configuring cookie attributes with security best practices
 */
interface CookieOptions {
  /** Number of days until the cookie expires */
  expires?: number;
  /** Ensures cookie is only sent over HTTPS */
  secure?: boolean;
  /** Prevents JavaScript access to cookies, mitigating XSS risks */
  httpOnly?: boolean;
  /** Controls how cookies are sent in cross-site requests for CSRF protection */
  sameSite?: "strict" | "lax" | "none";
}

function cookieAttributes(options: CookieOptions = {}) {
  return {
    expires: options.expires,
    path: "/",
    ...options,
    secure: true, // Force HTTPS
    httpOnly: true, // Prevent XSS
    sameSite: "strict" as const, // CSRF protection
  };
}

const COOKIE_CONSENT = "cookieConsent";

interface CookiesComponentProps {
  isSignedIn: boolean;
  userId: string | null | undefined;
}
export default function CookiesComponent({
  isSignedIn,
  userId,
}: Readonly<CookiesComponentProps>) {
  const cookieConsent = Cookies.get(COOKIE_CONSENT);
  const [showConsent, setShowConsent] = useState(false);

  function handleAccept() {
    Cookies.set(
      COOKIE_CONSENT,
      "accepted",
      cookieAttributes({
        expires: 365,
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      }),
    );

    if (isSignedIn && userId) {
      Cookies.set(
        "userId",
        userId,
        cookieAttributes({
          expires: 7,
          secure: true,
          httpOnly: true,
          sameSite: "strict",
        }),
      );
    }

    setShowConsent(false);
  }

  function handleReject() {
    Cookies.set(
      COOKIE_CONSENT,
      "rejected",
      cookieAttributes({
        expires: 1,
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      }),
    );
    setShowConsent(false);
  }

  useEffect(() => {
    if (cookieConsent === "rejected" || cookieConsent === "accepted") {
      return;
    }

    setShowConsent(true);
  }, [cookieConsent]);

  useEffect(() => {
    if (isSignedIn && cookieConsent === "accepted" && userId) {
      const userIdCookie = Cookies.get("userId");

      if (!userIdCookie || userIdCookie.split(".")[0] !== userId) {
        void callApiToSetUserId(userId);
      }
    }
  }, [isSignedIn, cookieConsent, userId]);

  async function callApiToSetUserId(userId: string) {
    try {
      await fetch("/api/cookies/user-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
    } catch (error) {
      console.error("Error setting userId cookie:", error);
    }
  }

  if (!showConsent) return null;

  return (
    <div
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-20 px-[21px] pb-[26px]"
      role="alert"
    >
      <div className="rounded-large border-divider shadow-small flex w-full items-center justify-between gap-x-20 border bg-background/15 px-6 py-4 backdrop-blur">
        <p className="text-small text-default-700 font-normal">
          We use cookies to provide the best experience. By continuing to use
          our site, you agree to our&nbsp;
          <Link prefetch={true} className="font-normal" href="/tos/cookies">
            Cookie Policy.
          </Link>
        </p>
        <div className="flex items-center gap-2">
          <Button
            className="px-4 font-medium"
            // radius="lg"
            style={{
              border: "solid 2px transparent",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
            onClick={handleAccept}
          >
            Accept All
          </Button>
          <Button
            aria-label="Reject all cookies"
            className="font-medium"
            // radius="lg"
            // variant="light"
            onClick={handleReject}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
