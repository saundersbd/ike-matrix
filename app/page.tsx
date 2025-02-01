import { Quadrant } from "@/components/quadrant";
import { TaskListItem } from "@/components/task-list-item";
export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[calc(100svh-(var(--header-height)+120px))]">
          <Quadrant title="Important and urgent">
            <TaskListItem
              title="Task 1"
              description="Description of the task"
              date="Feb 1, 2025"
            />
            <TaskListItem
              title="Task 2"
              description="Description of the task"
            />
            <TaskListItem
              title="Task 3"
              description="Description of the task"
              date="Feb 1, 2025"
            />
            <TaskListItem
              title="Task 4"
              description="Description of the task"
            />
            <TaskListItem
              title="Task 4"
              description="Description of the task"
            />
            <TaskListItem
              title="Task 4"
              description="Description of the task"
            />
            <TaskListItem
              title="Task 4"
              description="Description of the task"
            />
            <TaskListItem
              title="Task 4"
              description="Description of the task"
            />
            <TaskListItem
              title="Task 4"
              description="Description of the task"
            />
            <TaskListItem
              title="Task 4"
              description="Description of the task"
            />
            <TaskListItem
              title="Task 4"
              description="Description of the task"
            />
            <TaskListItem
              title="Task 4"
              description="Description of the task"
            />
            <TaskListItem
              title="Task 4"
              description="Description of the task"
            />
          </Quadrant>
          <Quadrant title="Important but not urgent" />
          <Quadrant title="Urgent but not important" />
          <Quadrant title="Not urgent or important" />
        </div>
      </main>
    </div>
  );
}
