"use client";

import type { ComponentPropsWithoutRef, ComponentRef } from "react";
import { forwardRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { TabsPrimitive } from "@battle-stadium/ui";
import { Tabs as UiTabs, TabsList as UiTabsList } from "@battle-stadium/ui";

function useActiveTab(
  defaultValue?: string | number | readonly string[],
): readonly [string, URLSearchParams] {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") ?? defaultValue;
  if (Array.isArray(tabParam) && tabParam.length > 0) {
    return [tabParam[0] as string, searchParams] as const;
  }
  const activeTab = `${tabParam as string | number | undefined}`;
  return [activeTab, searchParams] as const;
}

interface TabsProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  disableTabSearchParam?: boolean;
}
export const Tabs = forwardRef<
  ComponentRef<typeof TabsPrimitive.Root>,
  TabsProps
>(
  (
    { defaultValue, disableTabSearchParam = true, onValueChange, ...props },
    ref,
  ) => {
    const [activeTab, searchParams] = useActiveTab(defaultValue);
    const router = useRouter();
    const onTabChange = (value: string) => {
      // Call the user's handler if provided
      onValueChange?.(value);

      // Update URL only if enabled
      if (disableTabSearchParam) {
        return;
      }
      const params = new URLSearchParams(searchParams);
      params.set("tab", value);
      router.replace(`?${params.toString()}`);
    };
    return (
      <UiTabs
        ref={ref}
        {...props}
        onValueChange={onTabChange}
        defaultValue={activeTab}
      />
    );
  },
);

export const TabsList = forwardRef<
  ComponentRef<typeof UiTabsList>,
  ComponentPropsWithoutRef<typeof UiTabsList>
>(({ defaultValue, ...props }, ref) => {
  const [activeTab] = useActiveTab(defaultValue);
  return <UiTabsList ref={ref} {...props} defaultValue={activeTab} />;
});
