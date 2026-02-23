import ProfileDirectory from "@/components/ProfileDirectory";
import Image from "next/image";
import { getProfiles } from "@/lib/sheets";

export default async function Home() {
  const profiles = await getProfiles();

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
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
          NDC 2021 <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-darkGold">Group A</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          Welcome to the official directory for Notre Dame College Batch 2021 Group A. This site is a community-driven project to help you connect with your classmates, discover their backgrounds, and stay in touch.
        </p>
        <div className="flex justify-center gap-4 text-sm text-slate-600 font-medium">
          <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-slate-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> {profiles.length} Members
          </div>
        </div>
      </section>

      {/* Features Grid (Replaces old bullet points) */}
      <section className="max-w-5xl mx-auto px-4 pb-16 w-full z-10">
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

      {/* Searchable Directory and profile grid */}
      <ProfileDirectory profiles={profiles} />

      {/* Footer / Credits */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500 mb-3">
            Built with <span className="font-semibold text-slate-700">Next.js, TypeScript, and Tailwind CSS</span>.
          </p>
          <p className="text-sm text-slate-500">
            Open source project by <a href="https://zaifears.vercel.app" target="_blank" rel="noopener noreferrer" className="font-bold text-gold hover:text-darkGold transition-colors underline decoration-gold/30 hover:decoration-gold underline-offset-4">Md Al Shahoriar Hossain (62101030)</a>.
          </p>
        </div>
      </footer>
    </main>
  );
}