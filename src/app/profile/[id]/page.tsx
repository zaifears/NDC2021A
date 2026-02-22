import { getProfileById } from "@/lib/sheets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const profile = await getProfileById(id);

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-blue-700 mb-6 font-semibold"
        >
          ← Back to Directory
        </Link>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-64 h-64 rounded-lg overflow-hidden shadow-md bg-gray-200 mb-4 relative">
                <Image
                  src={profile.image || "/images/user.png"}
                  alt={profile.name}
                  fill
                  sizes="256px"
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-lg font-semibold text-gold">
                ID: {profile.id}
              </p>
            </div>

            {/* Details Section */}
            <div>
              <h1 className="text-4xl font-bold text-gold mb-2">
                {profile.name}
              </h1>
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
                      <img src="/images/mail.png" alt="Email" className="w-full h-full object-contain" />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{profile.email}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 opacity-70">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5">
                      <img src="/images/mail.png" alt="Email" className="w-full h-full object-contain grayscale opacity-40" />
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
                      <img src="/images/phone.png" alt="Phone" className="w-full h-full object-contain" />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{profile.phone}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 opacity-70">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5">
                      <img src="/images/phone.png" alt="Phone" className="w-full h-full object-contain grayscale opacity-40" />
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
                      <img src="/images/linkedin.png" alt="LinkedIn" className="w-full h-full object-contain" />
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">LinkedIn</p>
                      <p className="text-sm font-semibold text-blue-600 truncate group-hover:underline">View Profile</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 opacity-70">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-2.5">
                      <img src="/images/linkedin.png" alt="LinkedIn" className="w-full h-full object-contain grayscale opacity-40" />
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
                      🌐
                    </div>
                    <div className="overflow-hidden text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Facebook</p>
                      <p className="text-sm font-semibold text-blue-600 truncate group-hover:underline">View Profile</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 opacity-70">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-xl grayscale opacity-40">
                      🌐
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