import { useState, useCallback } from "react";
import { format, isToday, formatDistance, addDays } from "date-fns";
import { Task } from "@/app/types/Task";

export const TIME_PRESETS = {
  MORNING: { hours: 9, label: "Morning" },
  NOON: { hours: 12, label: "Noon" },
  AFTERNOON: { hours: 15, label: "Afternoon" },
  EVENING: { hours: 18, label: "Evening" },
  NIGHT: { hours: 21, label: "Night" },
} as const;

export function useDueDateManagement(
  task: Task,
  updateTask: (id: string, task: Task) => void
) {
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.dueDate || undefined
  );
  const [dueTime, setDueTime] = useState<Date | undefined>(
    task.dueTime ? new Date(new Date().setHours(12, 0, 0, 0)) : undefined
  );

  const updateDueDate = useCallback(
    (newDate: Date | undefined) => {
      setDueDate(newDate);
      updateTask(task.id, {
        ...task,
        dueDate: newDate,
      });
    },
    [task, updateTask]
  );

  const updateDueTime = useCallback(
    (hours: number) => {
      const newTime = new Date(new Date().setHours(hours, 0, 0, 0));
      setDueTime(newTime);
      updateTask(task.id, {
        ...task,
        dueTime: newTime,
      });
    },
    [task, updateTask]
  );

  const clearDueDateAndTime = useCallback(() => {
    setDueDate(undefined);
    setDueTime(undefined);
    updateTask(task.id, {
      ...task,
      dueDate: undefined,
      dueTime: undefined,
    });
  }, [task, updateTask]);

  const extendDueDate = useCallback(
    (days: number) => {
      if (!dueDate) return;
      const newDate = addDays(dueDate, days);
      updateDueDate(newDate);
    },
    [dueDate, updateDueDate]
  );

  const formatDueDate = useCallback((date: Date) => {
    if (isToday(date)) return "Today";
    if (date < new Date()) {
      return `Due ${formatDistance(date, new Date(), {
        addSuffix: true,
      }).replace(/^about /, "")}`;
    }
    return format(
      date,
      date.getFullYear() === new Date().getFullYear() ? "MMM d" : "MMM d, yyyy"
    );
  }, []);

  return {
    dueDate,
    dueTime,
    updateDueDate,
    updateDueTime,
    clearDueDateAndTime,
    extendDueDate,
    formatDueDate,
  };
}
