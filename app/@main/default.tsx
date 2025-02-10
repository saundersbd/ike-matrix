import { TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/empty-state";

export default function MainDefault({
  grid,
  list,
}: {
  grid?: React.ReactNode;
  list?: React.ReactNode;
}) {
  // If neither prop is provided, show a default view
  if (!grid && !list) {
    return (
      <div data-slot="main" className="h-full flex items-center justify-center">
        <EmptyState
          heading="Welcome to Eisenhower Matrix"
          description="Get started by adding your first task"
          onClick={{
            label: "Add task",
            action: () => {
              // This will need to be handled by your task creation logic
              console.log("Add task clicked");
            },
          }}
        />
      </div>
    );
  }

  return (
    <div data-slot="main">
      {grid && <TabsContent value="grid">{grid}</TabsContent>}
      {list && <TabsContent value="list">{list}</TabsContent>}
    </div>
  );
}
