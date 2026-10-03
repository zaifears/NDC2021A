import type { Metadata } from "next";
import Link from "next/link";
import NdcIdExplainer from "@/components/NdcIdExplainer";

export const metadata: Metadata = {
  title: "Notre Dame College, Dhaka and Batch 2021 Group A | Campus History & Student ID Guide",
  description:
    "Overview of Notre Dame College (NDC) Dhaka, classroom details for Father Tim Building Room 153, student ID structure breakdown, and campus map.",
  alternates: {
    canonical: "/about-ndc",
  },
  openGraph: {
    title: "Notre Dame College, Dhaka and Batch 2021 Group A",
    description:
      "Notre Dame College (NDC) Dhaka, classroom details for Father Tim Building Room 153, student ID structure breakdown, and campus location.",
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
    headline: "Notre Dame College, Dhaka and Batch 2021 Group A",
    description:
      "Overview of Notre Dame College (NDC) Dhaka, classroom details for Father Tim Building Room 153, student ID structure breakdown, and campus location.",
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
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-16 sm:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema]),
        }}
      />

      {/* Top Navigation */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 text-slate-700 hover:text-slate-900 font-bold text-xs sm:text-sm transition shrink-0"
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-gold">←</span>
            <span>Directory</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href="https://ndc.edu.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition border border-blue-200/60"
            >
              Official Site ↗
            </a>
            <a
              href="https://en.wikipedia.org/wiki/Notre_Dame_College,_Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              Wikipedia ↗
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12 pb-6 sm:pb-8 text-center">
        <span className="inline-block py-1 px-3 sm:px-4 rounded-full bg-gold/10 text-darkGold text-[11px] sm:text-xs font-bold tracking-widest mb-3 sm:mb-4 border border-gold/20 uppercase">
          College History and Memories
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
          Notre Dame College, Dhaka and<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-darkGold">
            Batch 2021 Group A
          </span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Founded in 1949 by the Congregation of Holy Cross, Notre Dame College (NDC) is one of the premier colleges in Bangladesh, known for high academic standards and student discipline.
        </p>
      </section>

      {/* Main Content Article */}
      <article className="max-w-4xl mx-auto px-3 sm:px-4 space-y-6 sm:space-y-10">
        {/* Section 1: College History */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-7 md:p-10 shadow-sm leading-relaxed">
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2">
            <span>🏛️</span> About Notre Dame College, Dhaka
          </h2>
          <div className="space-y-3 sm:space-y-4 text-slate-600 text-xs sm:text-sm md:text-[15px] leading-relaxed">
            <p>
              Notre Dame College was established in November 1949 in Laxmibazar, Dhaka, by the Roman Catholic Congregation of Holy Cross. In May 1954, the college relocated to its present Arambagh, Motijheel campus. Over the decades, thousands of students have graduated from NDC to become notable scientists, educators, public servants, and entrepreneurs across Bangladesh and worldwide.
            </p>
            <p>
              The college is widely known for its separate admission test, weekly Sunday quizzes, strict punctuality requirements, and more than 24 student-run co-curricular clubs.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-2 text-[11px] sm:text-xs font-medium text-slate-500">
              <span>Primary References:</span>
              <a
                href="https://ndc.edu.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Official NDC Website (ndc.edu.bd)
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

        {/* Section 2: Father Tim Building, Room 153 */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-7 md:p-10 shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 sm:px-3 py-1 rounded-full border border-blue-100 inline-block">
                Classroom Details
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mt-2 mb-3 sm:mb-4">
                Father Tim Building: Room 153
              </h2>
              <div className="space-y-3 text-slate-600 text-xs sm:text-sm md:text-[15px] leading-relaxed">
                <p>
                  For <strong>Batch 2021 Group A</strong> (Business Studies), our classes took place on the ground floor of the <strong>Father Tim Building (Father Timm Bhaban)</strong> in <strong>Room 153</strong>.
                </p>
                <p>
                  The building is named after <strong>Father Richard William Timm, CSC</strong> (1923-2020). He was an American zoologist, educator, the 6th principal of Notre Dame College, Ramon Magsaysay Award laureate, and recipient of the Friends of Liberation War Honour by Bangladesh for his support during the 1971 Liberation War.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-100">
                  📍 <strong>Classroom Location:</strong> Father Tim Building, Ground Floor, <strong>Room 153</strong>, Notre Dame College, Arambagh, Dhaka.
                </p>
              </div>
            </div>

            {/* Photo from Wikimedia Commons */}
            <div className="w-full md:w-80 shrink-0">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Father_Timm_Bhaban_at_Notre_Dame_College%2C_Dhaka.jpg"
                  alt="Father Timm Bhaban at Notre Dame College, Dhaka"
                  className="w-full h-48 sm:h-56 object-cover"
                  loading="lazy"
                />
                <div className="p-2.5 sm:p-3 bg-white text-center">
                  <p className="text-xs font-bold text-slate-800">Father Timm Bhaban</p>
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
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-7 md:p-10 shadow-sm">
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
            <span>📸</span> Campus Photos and Grounds
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/94/Notre_Dame_College_entrance.jpg"
                alt="Notre Dame College Main Entrance"
                className="w-full h-44 sm:h-56 object-cover"
                loading="lazy"
              />
              <div className="p-2.5 sm:p-3 bg-white text-center border-t border-slate-100">
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

            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/83/Field_of_Notre_Dame_College%2C_Dhaka.jpg"
                alt="Notre Dame College Sports Field"
                className="w-full h-44 sm:h-56 object-cover"
                loading="lazy"
              />
              <div className="p-2.5 sm:p-3 bg-white text-center border-t border-slate-100">
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

        {/* Section 5: Batch 2021 Group A Directory */}
        <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2.5 sm:px-3 py-1 rounded-full border border-gold/20 inline-block mb-2 sm:mb-3">
            Batch Directory
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-3 sm:mb-4 tracking-tight">
            Connecting Batch 2021 Group A
          </h2>
          <div className="space-y-3 sm:space-y-4 text-slate-300 text-xs sm:text-sm md:text-[15px] leading-relaxed">
            <p>
              After completing HSC in 2021, students moved on to different universities, career paths, and cities across Bangladesh and abroad.
            </p>
            <p>
              This website serves as our student directory, helping all 132 classmates from Group A find contacts, social profiles, and stay connected as alumni.
            </p>
          </div>
          <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-800 flex flex-wrap gap-4 items-center">
            <Link
              href="/"
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gold text-slate-900 font-bold text-xs sm:text-sm hover:bg-darkGold transition shadow-md"
            >
              View Student Directory →
            </Link>
          </div>
        </section>

        {/* Section 6: Google Map Location */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-7 md:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>📍</span> Campus Location on Google Maps
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Toyenbee Circular Road, Arambagh, Motijheel, Dhaka 1000, Bangladesh.
              </p>
            </div>
            <a
              href="https://maps.google.com/?cid=14324905845214487465"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-600 bg-blue-50 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-200 hover:bg-blue-100 transition shrink-0 self-start sm:self-auto"
            >
              Open in Google Maps ↗
            </a>
          </div>

          <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
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
