"use client";

import { useState } from "react";
import { TaskHeader } from "@/components/layout/task-header";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GridLayout({
  grid,
  list,
}: {
  grid: React.ReactNode;
  list: React.ReactNode;
}) {
  const [sortBy, setSortBy] = useState("created");
  const [view, setView] = useState<"grid" | "list">("grid");

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    localStorage.setItem("preferredView", newView);
  };

  return (
    <Tabs
      value={view}
      onValueChange={(value) => handleViewChange(value as "grid" | "list")}
    >
      <TaskHeader
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleViewChange={(view) => handleViewChange(view as "grid" | "list")}
      />
      <ScrollArea className="h-[calc(100svh-3.5rem)]">
        <TabsContent value="grid">{grid}</TabsContent>
        <TabsContent value="list">{list}</TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
