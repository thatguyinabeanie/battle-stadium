"use client";

import { useEffect, useRef } from "react";
import Router from "next/router";

import { env } from "~/env";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdsBannerProps {
  "data-ad-slot": string;
  "data-ad-format": string;
  "data-full-width-responsive": string;
  "data-ad-layout"?: string;
  className?: string;
}

const AdBanner = (props: AdsBannerProps) => {
  const NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID = env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID;
  const { adRef } = useAdSense();

  return (
    <div className="w-full min-w-[250px]">
      {NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID && (
        <ins
          ref={adRef}
          className={`adsbygoogle adbanner-customize mt-2 ${props.className ?? ""}`}
          style={{
            display: "block",
            overflow: "hidden",
            minWidth: "250px",
            width: "100%",
            border: env.NODE_ENV === "development" ? "1px solid red" : "none",
            background:
              env.NODE_ENV === "development" ? "rgba(255, 0, 0, 0.1)" : "none",
          }}
          data-adtest="on"
          data-ad-client={NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
          {...props}
        />
      )}
    </div>
  );
};

function useAdSense() {
  const adRef = useRef<HTMLModElement>(null);
  const isInitialized = useRef(false);
  useEffect(() => {
    const initAd = () => {
      const intervalId = setInterval(() => {
        try {
          if (!adRef.current || isInitialized.current) return;

          if (
            window.adsbygoogle &&
            adRef.current.clientWidth >= 250 &&
            !adRef.current.dataset.adInitialized
          ) {
            window.adsbygoogle.push({});
            adRef.current.dataset.adInitialized = "true";
            isInitialized.current = true;
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error("Error pushing ads:", err);
          clearInterval(intervalId);
        }
      }, 100);

      return () => clearInterval(intervalId);
    };

    const cleanup = initAd();

    if (typeof window !== "undefined") {
      Router.events.on("routeChangeComplete", initAd);
      return () => {
        Router.events.off("routeChangeComplete", initAd);
        cleanup();
        isInitialized.current = false;
      };
    }
  }, []);

  return { adRef };
}

export default AdBanner;
