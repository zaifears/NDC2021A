import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono, Newsreader } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const display = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--nf-display",
});

const body = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--nf-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--nf-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://ndc2021a.vercel.app"),

  title: {
    default: "Notre Dame College Batch 2021 Group A Student Directory",
    template: "%s | NDC 2021 Group A",
  },

  description:
    "Public student directory of Notre Dame College (NDC) Dhaka, Batch 2021 Group A. Find classmates, profiles, photos and contact links shared by the students.",

  applicationName: "NDC 2021 Group A Directory",
  referrer: "origin-when-cross-origin",

  authors: [
    { name: "NDC 2021 Group A Community" },
    { name: "Md. Al Shahoriar Hossain", url: "https://shahoriar.bd" },
  ],
  creator: "Md. Al Shahoriar Hossain",
  publisher: "NDC 2021 Group A Community",
  category: "Education",

  appleWebApp: {
    capable: true,
    title: "NDC 2021 Group A",
    statusBarStyle: "default",
  },

  keywords: [
    "Notre Dame College",
    "Notre Dame College Dhaka",
    "NDC",
    "NDC 2021",
    "Batch 2021",
    "Group A",
    "Student Directory",
    "Notre Dame College Alumni",
  ],

  alternates: {
    canonical: "/",
    types: { "application/json": "/knowledge.json", "text/plain": "/llms-full.txt" },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Icons: the file-based opengraph-image and twitter-image routes supply the social previews.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/logo-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },

  verification: { google: "6d4fe17fcdeadb6e" },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "NDC 2021 Group A",
    title: "Notre Dame College Batch 2021 Group A Student Directory",
    description: "Browse public student profiles from Notre Dame College Dhaka Batch 2021 Group A.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Notre Dame College Batch 2021 Group A Student Directory",
    description: "Browse public student profiles from NDC Batch 2021 Group A.",
  },

  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
