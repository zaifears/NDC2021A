import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/sheets";

export async function GET(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const profiles = await getProfiles();

    const urls = profiles.map((p) => {
      const loc = `${origin}/profile/${encodeURIComponent(p.id)}`;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    });

    // Add homepage first
    const homepage = `  <url>\n    <loc>${origin}/</loc>\n  </url>`;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${homepage}\n${urls.join("\n")}\n</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    return new NextResponse("", { status: 500 });
  }
}
