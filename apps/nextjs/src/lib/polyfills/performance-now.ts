// src/lib/polyfills/performance-now.ts
declare let Date: DateConstructor;

interface DateConstructor {
  now: () => number;
  originalNow?: () => number;
}

if (typeof window !== "undefined") {
  Date.originalNow = Date.now;
  Date.now = () => performance.now();
}
