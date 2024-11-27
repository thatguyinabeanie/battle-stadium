import Script from "next/script";

import { env } from "~/env";

export function AdSenseScript() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
