import { redirect } from "next/navigation";

export default async function TaskPage({ params }: { params: { id: string } }) {
  redirect(`/?task=${params.id}`);
}
