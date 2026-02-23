import { getProfileById } from "@/lib/sheets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata(props: any): Promise<Metadata> {
  // props.params may be a Promise in Next typings
  const { id } = await props.params;
  const profile = await getProfileById(id);
  if (!profile) {
    return { title: "Profile - NDC 2021 Group A" };
  }

  const image = profile.image
    ? `/api/image?u=${Buffer.from(profile.image).toString("base64")}`
    : "/badge.png";

  return {
    title: `${profile.name} — NDC 2021 Group A`,
    description: profile.description || `Profile of ${profile.name}, Notre Dame College Batch 2021 Group A.`,
    openGraph: {
      title: `${profile.name} — NDC 2021 Group A`,
      description: profile.description || `Profile of ${profile.name}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

function formatDate(raw: string) {
  if (!raw) return "";
  // Try native Date parsing first (handles ISO and many formats)
  const parsed = Date.parse(raw);
  if (!isNaN(parsed)) {
    const d = new Date(parsed);
    return d.toISOString().slice(0, 10);
  }

  // Match common dd/MM/yyyy or dd/MM/yyyy HH:mm:ss
  const m = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) {
    const [, dd, mm, yyyy] = m;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }

  // Fallback: return first token (could be yyyy-mm-dd)
  const datePart = raw.split(" ")[0];
  return datePart;
}

export default async function ProfilePage(props: any) {
  // `params` may be a plain object or a Promise; await to normalize.
  const { id } = await props.params;
  const profile = await getProfileById(id);

  if (!profile) {
    notFound();
  }

  // Use a proxied image URL in the browser to avoid cross-host embedding
  // restrictions from Drive/postimg. The API expects base64 in `u` param.
  const proxiedImage = profile.image
    ? `/api/image?u=${Buffer.from(profile.image).toString("base64")}`
    : null;
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        {/* Back Button - modern style, sticky on desktop */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-800 hover:text-slate-900 font-semibold bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow transition-colors absolute lg:fixed lg:top-4 lg:left-4 lg:mb-0 lg:bg-white/90 lg:backdrop-blur-sm lg:px-4 lg:py-2 lg:shadow lg:gap-2 lg:rounded-full lg:text-slate-800 lg:hover:text-slate-900 lg:font-semibold lg:transition-colors"
        >
          <span className="text-lg">←</span>
          <span className="hidden lg:inline">Back to Directory</span>
        </Link>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-slate-200">
          {/* JSON-LD for better indexing by search engines and LLMs */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: profile.name,
                image: proxiedImage ?? "/images/user.png",
                description: profile.description || undefined,
                alumniOf: {
                  "@type": "CollegeOrUniversity",
                  name: "Notre Dame College",
                },
                identifier: profile.id,
              }),
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
            {/* Image Section */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-72 h-72 rounded-xl overflow-hidden shadow-lg bg-gray-200 mb-6 relative">
                <Image
                  src={proxiedImage ?? "/images/user.png"}
                  alt={profile.name}
                  width={288}
                  height={288}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <p className="text-lg font-semibold text-gold">
                ID: {profile.id}
              </p>
            </div>

            {/* Details Section */}
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold to-darkGold mb-2">
                {profile.name}
              </h1>
              {profile.lastUpdated && (
                <p className="text-sm text-slate-500 mb-2">
                  Last updated: {formatDate(profile.lastUpdated)}
                </p>
              )}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {profile.description || "No description provided yet."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-8">
                
                {/* Email */}
                {profile.email ? (
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-all border border-slate-100 hover:border-blue-200 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform p-2.5">
                      <Image
                        src="/images/mail.png"
                        alt="Email"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{profile.email}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 opacity-70">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5">
                      <Image
                        src="/images/mail.png"
                        alt="Email"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain grayscale opacity-40"
                      />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-sm font-medium text-slate-500 italic">Not provided</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {profile.phone ? (
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-all border border-slate-100 hover:border-blue-200 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform p-2.5">
                      <Image
                        src="/images/phone.png"
                        alt="Phone"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{profile.phone}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 opacity-70">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5">
                      <Image
                        src="/images/phone.png"
                        alt="Phone"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain grayscale opacity-40"
                      />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-sm font-medium text-slate-500 italic">Not provided</p>
                    </div>
                  </div>
                )}

                {/* LinkedIn */}
                {profile.linkedin ? (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-all border border-slate-100 hover:border-blue-200 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform p-2.5">
                      <Image
                        src="/images/linkedin.png"
                        alt="LinkedIn"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">LinkedIn</p>
                      <p className="text-sm font-semibold text-blue-600 truncate group-hover:underline">View Profile</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 opacity-70">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5">
                      <Image
                        src="/images/linkedin.png"
                        alt="LinkedIn"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain grayscale opacity-40"
                      />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">LinkedIn</p>
                      <p className="text-sm font-medium text-slate-500 italic">Not provided</p>
                    </div>
                  </div>
                )}

                {/* Facebook */}
                {profile.facebook ? (
                  <a
                    href={profile.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-all border border-slate-100 hover:border-blue-200 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform text-xl">
                          <Image
                        src="/images/facebook.svg"
                        alt="Facebook"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                          />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Facebook</p>
                      <p className="text-sm font-semibold text-blue-600 truncate group-hover:underline">View Profile</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 opacity-70">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5 grayscale opacity-40">
                      <Image
                        src="/images/facebook.svg"
                        alt="Facebook"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Facebook</p>
                      <p className="text-sm font-medium text-slate-500 italic">Not provided</p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}