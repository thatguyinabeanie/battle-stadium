// src/lib/polyfills/performance-now.ts
declare let Date: DateConstructor;

interface DateConstructor {
  now: () => number;
  originalNow?: () => number;
}

if (typeof window !== "undefined") {
  const originalDateNow = Date.now;

  Date.now = () => performance.now();
  // Keep reference to original for any code that needs it
  Date.originalNow = originalDateNow;
}
