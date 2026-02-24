import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NDC 2021 Group A - Batch Directory",
  description: "Connect with Notre Dame College Batch 2021 Group A alumni",
  icons: {
    icon: "/favicon.ico",
  },
  // base URL used when resolving relative image paths for OG/twitter
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
};

// Add default Open Graph and Social metadata (only badge.png so that
// link previews on messaging platforms use it)
metadata.openGraph = {
  title: metadata.title,
  description: metadata.description,
  images: ["/badge.png"],
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
      </body>
    </html>
  );
}
