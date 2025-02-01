import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Quadrant } from "@/components/quadrant";
import { TaskListItem } from "@/components/task-list-item";
import { Task } from "@/app/types/Task";

const tasks: Task[] = [
  {
    id: "1",
    title: "Task 1",
    description: "Description of the task",
    dueDate: "Feb 1, 2025",
    quadrant: 1,
    createdOn: "Jan 31, 2025",
    completed: false,
    status: "todo",
  },
  {
    id: "2",
    title: "Task 2",
    description: "Description of the task",
    dueDate: "Feb 1, 2025",
    quadrant: 2,
    createdOn: "Jan 31, 2025",
    completed: false,
    status: "todo",
  },
  {
    id: "3",
    title: "Task 3",
    description: "Description of the task",
    dueDate: "Feb 1, 2025",
    quadrant: 3,
    createdOn: "Jan 31, 2025",
    completed: false,
    status: "todo",
  },
];

const gridView = (
  <div className="grid grid-cols-2 grid-rows-2 gap-6 h-[calc(100svh-(var(--header-height)+116px))]">
    <Quadrant
      title="Important and urgent"
      theme="red"
      taskCount={tasks.filter((task) => task.quadrant === 1).length}
    >
      {tasks
        .filter((task) => task.quadrant === 1)
        .map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
    </Quadrant>
    <Quadrant
      title="Important but not urgent"
      theme="amber"
      taskCount={tasks.filter((task) => task.quadrant === 2).length}
    >
      {tasks
        .filter((task) => task.quadrant === 2)
        .map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
    </Quadrant>
    <Quadrant
      title="Urgent but not important"
      theme="sky"
      taskCount={tasks.filter((task) => task.quadrant === 3).length}
    >
      {tasks
        .filter((task) => task.quadrant === 3)
        .map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
    </Quadrant>
    <Quadrant
      title="Not urgent or important"
      theme="gray"
      taskCount={tasks.filter((task) => task.quadrant === 4).length}
    >
      {tasks
        .filter((task) => task.quadrant === 4)
        .map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
    </Quadrant>
  </div>
);

const listView = (
  <div className="flex bg-white flex-col rounded-2xl shadow-sm overflow-hidden ring-1 ring-black/[.08] h-[calc(100svh-(var(--header-height)+116px))] p-4">
    {tasks.map((task) => (
      <TaskListItem key={task.id} task={task} />
    ))}
  </div>
);

export default function Home() {
  return (
    <Tabs defaultValue="grid">
      <header className="mb-5 flex shrink-0 items-center justify-between h-12 gap-4">
        <h2 className="text-lg font-medium">Eisenhower Matrix</h2>
        <div className="flex items-center gap-2">
          <TabsList className="bg-zinc-200/[.75]">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
          <Separator
            orientation="vertical"
            className="h-[24px] ml-2 mr-0 bg-zinc-300"
          />
          <SidebarTrigger />
        </div>
      </header>
      <main>
        <div className="h-[calc(100svh-(var(--header-height)+120px))]">
          <TabsContent value="grid">{gridView}</TabsContent>
          <TabsContent value="list">{listView}</TabsContent>
        </div>
      </main>
    </Tabs>
  );
}
