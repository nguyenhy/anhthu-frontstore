import type { Metadata } from "next";
import { Homepage } from "@/components/home/Home";

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

export default async function Home() {
  return (
    <>
      <Homepage />
    </>
  );
}
