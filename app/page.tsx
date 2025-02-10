"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the 'quadrants' parameter from searchParams
    const quadrants = searchParams.get("quadrants");

    // Redirect to "/?quadrants=q1" if no quadrants parameter is present
    if (typeof quadrants === "string") {
      router.push("/q1");
    }
  }, [searchParams, router]);

  // Optional: render something else if needed
  return null;
}
