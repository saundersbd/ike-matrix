import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid2X2, List, Columns3 } from "lucide-react";

interface ViewSwitcherProps {
  setView: (view: "grid" | "list") => void;
}

export function ViewSwitcher({ setView }: ViewSwitcherProps) {
  return (
    <TabsList className="h-9 px-1 bg-zinc-200/[.5] rounded-lg">
      <TabsTrigger
        value="grid"
        className="h-7 rounded-md"
        onClick={() => setView("grid")}
      >
        <Grid2X2 className="w-4 h-4" />
      </TabsTrigger>
      <TabsTrigger
        value="list"
        className="h-7 rounded-md"
        onClick={() => setView("list")}
      >
        <List className="w-4 h-4" />
      </TabsTrigger>
    </TabsList>
  );
}
