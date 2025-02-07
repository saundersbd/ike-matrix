import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid2X2, List } from "lucide-react";

interface ViewSwitcherProps {
  setView: (view: "grid" | "list") => void;
}

export default function ViewSwitcher({ setView }: ViewSwitcherProps) {
  return (
    <TabsList className="bg-zinc-200/[.75] rounded-lg">
      <TabsTrigger
        value="grid"
        className="rounded-md"
        onClick={() => setView("grid")}
      >
        <Grid2X2 className="w-4 h-4" />
      </TabsTrigger>
      <TabsTrigger
        value="list"
        className="rounded-md"
        onClick={() => setView("list")}
      >
        <List className="w-4 h-4" />
      </TabsTrigger>
    </TabsList>
  );
}
