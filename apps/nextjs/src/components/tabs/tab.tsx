"use client";
import type { ComponentPropsWithoutRef, ComponentRef} from "react";
import { forwardRef } from "react";

import { useSearchParams } from "next/navigation";
import type {
  TabsPrimitive
} from "@battle-stadium/ui";
import {
  Tabs as UiTabs,
  TabsList as UiTabsList
} from "@battle-stadium/ui";

function useActiveTab (defaultValue?: string | number | readonly string[] ) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') ?? defaultValue;;
  if (Array.isArray(tabParam) && tabParam.length > 0) {
    return tabParam[0] as string;
  }
  return `${tabParam}`;
}

export const Tabs = forwardRef<
  ComponentRef<typeof TabsPrimitive.Root>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Root>>(({ defaultValue, ...props }, ref) => (
    <UiTabs
      ref={ ref }
      { ...props }
      defaultValue={ useActiveTab(defaultValue) }
    />
  ));

export const TabsList = forwardRef<
  ComponentRef<typeof UiTabsList>,
  ComponentPropsWithoutRef<typeof UiTabsList>>(({defaultValue, ...props}, ref) => (
    <UiTabsList
      ref={ref}
      {...props}
      defaultValue={ useActiveTab(defaultValue) }
    />
  ));
