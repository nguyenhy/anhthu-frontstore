import "./globals.css";
import './layout.css'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BaseLayout from "@/components/layout/BaseLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Simpla Kit — Premium Google Sheets Productivity Templates · Launching July 5th",
    template: "%s | Simpla Kit",
  },
  description: "Done-for-you Google Sheets productivity templates. Stop building workflows from scratch. Join the waitlist for early bird pricing - launching July 5th, 2026.",
  keywords: ["google sheets templates", "productivity templates", "workflow templates", "spreadsheet templates", "google sheets systems"],
  metadataBase: new URL("https://simplakit.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://simplakit.com",
    title: "Simpla Kit — Premium Productivity Templates",
    description: "Done-for-you Google Sheets systems. Stop building from scratch — start working smarter. Launching July 5th.",
    siteName: "Simpla Kit",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simpla Kit — Premium Productivity Templates",
    description: "Done-for-you Google Sheets systems. Launching July 5th. Join the waitlist.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    other: [
      {
        rel: "stylesheet",
        url: "https://fonts.googleapis.com/icon?family=Material+Icons",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <BaseLayout>
        {children}
      </BaseLayout>
    </html >
  );
}
