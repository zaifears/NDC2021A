import ProfileImage from "@/components/ProfileImage";
import { getProfileById } from "@/lib/sheets";
import Image from "next/image";
import Link from "next/link";
// @ts-ignore: Bypass strict module resolution mismatch for Next.js imports
import { notFound, permanentRedirect } from "next/navigation";
import { createSlug } from "@/lib/slug";


export async function generateMetadata(props: any): Promise<any> {
  const { id } = await props.params;
  const profile = await getProfileById(id);
  if (!profile) {
    return { title: "Profile - NDC 2021 Group A" };
  }

  const correctSlug = createSlug(profile.name);
  const image = profile.image
    ? `/api/image?u=${Buffer.from(profile.image).toString("base64")}`
    : "/badge.png";

  return {
    title: `${profile.name} | Notre Dame College Batch 2021 Group A`,
    description:
      profile.description ||
      `${profile.name} is a student of Notre Dame College Dhaka Batch 2021 Group A. View profile, contact information, and public social links.`,
    alternates: { canonical: `/students/${profile.id}/${correctSlug}` },
    openGraph: {
      type: "profile",
      url: `/students/${profile.id}/${correctSlug}`,
      title: `${profile.name} | Notre Dame College Batch 2021 Group A`,
      description: profile.description || `${profile.name} — Notre Dame College Batch 2021 Group A`,
      images: [{ url: image, width: 1200, height: 630, alt: profile.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: profile.name,
      description: profile.description || `${profile.name} — Notre Dame College Batch 2021 Group A`,
      images: [image],
    },
  };
}

function formatDate(raw: string) {
  if (!raw) return "";
  const m = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) {
    const [, dd, mm, yyyy] = m;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  const parsed = Date.parse(raw);
  if (!isNaN(parsed)) {
    const d = new Date(parsed);
    return d.toISOString().slice(0, 10);
  }
  return raw.split(" ")[0];
}

export default async function ProfilePage(props: any) {
  const { id, slug } = await props.params;
  const profile = await getProfileById(id);

  if (!profile) {
    notFound();
  }

  const correctSlug = createSlug(profile.name);
  if (slug !== correctSlug) {
    // Permanent redirect (308) to canonical URL when slug mismatches live data
    permanentRedirect(`/students/${id}/${correctSlug}`);
  }

  const proxiedImage = profile.image
    ? `/api/image?u=${Buffer.from(profile.image).toString("base64")}`
    : null;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://ndc2021a.vercel.app/students/${profile.id}/${correctSlug}`,
    name: profile.name,
    identifier: profile.id,
    description: profile.description || `${profile.name} - Notre Dame College Batch 2021 Group A`,
    alumniOf: { "@type": "CollegeOrUniversity", name: "Notre Dame College, Dhaka" },
    memberOf: { "@type": "Organization", name: "Notre Dame College Batch 2021 Group A" },
    url: `https://ndc2021a.vercel.app/students/${profile.id}/${correctSlug}`,
    image: proxiedImage ? `https://ndc2021a.vercel.app${proxiedImage}` : "https://ndc2021a.vercel.app/badge.png",
    sameAs: [profile.facebook, profile.linkedin].filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ndc2021a.vercel.app/" },
      { "@type": "ListItem", position: 2, name: profile.name, item: `https://ndc2021a.vercel.app/students/${profile.id}/${correctSlug}` }
    ]
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([personSchema, breadcrumbSchema]) }} />
      <div className="max-w-4xl mx-auto px-4 relative">
        <Link
          href="/"
          // Increased 'left-4' to 'left-6' or 'left-8' to shift it toward the right
          className="group flex absolute top-4 left-6 sm:left-12 z-20 items-center gap-2 pl-3 pr-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-full shadow-sm hover:shadow-md hover:border-gold/50 hover:shadow-gold/10 transition-all duration-300 ease-out active:scale-95"
        >
          <svg 
            className="w-4 h-4 text-slate-500 group-hover:text-gold transition-colors duration-300" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
            Back
          </span>
        </Link>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-slate-100 relative mt-16 lg:mt-0">
          <div className="h-48 sm:h-64 w-full bg-gradient-to-tr from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent opacity-60"></div>
          </div>

          <div className="px-6 sm:px-12 pb-12 relative">

