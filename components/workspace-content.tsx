import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SlimSidebar } from "@/components/layout/slim_sidebar/slim-sidebar";
import { Task } from "@/app/types/Task";
import { Project } from "@/app/types/Project";

type WorkspaceContentProps = {
  tasks?: Task[];
  projects?: Project[];
  children: React.ReactNode;
};

export function WorkspaceContent({
  tasks,
  projects,
  children,
}: WorkspaceContentProps) {
  return (
    <SidebarProvider
      className="relative flex flex-1 overflow-hidden"
      style={{ "--sidebar-width": "300px" } as React.CSSProperties}
    >
      <SlimSidebar tasks={tasks || []} projects={projects || []} />
      <SidebarInset className="bg-white/50">{children}</SidebarInset>
    </SidebarProvider>
  );
}
