"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@battle-stadium/ui";

export default function Settings() {
  return (
    <div className="border-small w-full max-w-2xl flex-col rounded-3xl border-neutral-400 border-opacity-15 p-10 backdrop-blur">
      <Tabs>
        <TabsList>
          <TabsTrigger value="account" title="Account">
            Account
          </TabsTrigger>
          <TabsTrigger value="appearance" title="Appearance">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="connections" title="Connections">
            Connections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="appearance">
          {"Make changes to the site's appearance here."}
        </TabsContent>
      </Tabs>
    </div>
  );
}
