import { useState, useCallback } from "react";
import { Task } from "@/app/types/Task";
import { useWorkspace } from "@/app/contexts/WorkspaceContext";

export function useDueDateManagement(task: Task) {
  const { updateTask } = useWorkspace();
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.dueDate || undefined
  );
  const [dueTime, setDueTime] = useState<Date | undefined>(
    task.dueTime ? new Date(new Date().setHours(12, 0, 0, 0)) : undefined
  );

  const handleDateChange = useCallback(
    (newDate: Date | undefined) => {
      setDueDate(newDate);
      updateTask(task.id, {
        ...task,
        dueDate: newDate,
      });
    },
    [task, updateTask]
  );

  const handleTimeChange = useCallback(
    (newTime: Date | undefined) => {
      setDueTime(newTime);
      updateTask(task.id, {
        ...task,
        dueTime: newTime,
      });
    },
    [task, updateTask]
  );

  return {
    dueDate,
    dueTime,
    handleDateChange,
    handleTimeChange,
  };
}
