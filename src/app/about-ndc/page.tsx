import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NdcIdExplainer from "@/components/NdcIdExplainer";

export const metadata: Metadata = {
  title: "About Notre Dame College, Dhaka & Batch 2021 Group A | Heritage & ID Guide",
  description:
    "Discover the history of Notre Dame College (NDC) Dhaka, our memories in Father Tim Building Room 153, the 8-digit college ID system explained, and campus map.",
  alternates: {
    canonical: "/about-ndc",
  },
  openGraph: {
    title: "About Notre Dame College Dhaka & Batch 2021 Group A",
    description:
      "A tribute to Notre Dame College (NDC) Dhaka, Father Tim Building (Room 153), the 8-digit college ID architecture, and campus memories.",
    url: "/about-ndc",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Father_Timm_Bhaban_at_Notre_Dame_College%2C_Dhaka.jpg",
        width: 1200,
        height: 800,
        alt: "Father Timm Bhaban at Notre Dame College, Dhaka",
      },
    ],
  },
};

export default function AboutNdcPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "About Notre Dame College, Dhaka & Batch 2021 Group A Heritage",
    description:
      "An overview of Notre Dame College (NDC) Dhaka, Room 153 in Father Tim Building, the 8-digit student ID system, and campus location.",
    url: "https://ndc2021a.vercel.app/about-ndc",
    mainEntityOfPage: "https://ndc2021a.vercel.app/about-ndc",
    author: {
      "@type": "Person",
      name: "Md. Al Shahoriar Hossain",
      url: "https://shahoriar.bd",
    },
    publisher: {
      "@type": "Organization",
      name: "NDC 2021 Group A Community",
      logo: {
        "@type": "ImageObject",
        url: "https://ndc2021a.vercel.app/badge.png",
      },
    },
    about: {
      "@type": "CollegeOrUniversity",
      name: "Notre Dame College, Dhaka",
      url: "https://ndc.edu.bd",
      sameAs: "https://en.wikipedia.org/wiki/Notre_Dame_College,_Dhaka",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://ndc2021a.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Notre Dame College",
        item: "https://ndc2021a.vercel.app/about-ndc",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema]),
        }}
      />

      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-bold text-sm transition"
          >
            <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-gold">←</span>
            <span>Back to Directory</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="https://ndc.edu.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition border border-blue-200/60"
            >
              Official Website ↗
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Notre_Dame_College,_Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              Wikipedia ↗
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-8 text-center">
        <span className="inline-block py-1 px-4 rounded-full bg-gold/10 text-darkGold text-xs font-bold tracking-widest mb-4 border border-gold/20 uppercase">
          Campus Heritage & Memories
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Notre Dame College, Dhaka &<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-darkGold">
            Batch 2021 Group A
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Established in 1949 by the Congregation of Holy Cross, Notre Dame College stands as the pinnacle of academic discipline and character formation in Bangladesh.
        </p>
      </section>

      {/* Main Content Article */}
      <article className="max-w-4xl mx-auto px-4 space-y-12">
        {/* Section 1: College Legacy */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>🏛️</span> The Legacy of Notre Dame College
          </h2>
          <div className="space-y-4 text-slate-600 text-[15px] leading-relaxed">
            <p>
              Founded in November 1949 in Laxmibazar, Dhaka, by Roman Catholic priests from the{" "}
              <strong>Congregation of Holy Cross</strong>, Notre Dame College relocated to its present Arambagh, Motijheel campus in May 1954. Over seven decades, NDC has nurtured some of Bangladesh’s finest scholars, leaders, economists, and researchers.
            </p>
            <p>
              Unlike most colleges in the country, Notre Dame College maintains an independent selection system, legendary weekly Sunday quizzes, strict punctuality, and a vibrant co-curricular ecosystem spanning 24+ renowned clubs.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-slate-500">
              <span>Primary References:</span>
              <a
                href="https://ndc.edu.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Official NDC Portal (ndc.edu.bd)
              </a>
              <span>•</span>
              <a
                href="https://en.wikipedia.org/wiki/Notre_Dame_College,_Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Notre Dame College, Dhaka on Wikipedia
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: Father Tim Building & Room 153 */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Our Classroom Home
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-4">
                Father Tim Building — Room 153
              </h2>
              <div className="space-y-3 text-slate-600 text-[15px] leading-relaxed">
                <p>
                  For <strong>Batch 2021 Group A</strong>, our collegiate journey unfolded on the ground floor of the{" "}
                  <strong>Father Tim Building (Father Timm Bhaban)</strong>, in <strong>Room 153</strong>.
                </p>
                <p>
                  The building is named in loving honor of <strong>Father Richard William Timm, CSC</strong> (1923–2020), renowned zoologist, educator, 6th principal of NDC, Ramon Magsaysay Award laureate, and recipient of the Friends of Liberation War Honour for his brave solidarity during 1971.
                </p>
                <p className="text-sm text-slate-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  📍 <strong>Classroom Location:</strong> Father Tim Building, Ground Floor, <strong>Room 153</strong>, Notre Dame College, Arambagh, Dhaka.
                </p>
              </div>
            </div>

            {/* Photo from Wikimedia Commons */}
            <div className="w-full md:w-80 shrink-0">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Father_Timm_Bhaban_at_Notre_Dame_College%2C_Dhaka.jpg"
                  alt="Father Timm Bhaban at Notre Dame College, Dhaka"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <div className="p-3 bg-white text-center">
                  <p className="text-xs font-semibold text-slate-800">Father Timm Bhaban</p>
                  <a
                    href="https://commons.wikimedia.org/wiki/File:Father_Timm_Bhaban_at_Notre_Dame_College,_Dhaka.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-slate-400 hover:text-blue-600 hover:underline transition"
                  >
                    Image Source: Wikimedia Commons / Wikipedia (CC0)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive ID Explainer Component */}
        <section>
          <NdcIdExplainer />
        </section>

        {/* Section 4: Campus Visual Gallery (Wikipedia Sourced) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span>📸</span> Campus Imagery & Grounds
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/94/Notre_Dame_College_entrance.jpg"
                alt="Notre Dame College Main Entrance"
                className="w-full h-48 sm:h-56 object-cover"
                loading="lazy"
              />
              <div className="p-3 bg-white text-center border-t border-slate-100">
                <p className="text-xs font-bold text-slate-800">Main College Entrance Gate</p>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Notre_Dame_College_entrance.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-slate-400 hover:text-blue-600 hover:underline"
                >
                  Source: Wikimedia Commons / Wikipedia
                </a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/83/Field_of_Notre_Dame_College%2C_Dhaka.jpg"
                alt="Notre Dame College Sports Field"
                className="w-full h-48 sm:h-56 object-cover"
                loading="lazy"
              />
              <div className="p-3 bg-white text-center border-t border-slate-100">
                <p className="text-xs font-bold text-slate-800">Campus Sports Field</p>
                <a
                  href="https://commons.wikimedia.org/wiki/File:Field_of_Notre_Dame_College,_Dhaka.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-slate-400 hover:text-blue-600 hover:underline"
                >
                  Source: Wikimedia Commons / Wikipedia
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Strategic Purpose of this Batch Directory */}
        <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20 inline-block mb-3">
            Why We Built This Site
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight">
            Preserving Notre Dame College Batch 2021 Group A
          </h2>
          <div className="space-y-4 text-slate-300 text-[15px] leading-relaxed">
            <p>
              The official college portal maintains student confidentiality and does not publish public roll directories. Once students graduate after HSC, keeping contact info and professional trajectories synchronized becomes difficult.
            </p>
            <p>
              This independent, community-driven directory fills that void: providing a permanent digital archive, direct LinkedIn/Facebook connections, and a fast search engine for all 132 brothers of Batch 2021 Group A.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-4 items-center">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-full bg-gold text-slate-900 font-bold text-sm hover:bg-darkGold transition shadow-md"
            >
              Browse Student Roster →
            </Link>
          </div>
        </section>

        {/* Section 6: Google Map Location */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>📍</span> Campus Location on Google Maps
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Toyenbee Circular Road, Arambagh, Motijheel, Dhaka 1000, Bangladesh.
              </p>
            </div>
            <a
              href="https://maps.google.com/?cid=14324905845214487465"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 hover:bg-blue-100 transition shrink-0"
            >
              Open in Google Maps ↗
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
            <iframe
              title="Notre Dame College Dhaka Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.4764426543265!2d90.41838637599026!3d23.730389389552194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85a34079867%3A0xc6cbfaeb8ff923a9!2sNotre%20Dame%20College!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </article>
    </main>
  );
}
