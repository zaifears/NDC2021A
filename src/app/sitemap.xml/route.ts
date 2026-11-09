import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/sheets";
import { createSlug } from "@/lib/slug";
import { isProfileFilled, toIsoDate } from "@/lib/profile";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const origin = process.env.NEXT_PUBLIC_BASE_URL || "https://ndc2021a.vercel.app";
    const profiles = await getProfiles();

    // Only profiles that are indexable belong in the sitemap. Unfilled profiles carry
    // `noindex`, and listing a noindex URL in a sitemap sends Google a contradiction.
    const indexable = profiles.filter(isProfileFilled);

    // Real freshness: the newest profile update, never "now".
    const dates = indexable.map((p) => toIsoDate(p.lastUpdated)).filter(Boolean).sort();
    const newest = dates.length ? dates[dates.length - 1] : "";

    const homepage = `
  <url>
    <loc>${escapeXml(origin)}/</loc>${newest ? `\n    <lastmod>${newest}</lastmod>` : ""}
  </url>`;

    const aboutNdcPage = `
  <url>
    <loc>${escapeXml(origin)}/about-ndc</loc>
  </url>`;

    const profileUrls = indexable
      .map((profile) => {
        const lastmod = toIsoDate(profile.lastUpdated);
        const slug = createSlug(profile.name);
        return `
  <url>
    <loc>${escapeXml(`${origin}/students/${encodeURIComponent(profile.id)}/${encodeURIComponent(slug)}`)}</loc>${
          lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""
        }
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${homepage}
${aboutNdcPage}
${profileUrls}
</urlset>
`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error(error);

    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
