import * as React from "react";

const MOBILE_BREAKPOINT = 768;

type MobileState = boolean | undefined;

/**
 * React hook to detect if the current viewport is mobile-sized.
 * @returns {boolean} True if the viewport width is less than 768px, false otherwise.
 * @example
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   return isMobile ? <MobileView /> : <DesktopView />;
 * }
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<MobileState>(() => 
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

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
