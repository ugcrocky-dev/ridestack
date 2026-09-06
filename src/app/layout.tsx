import type { Metadata } from "next";
import { Syne, Figtree } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RideStack — Lawrenceville GA Mobility Launch Dashboard",
  description:
    "Rideshare, delivery, medical courier, NEMT, and government contract apply guides for Lawrenceville and Gwinnett County, Georgia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
