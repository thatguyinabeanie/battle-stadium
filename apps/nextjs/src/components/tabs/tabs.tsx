"use client";
import type { ComponentPropsWithoutRef, ComponentRef} from "react";
import { forwardRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import type {
  TabsPrimitive
} from "@battle-stadium/ui";
import {
  Tabs as UiTabs,
  TabsList as UiTabsList
} from "@battle-stadium/ui";

function useActiveTab (defaultValue?: string | number | readonly string[] ): readonly [string, URLSearchParams] {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') ?? defaultValue;;
  if (Array.isArray(tabParam) && tabParam.length > 0) {
    return [tabParam[0] as string, searchParams] as const;
  }
  return [`${tabParam}`, searchParams] as const;
}

interface TabsProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  enableTabSearchParam?: boolean;
}
export const Tabs = forwardRef<ComponentRef<typeof TabsPrimitive.Root>,TabsProps>(({ defaultValue, ...props }, ref) => {

  const [activeTab, searchParams] = useActiveTab(defaultValue);
  const router = useRouter();

  const onTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <UiTabs
      ref={ ref }
      { ...props }
      onValueChange={ onTabChange }
      defaultValue={ activeTab }
    />
  );
});

export const TabsList = forwardRef<
  ComponentRef<typeof UiTabsList>,
  ComponentPropsWithoutRef<typeof UiTabsList>>(({defaultValue, ...props}, ref) => {
    const [activeTab] = useActiveTab(defaultValue);
    return (
      <UiTabsList
        ref={ref}
        {...props}
        defaultValue={ activeTab  }
      />
    );
  });
