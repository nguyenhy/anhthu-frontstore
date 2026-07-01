import type { Metadata } from "next";
import ContactAndSupport from '@/components/contact/ContactAndSupport';
import { fetchContactPageData } from '@/lib/contact/mockContactPageData';
import { HttpError } from "@/lib/error";
import { StrapiContactPage } from "@/lib/contact/types";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact & Support",
    description: "Get help with your Simpla Kit order or template. Reach our support team for order issues, delivery questions, and general inquiries.",
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      title: "Contact & Support | Simpla Kit",
      description: "Get help with your Simpla Kit order or template. Reach our support team for order issues, delivery questions, and general inquiries.",
      url: "https://simplakit.com/contact",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact & Support | Simpla Kit",
      description: "Get help with your Simpla Kit order or template. Reach our support team for order issues, delivery questions, and general inquiries.",
      images: ["/og-image.png"],
    },
  };
}

export default async function Contact() {
  let content: StrapiContactPage | null = null
  try {
    content = await fetchContactPageData();
  } catch (error) {
    console.error(new Date().toISOString(), 'Contact', String(error));
    throw new HttpError('500')
  }

  if (!content) {
    notFound()
  }

  return (
    <ContactAndSupport content={content} />
  );
}
