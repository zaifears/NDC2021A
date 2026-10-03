import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/sheets";
import { createSlug } from "@/lib/slug";

export const revalidate = 300;

export async function GET() {
  const origin = process.env.NEXT_PUBLIC_BASE_URL || "https://ndc2021a.vercel.app";
  const profiles = await getProfiles();

  return NextResponse.json(
    {
      "@context": "https://schema.org",

      "@type": "Dataset",

      name: "Notre Dame College Batch 2021 Group A Directory",

      description:
        "Public directory of Notre Dame College Batch 2021 Group A students.",

      url: origin,

      version: "1.0",

      license: "https://github.com/zaifears/NDC2021A",

      creator: {
        "@type": "Person",
        name: "Md. Al Shahoriar Hossain",
        url: "https://shahoriar.bd",
      },

      publisher: {
        "@type": "Organization",
        name: "NDC 2021 Group A Community",
      },

      dateModified: new Date().toISOString(),

      numberOfProfiles: profiles.length,

      profiles: profiles.map((profile) => ({
        id: profile.id,

        name: profile.name,

        description: profile.description,

        url: `${origin}/students/${profile.id}/${createSlug(profile.name)}`,

        image: profile.image,

        email: profile.email,

        linkedin: profile.linkedin,

        facebook: profile.facebook,

        updated: profile.lastUpdated,
      })),
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}