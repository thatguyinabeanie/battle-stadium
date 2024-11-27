"use client";

import { useEffect } from "react";
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
  useAdSense();

  const NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID = env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID;

  return (
    <div className="w-full min-w-[250px]">
      {NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID && (
        <ins
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
  useEffect(() => {
    const handleRouteChange = () => {
      const intervalId = setInterval(() => {
        try {
          const adElement = document.querySelector(".adsbygoogle");
          if (window.adsbygoogle && adElement && adElement.clientWidth >= 250) {
            window.adsbygoogle.push({});
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error("Error pushing ads: ", err);
          clearInterval(intervalId);
        }
      }, 100);
      return () => clearInterval(intervalId);
    };

    handleRouteChange();

    if (typeof window !== "undefined") {
      Router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        Router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, []);
}

export default AdBanner;
