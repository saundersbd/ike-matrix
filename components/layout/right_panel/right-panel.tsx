import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function RightPanel({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="h-[calc(100svh-4rem)] flex !bg-background" {...props}>
      <SidebarContent className="flex flex-col items-center justify-center flex-1">
        <div className="flex flex-col items-center justify-center flex-1">
          Empty state
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
