// @ts-ignore: Bypass IDE module resolution glitch for Next.js Metadata
import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
// @ts-ignore: allow global CSS import without explicit type declarations
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ??
      "https://ndc2021a.vercel.app"
  ),

  title: {
    default: "Notre Dame College Batch 2021 Group A Student Directory",
    template: "%s | NDC 2021 Group A",
  },

  description:
    "Official public student directory for Notre Dame College (NDC) Dhaka Batch 2021 Group A. Browse verified student profiles, contact information, and social links submitted by students.",

  applicationName: "NDC 2021 Group A Directory",
  referrer: "origin-when-cross-origin",

  authors: [
    {
      name: "NDC 2021 Group A Community",
    },
    {
      name: "Md. Al Shahoriar Hossain",
      url: "https://shahoriar.bd",
    },
  ],

  creator: "Md. Al Shahoriar Hossain",

  publisher: "NDC 2021 Group A Community",

  category: "Education",
  appleWebApp: {
  capable: true,
  title: "NDC 2021 Group A",
  statusBarStyle: "default",
},

  other: {
    "subject": "Notre Dame College Batch 2021 Group A Student Directory",
    "coverage": "Bangladesh",
    "distribution": "global",
  },

  keywords: [
    "Notre Dame College",
    "Notre Dame College Dhaka",
    "NDC",
    "NDC 2021",
    "Batch 2021",
    "Group A",
    "Student Directory",
    "Student Profiles",
    "Alumni",
    "Bangladesh",
    "Notre Dame College Alumni",
    "NDC Directory",
    "Notre Dame College Students",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  verification: {
    google: "6d4fe17fcdeadb6e",
  },

  openGraph: {
    type: "website",
    locale: "en_US",

    url: "/",

    siteName: "NDC 2021 Group A",

    title: "Notre Dame College Batch 2021 Group A Student Directory",

    description:
      "Browse public student profiles from Notre Dame College Dhaka Batch 2021 Group A.",

    images: [
      {
        url: "/badge.png",
        width: 1200,
        height: 630,
        alt: "Notre Dame College Batch 2021 Group A Directory",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Notre Dame College Batch 2021 Group A Student Directory",

    description:
      "Browse verified student profiles from NDC Batch 2021 Group A.",

    images: ["/badge.png"],
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-gold/30">
  <StructuredData />
  {children}
</body>
    </html>
  );
}
