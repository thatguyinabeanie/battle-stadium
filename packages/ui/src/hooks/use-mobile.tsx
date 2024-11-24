import * as React from "react";

const MOBILE_BREAKPOINT = 768;

type MobileState = boolean | undefined;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<MobileState>(undefined);

  const onChange = React.useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, [onChange]);

  return isMobile ?? false;
}
