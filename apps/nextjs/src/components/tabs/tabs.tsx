"use client";

import type { ComponentPropsWithoutRef, ComponentRef } from "react";
import { forwardRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { TabsPrimitive } from "@battle-stadium/ui";
import { Tabs as UiTabs, TabsList as UiTabsList } from "@battle-stadium/ui";

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
    const validDefaultValue =
      typeof defaultValue === "string" || typeof defaultValue === "number"
        ? defaultValue
        : undefined;

    const [activeTab, searchParams] = useActiveTab(validDefaultValue);
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

function useActiveTab(
  defaultValue?: string | number | readonly (string | number)[],
): readonly [string, URLSearchParams] {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") ?? defaultValue ?? "";

  if (Array.isArray(tabParam) && tabParam.length > 0) {
    const firstTab = (tabParam as readonly (string | number)[])[0];
    if (typeof firstTab !== "string" && typeof firstTab !== "number") {
      return ["", searchParams] as const;
    }
    return [String(firstTab), searchParams] as const;
  }

  const activeTab = `${tabParam as string | number}`;
  return [activeTab, searchParams] as const;
}
