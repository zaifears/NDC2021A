import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NDC 2021 Group A - Batch Directory",
  description: "Connect with Notre Dame College Batch 2021 Group A alumni",
  icons: {
    icon: "/favicon.ico",
  },
};

// Add default Open Graph and Social metadata
metadata.openGraph = {
  title: metadata.title,
  description: metadata.description,
  images: ["/badge.png", "/ndc.svg"],
};

metadata.twitter = {
  card: "summary_large_image",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-gold/30">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
