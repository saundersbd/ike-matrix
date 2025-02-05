import { redirect } from "next/navigation";

export default function TaskPage({ params }: { params: { id: string } }) {
  redirect(`/?task=${params.id}`);
}
