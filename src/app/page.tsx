import type { Metadata } from "next";
import { Homepage } from "@/components/home/Home";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Simpla Kit — Premium Google Sheets Productivity Templates · Launching July 5th",
    description: "Done-for-you Google Sheets productivity templates. Stop building workflows from scratch. Join the waitlist for early bird pricing - launching July 5th, 2026.",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "Simpla Kit — Premium Google Sheets Productivity Templates · Launching July 5th",
      description: "Done-for-you Google Sheets productivity templates. Stop building workflows from scratch. Join the waitlist for early bird pricing - launching July 5th, 2026.",
      url: "https://simplakit.com",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Simpla Kit — Premium Google Sheets Productivity Templates · Launching July 5th",
      description: "Done-for-you Google Sheets productivity templates. Stop building workflows from scratch. Join the waitlist for early bird pricing - launching July 5th, 2026.",
      images: ["/og-image.png"],
    },
  };
}

export default async function Home() {
  return (
    <>
      <Homepage />
    </>
  );
}
