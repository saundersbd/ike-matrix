import { tasks } from "@/app/data/tasks";

export default function TaskPage({ params }: { params: { id: string } }) {
  const task = tasks.find((t) => t.id === params.id);

  if (!task) {
    return null;
  }

  return <div>{task.title}</div>;
}
