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
      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Back Button (desktop only, shifted right) */}
        <Link
          href="/"
          className="hidden lg:flex absolute top-4 left-12 z-20 items-center gap-1 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors"
        >
          <span className="text-lg text-slate-800">←</span>
          <span className="hidden sm:inline text-sm font-medium text-slate-800">Back</span>
        </Link>

        {/* Profile Container */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-slate-100 relative mt-16 lg:mt-0">
          {/* Cover Banner */}
          <div className="h-48 sm:h-64 w-full bg-gradient-to-tr from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent opacity-60"></div>
          </div>

          <div className="px-6 sm:px-12 pb-12 relative">
            {/* Overlapping Avatar */}
            <div className="absolute -top-28 sm:-top-32 left-1/2 transform -translate-x-1/2">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden shadow-xl ring-4 ring-white bg-slate-100 relative z-10">
                <Image
                  src={proxiedImage ?? "/images/user.png"}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Header Info */}
            <div className="pt-20 sm:pt-24 text-center">
              <div className="flex flex-col items-center gap-3 mb-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {profile.name}
                </h1>
                {/* Sleek ID Badge */}
                <span className="px-3 py-1 bg-gold/10 text-darkGold text-xs font-bold rounded-full border border-gold/20 tracking-wider">
                  ID: {profile.id}
                </span>
              </div>

              {profile.lastUpdated && (
                <p className="text-xs font-medium text-slate-400 mb-6 flex items-center gap-1.5 justify-center mx-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Updated {formatDate(profile.lastUpdated)}
                </p>
              )}

              <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto text-center">
                {profile.description || "No description provided yet."}
              </p>
            </div>

            <hr className="my-10 border-slate-100" />

            {/* Contact Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              {profile.email ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform p-2.5 border border-slate-100">
                    <Image src="/images/mail.png" alt="Email" width={20} height={20} className="object-contain" />
                  </div>
                  <div className="overflow-hidden text-left flex-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{profile.email}</p>
                  </div>
                  <span className="text-slate-300 group-hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity pr-2">↗</span>
                </a>
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 opacity-60">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5 border border-slate-100 grayscale opacity-40">
                    <Image src="/images/mail.png" alt="Email" width={20} height={20} className="object-contain" />
                  </div>
                  <div className="overflow-hidden text-left flex-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm font-medium text-slate-500 italic">Not provided</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {profile.phone ? (
                <a
                  href={`tel:${profile.phone}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform p-2.5 border border-slate-100">
                    <Image src="/images/phone.png" alt="Phone" width={20} height={20} className="object-contain" />
                  </div>
                  <div className="overflow-hidden text-left flex-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{profile.phone}</p>
                  </div>
                  <span className="text-slate-300 group-hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity pr-2">↗</span>
                </a>
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 opacity-60">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5 border border-slate-100 grayscale opacity-40">
                    <Image src="/images/phone.png" alt="Phone" width={20} height={20} className="object-contain" />
                  </div>
                  <div className="overflow-hidden text-left flex-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
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
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform p-2.5 border border-slate-100">
                    <Image src="/images/linkedin.png" alt="LinkedIn" width={20} height={20} className="object-contain" />
                  </div>
                  <div className="overflow-hidden text-left flex-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">LinkedIn</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">View Profile</p>
                  </div>
                  <span className="text-slate-300 group-hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity pr-2">↗</span>
                </a>
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 opacity-60">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5 border border-slate-100 grayscale opacity-40">
                    <Image src="/images/linkedin.png" alt="LinkedIn" width={20} height={20} className="object-contain" />
                  </div>
                  <div className="overflow-hidden text-left flex-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">LinkedIn</p>
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
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform p-2.5 border border-slate-100">
                    <Image src="/images/facebook.svg" alt="Facebook" width={20} height={20} className="object-contain" />
                  </div>
                  <div className="overflow-hidden text-left flex-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Facebook</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">View Profile</p>
                  </div>
                  <span className="text-slate-300 group-hover:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity pr-2">↗</span>
                </a>
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 opacity-60">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5 border border-slate-100 grayscale opacity-40">
                    <Image src="/images/facebook.svg" alt="Facebook" width={20} height={20} className="object-contain" />
                  </div>
                  <div className="overflow-hidden text-left flex-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Facebook</p>
                    <p className="text-sm font-medium text-slate-500 italic">Not provided</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}