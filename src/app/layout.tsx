import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NDC 2021 Group A - Batch Directory",
  description: "Connect with Notre Dame College Batch 2021 Group A alumni",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gold">
              NDC 2021 Group A
            </h1>
            <p className="text-gray-600 text-sm">Batch Directory</p>
          </div>
        </nav>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
