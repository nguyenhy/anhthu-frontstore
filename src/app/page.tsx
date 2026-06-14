import type { Metadata, ResolvingMetadata } from "next";
import ContactAndSupport from '@/components/contact/ContactAndSupport';
import { fetchContactPageData } from '@/lib/contact/mockContactPageData';
import { HttpError } from "@/lib/error";
import { StrapiContactPage } from "@/lib/contact/types";
import { notFound } from "next/navigation";

export async function generateMetadata(
  props: {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {};
}

export default async function Contact() {
  let content: StrapiContactPage | null = null
  try {
    content = await fetchContactPageData();
  } catch (error) {
    throw new HttpError('500')
  }

  if (!content) {
    notFound()
  }

  return (
    <>
      <ContactAndSupport content={content} />
    </>
  );
}
