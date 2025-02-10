"use client";

import { usePathname } from "next/navigation";
import { QUADRANTS } from "@/app/types/Quadrant";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const quadrantNumber = pathname.split("/q").pop(); // Gets "1", "2", "3", or "4" as string
  const quadrant = QUADRANTS.find((q) => q.id === Number(quadrantNumber));
  const title = quadrant?.title ?? "Quadrant";
  const description = quadrant?.description;

  return (
    <div className="flex flex-1 flex-col p-6 pb-8">
      <div className="max-w-4xl mx-auto container">
        <header className="flex flex-col gap-2 mb-8">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-zinc-500">{description}</p>
        </header>
        {children}
      </div>
    </div>
  );
}
