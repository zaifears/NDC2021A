import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/sheets";
import { createSlug } from "@/lib/slug";

export async function GET() {
  try {
    const profiles = await getProfiles();

    const graph = profiles.map((p) => {
        const person: any = {
        "@type": "Person",
        identifier: p.id,
        name: p.name,
        url: `/students/${p.id}/${createSlug(p.name)}`,
        alumniOf: "Notre Dame College",
      };

      const sameAs = [p.facebook, p.linkedin].filter(Boolean);
      if (sameAs.length) person.sameAs = sameAs;

      return person;
    });

    const body = { "@context": "https://schema.org", "@graph": graph };

    return NextResponse.json(body, {
      headers: {
        "Content-Type": "application/ld+json",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "failed to build entities" }, { status: 500 });
  }
}
