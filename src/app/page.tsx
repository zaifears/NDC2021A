import ProfileDirectory from "@/components/ProfileDirectory";
import Image from "next/image";
import Link from "next/link";
import { getProfiles } from "@/lib/sheets";
import ScrollWrapper from "@/components/ScrollWrapper";

export const revalidate = 60;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who can appear in this directory?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students of Notre Dame College Batch 2021 Group A."
      }
    },
    {
      "@type": "Question",
      "name": "Where does the information come from?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Profile information is submitted voluntarily by students using the official update form."
      }
    },
    {
      "@type": "Question",
      "name": "How can I update my profile?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can submit updated information using the official profile update form."
      }
    }
  ]
};

export default async function Home() {
  const profiles = await getProfiles();
  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      {/* Subtle Background Gradient */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-900/5 to-transparent -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-12 text-center">
        <span className="inline-block py-1 px-4 rounded-full bg-gold/10 text-darkGold text-xs font-bold tracking-widest mb-6 border border-gold/20 uppercase">
          Batch Directory
        </span>
        <div className="mx-auto mb-6 w-24 h-24">
          <Image src="/ndc.svg" alt="NDC Logo" width={96} height={96} className="mx-auto" />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          NDC 2021<br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-darkGold">Group A</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          Welcome to the official directory for Notre Dame College Batch 2021 Group A. This site is a community-driven project to help you connect with your classmates, discover their backgrounds, and stay in touch.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> {profiles.length} Members
          </div>
          <Link
            href="/about-ndc"
            className="flex items-center gap-2 bg-white hover:bg-slate-50 px-5 py-2.5 rounded-full shadow-sm border border-slate-200 font-semibold text-slate-800 hover:text-gold transition group"
          >
            <span>🏛️</span>
            <span>About NDC & ID Guide</span>
            <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* Features Grid (Replaces old bullet points) */}
      <section className="max-w-5xl mx-auto px-4 pb-10 w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl border border-blue-100">👥</div>
            <h3 className="font-bold text-slate-900 mb-2">Browse All Members</h3>
            <p className="text-sm text-slate-600">Explore all 132 members of the batch, even if they haven&#39;t filled out their profile yet.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto bg-gold/10 text-darkGold rounded-full flex items-center justify-center mb-4 text-xl border border-gold/20">🔍</div>
            <h3 className="font-bold text-slate-900 mb-2">Detailed Profiles</h3>
            <p className="text-sm text-slate-600">Click on any profile to see detailed information, contact info, and social links.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 text-xl border border-emerald-100">🔄</div>
            <h3 className="font-bold text-slate-900 mb-2">Live Sync</h3>
            <p className="text-sm text-slate-600">Directory data is managed securely and updates dynamically via Google Forms & Sheets.</p>
          </div>
        </div>
      </section>

      {/* College Heritage & ID Explainer Spotlight */}
      <section className="max-w-5xl mx-auto px-4 pb-16 w-full z-10">
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-950">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block py-0.5 px-3 rounded-full bg-gold/20 text-gold text-xs font-bold tracking-wider uppercase border border-gold/30">
              Campus Heritage & Room 153
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Father Tim Building & Student ID Decoder
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Explore the history of Notre Dame College Dhaka, our classroom memories in Room 153, the 8-digit roll architecture, and Google Maps campus location.
            </p>
          </div>
          <Link
            href="/about-ndc"
            className="shrink-0 px-6 py-3 rounded-full bg-gold hover:bg-darkGold text-slate-900 font-bold text-sm transition shadow-md flex items-center gap-2"
          >
            Read College Guide →
          </Link>
        </div>
      </section>

      {/* Searchable Directory and profile grid */}
      <ProfileDirectory profiles={profiles} />

      {/* About the Directory */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">

          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            About the Notre Dame College Batch 2021 Group A Directory
          </h2>

          <div className="space-y-6 text-slate-600 leading-8">

            <p>
              This website is the official public directory for students of
              <strong> Notre Dame College (NDC), Dhaka</strong>,
              Batch <strong>2021</strong>,
              Group <strong>A</strong>.
              It was created as a community initiative to help classmates reconnect,
              keep their information updated, and preserve a digital archive of the batch.
            </p>

            <p>
              Every student has a dedicated profile page containing publicly shared
              information such as their name, profile photograph, biography,
              email address, phone number, and social media links when voluntarily
              submitted through the official update form.
            </p>

            <p>
              The directory is automatically synchronized using Google Forms and
              Google Sheets, ensuring that updates submitted by students can be
              reflected quickly while maintaining a single source of truth.
            </p>

          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-20">

        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          Frequently Asked Questions about the NDC 2021 Group A Directory
        </h2>

        <div className="space-y-6">

          <div className="bg-white rounded-2xl border border-slate-200 p-6">

            <h3 className="font-bold text-lg">
              Who can appear in this directory?
            </h3>

            <p className="mt-2 text-slate-600">
              Students of Notre Dame College Batch 2021 Group A.
            </p>

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">

            <h3 className="font-bold text-lg">
              Where does the information come from?
            </h3>

            <p className="mt-2 text-slate-600">
              Profile information is submitted voluntarily by students using the official update form.
            </p>

          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">

            <h3 className="font-bold text-lg">
              How can I update my profile?
            </h3>

            <p className="mt-2 text-slate-600">
              You can submit updated information using the official profile update form.
            </p>

          </div>

        </div>

      </section>

      <ScrollWrapper />
      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-5 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-gold transition">
              Student Directory
            </Link>
            <span>•</span>
            <Link href="/about-ndc" className="hover:text-gold transition">
              About NDC & ID System Guide
            </Link>
            <span>•</span>
            <a
              href="https://ndc.edu.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition"
            >
              Official College Portal ↗
            </a>
          </div>
          <p className="text-sm text-slate-500 mb-3">
            Built with <span className="font-semibold text-slate-700">Next.js, TypeScript, and Tailwind CSS</span>.
          </p>
          <p className="text-sm text-slate-500">
            Open source project by <a href="https://shahoriar.bd" target="_blank" rel="noopener noreferrer" className="font-bold text-gold hover:text-darkGold transition-colors underline decoration-gold/30 hover:decoration-gold underline-offset-4">Md Al Shahoriar Hossain (62101030)</a>.
          </p>
        </div>
      </footer>
    </main>
  );
}