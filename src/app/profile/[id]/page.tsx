import { getProfileById } from "@/lib/sheets";
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
              <div className="w-64 h-64 rounded-lg overflow-hidden shadow-md bg-gray-200 mb-4">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
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
                {profile.description}
              </p>

              <div className="space-y-4 mt-8">
                {/* Email */}
                <div className="border-b pb-4">
                  <p className="text-sm font-semibold text-gray-500 uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-lg text-primary hover:underline"
                  >
                    {profile.email}
                  </a>
                </div>

                {/* Phone */}
                <div className="border-b pb-4">
                  <p className="text-sm font-semibold text-gray-500 uppercase">
                    Phone
                  </p>
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-lg text-primary hover:underline"
                  >
                    {profile.phone}
                  </a>
                </div>

                {/* LinkedIn */}
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase">
                    LinkedIn
                  </p>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-primary hover:underline inline-flex items-center gap-2"
                  >
                    Visit Profile →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
