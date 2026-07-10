import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/sheets";
import { createSlug } from "@/lib/slug";

// Helper to safely parse Google Sheets dates for the sitemap XML
function getSafeLastMod(raw: string) {
  if (!raw) return new Date().toISOString();
  
  // Try to extract DD/MM/YYYY
  const m = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) {
    const [, dd, mm, yyyy] = m;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`; // Valid W3C sitemap format
  }
  
  // Standard JS parse fallback
  const parsed = Date.parse(raw);
  if (!isNaN(parsed)) {
    return new Date(parsed).toISOString();
  }
  
  // Ultimate fallback to prevent crashes
  return new Date().toISOString();
}

export async function GET(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const profiles = await getProfiles();

    const homepage = `
  <url>
    <loc>${origin}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;

    const profileUrls = profiles
      .map((profile) => {
        const lastmod = getSafeLastMod(profile.lastUpdated);

        const slug = createSlug(profile.name);

        return `
  <url>
    <loc>${origin}/students/${encodeURIComponent(profile.id)}/${encodeURIComponent(slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${homepage}

${profileUrls}

</urlset>`;

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