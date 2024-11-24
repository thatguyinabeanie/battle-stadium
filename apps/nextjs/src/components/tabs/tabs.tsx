"use client";

import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from "react";
import { forwardRef, memo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { TabsPrimitive } from "@battle-stadium/ui";
import {
  Badge,
  CardContent,
  CardHeader,
  Tabs as UiTabs,
  TabsContent as UiTabsContent,
  TabsList as UiTabsList,
  TabsTrigger as UiTabsTrigger,
} from "@battle-stadium/ui";

import type { TabConfig } from "~/types";

interface TabsProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  disableTabSearchParam?: boolean;
}
export const Tabs = forwardRef<
  ComponentRef<typeof TabsPrimitive.Root>,
  TabsProps
>(
  (
    { defaultValue, disableTabSearchParam = false, onValueChange, ...props },
    ref,
  ) => {
    const validDefaultValue =
      typeof defaultValue === "string" || typeof defaultValue === "number"
        ? defaultValue
        : undefined;

    const [activeTab, searchParams] = useActiveTab(validDefaultValue);
    const router = useRouter();

    const onTabChange = (value: string) => {
      // Call the user'sx handler if provided
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
  return (
    <UiTabsList
      ref={ref}
      {...props}
      defaultValue={activeTab}
      aria-orientation="horizontal"
      className="flex w-11/12 flex-row gap-2 overflow-x-visible rounded-none border-x-0 border-b-2"
    />
  );
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

export const TabsTrigger = memo(({value,  title }: Readonly<TabConfig>) => {
  return (
    <UiTabsTrigger
      key={value}
      value={value}
      title={title}
      className="w-[6rem] py-1 transition-colors data-[state=active]:text-primary lg:w-[7.5rem]"
    >
      <Badge
        variant="secondary"
        className="md:text-md w-[6rem] px-1 py-1 text-sm lg:w-[7.5rem]"
      >
        {title}
      </Badge>
    </UiTabsTrigger>
  );
});

export const TabsContent = memo(({
  value,
  children,
  loadingText = "Loading...",
  capitalize = true,
}: TabConfig & {
  children: ReactNode,
  loadingText?: string,
  capitalize?: boolean,
}) =>{

  return (
    <UiTabsContent
      value={value}
      className="mt-0 flex h-full w-full flex-col items-center justify-center py-0"
    >
      <CardHeader className={capitalize ? "capitalize" : undefined}>
        {value}
      </CardHeader>
      <Suspense fallback={<div role="status" aria-live="polite">{loadingText}</div>}>
        <CardContent className="min-h-svh">{children}</CardContent>
      </Suspense>
    </UiTabsContent>
  );
});
