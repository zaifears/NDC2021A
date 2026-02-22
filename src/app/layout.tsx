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
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-gold/30">
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tighter text-slate-900">
                NDC<span className="text-gold">21A</span>
              </span>
            </div>
          </div>
        </nav>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
