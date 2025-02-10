"use client";

import { TabsContent } from "@/components/ui/tabs";

export default function MainDefault({
  grid,
  list,
}: {
  grid?: React.ReactNode;
  list?: React.ReactNode;
}) {
  return (
    <div data-slot="main">
      {grid && <TabsContent value="grid">{grid}</TabsContent>}
      {list && <TabsContent value="list">{list}</TabsContent>}
    </div>
  );
}
