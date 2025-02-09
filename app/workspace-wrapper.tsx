"use client";

import * as React from "react";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";
import { Task } from "@/app/types/Task";
import { Project } from "@/app/types/Project";

interface ContentProps {
  tasks?: Task[];
  projects?: Project[];
  children?: React.ReactNode;
}

export function WorkspaceWrapper({
  children,
  contentChildren,
}: {
  children: React.ReactNode;
  contentChildren: React.ReactElement<ContentProps>;
}) {
  const { tasks, projects } = useWorkspace();

  return (
    <>
      {React.cloneElement(contentChildren, { tasks, projects })}
      {children}
    </>
  );
}
