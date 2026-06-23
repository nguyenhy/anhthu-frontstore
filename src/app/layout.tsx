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
  title: "Simpla - Google Sheets templates for independent workers",
  description: "Google Sheets templates for independent workers",
  icons: {
    other: [
      {
        rel: 'stylesheet',
        url: 'https://fonts.googleapis.com/icon?family=Material+Icons',
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
