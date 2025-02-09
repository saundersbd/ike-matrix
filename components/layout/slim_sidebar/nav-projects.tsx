"use client";

import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { useState } from "react";
import { Circle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProjectListItem } from "@/components/controls/filtering/project-list-item";
import { Project } from "@/app/types/Project";
import { projects } from "@/app/data/projects";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";

export function NavProjects() {
  const { projects, getTasksByProject } = useWorkspace();

  const [isOpen, setIsOpen] = useState(true);

  const tasksCount = (project: Project) => getTasksByProject(project.id).length;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>

      <SidebarGroupAction
        title="Add Project"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronRight
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-90"
          )}
        />
        <span className="sr-only">Add Project</span>
      </SidebarGroupAction>

      <SidebarMenu className="font-medium">
        <Collapsible open={isOpen}>
          <CollapsibleContent>
            {projects.map((project) => (
              <SidebarMenuItem key={project.id} className="text-xs">
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <ProjectListItem project={project} dense />
                  </Link>
                </SidebarMenuButton>
                {tasksCount(project) > 0 && (
                  <SidebarMenuBadge>{tasksCount(project)}</SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
