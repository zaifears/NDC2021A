import ProfileCard from "@/components/ProfileCard";
import { getProfiles } from "@/lib/sheets";

export default async function Home() {
  const profiles = await getProfiles();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* About Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-gold mb-6">
          NDC 2021A Batch Directory
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to the official directory for Notre Dame College Batch 2021 Group A. This site is a community&#39;driven project to help you connect with your classmates, discover their backgrounds, and stay in touch.
        </p>
        <p className="text-md text-gray-500 mb-2">
          - Browse all 132 members (even if they haven't filled out their profile yet)
          <br />- Click a profile to see more details, contact info, and social links
          <br />- Data is managed securely via Google Forms & Sheets
        </p>
        <p className="text-md text-gray-400 mt-6">
          Built with Next.js, TypeScript, and Tailwind CSS.<br />
          Open source project by <a href="https://zaifears.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline hover:text-blue-800">Md Al Shahoriar Hossain (62101030)</a>.
        </p>
      </section>

      {/* Profiles Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gold mb-4">
            Meet the Batch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scroll down to explore all members. Click on any profile to view detailed information including contact details and social links.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total Members: {profiles.length}
          </p>
        </div>

        {/* Grid of Profiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>
    </main>
  );
}