{/* Slightly reduced negative top margin to prevent overcrowding */}
            <div className="absolute -top-28 sm:-top-36 left-1/2 transform -translate-x-1/2">
              {proxiedImage ? (
                <ProfileImage src={proxiedImage} alt={profile.name} />
              ) : (
                <div className="w-44 h-56 sm:w-52 sm:h-72 rounded-3xl overflow-hidden shadow-xl ring-4 ring-white bg-slate-100 relative z-10 flex items-center justify-center text-6xl text-slate-300">
                  👤
                </div>
              )}
            </div>

            {/* Increased top padding to ensure text clears the taller image */}
            <div className="pt-36 sm:pt-44 text-center">
              <div className="flex flex-col items-center gap-3 mb-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{profile.name}</h1>
                <span className="px-3 py-1 bg-gold/10 text-darkGold text-xs font-bold rounded-full border border-gold/20 tracking-wider">ID: {profile.id}</span>
              </div>

              {profile.lastUpdated && (
                <p className="text-xs font-medium text-slate-400 mb-6 flex items-center gap-1.5 justify-center mx-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Updated {formatDate(profile.lastUpdated)}
                </p>
              )}

              </div>

            <div className="max-w-3xl mx-auto mt-8 flex flex-col gap-6 px-4 sm:px-6 w-full pb-12">
              {/* About Section (Top) */}
              <section className="w-full bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 opacity-90" />
                <h3 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-2">
                  <span className="text-xl">👤</span> About
                </h3>
                {profile.description ? (
                  <p className="text-slate-700 leading-relaxed sm:leading-loose whitespace-pre-wrap text-[15px]">{profile.description}</p>
                ) : (
                  <p className="text-slate-400 italic">No description provided.</p>
                )}
              </section>

              {/* Contact & Links Section (Bottom) */}
              <section className="w-full bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6 sm:mb-8 pb-5 border-b border-slate-100">
                  <Image src="/ndc.svg" alt="NDC" width={48} height={48} className="shrink-0 drop-shadow-sm" />
                  <div>
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">Contact & Links</h4>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Get in touch or view social profiles</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email</div>
                    {profile.email ? (
                      <a href={`mailto:${profile.email}`} className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all duration-200 border border-slate-100 hover:border-blue-200 hover:shadow-sm group w-full">
                        <Image src="/images/mail.png" alt="Email" width={20} height={20} className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                        <span className="font-medium truncate text-sm sm:text-base">{profile.email}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 text-slate-400 border border-slate-100 w-full">
                        <Image src="/images/mail.png" alt="Email" width={20} height={20} className="shrink-0 opacity-30" />
                        <span className="italic text-sm">Not provided</span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  {profile.phone && (
                    <div className="flex flex-col gap-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Phone</div>
                      <a href={`tel:${profile.phone}`} className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-all duration-200 border border-slate-100 hover:border-emerald-200 hover:shadow-sm group w-full">
                        <Image src="/images/phone.png" alt="Phone" width={20} height={20} className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                        <span className="font-medium truncate text-sm sm:text-base">{profile.phone}</span>
                      </a>
                    </div>
                  )}

                  {/* LinkedIn */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">LinkedIn</div>
                    {profile.linkedin ? (
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#0A66C2]/5 text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all duration-200 font-semibold border border-[#0A66C2]/20 hover:border-[#0A66C2]/40 hover:shadow-sm w-full">
                        <Image src="/images/linkedin.png" alt="LinkedIn" width={20} height={20} className="shrink-0" />
                        <span className="text-sm sm:text-base">View Profile</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 text-slate-400 border border-slate-100 w-full">
                        <Image src="/images/linkedin.png" alt="LinkedIn" width={20} height={20} className="shrink-0 opacity-40 grayscale" />
                        <span className="italic text-sm">No LinkedIn</span>
                      </div>
                    )}
                  </div>

                  {/* Facebook */}
                  <div className="flex flex-col gap-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Facebook</div>
                    {profile.facebook ? (
                      <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#0866FF]/5 text-[#0866FF] hover:bg-[#0866FF]/10 transition-all duration-200 font-semibold border border-[#0866FF]/20 hover:border-[#0866FF]/40 hover:shadow-sm w-full">
                        <Image src="/images/facebook.svg" alt="Facebook" width={20} height={20} className="shrink-0" />
                        <span className="text-sm sm:text-base">View Profile</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 text-slate-400 border border-slate-100 w-full">
                        <Image src="/images/facebook.svg" alt="Facebook" width={20} height={20} className="shrink-0 opacity-40 grayscale" />
                        <span className="italic text-sm">No Facebook</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Last Updated Footer */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Last Updated</span>
                  <span className="font-mono text-xs sm:text-sm text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200/50">
                    {profile.lastUpdated ? formatDate(profile.lastUpdated) : "—"}
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
