import ProfileCard from "@/components/ProfileCard";
import { getProfiles } from "@/lib/sheets";

export default async function Home() {
  const profiles = await getProfiles();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gold mb-4">
            Notre Dame College Batch 2021 Group A
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to our batch directory. Click on any profile to view
            detailed information including contact details and LinkedIn profile.
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
      </div>
    </main>
  );
}
