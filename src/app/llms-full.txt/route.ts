import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/sheets";
import { createSlug } from "@/lib/slug";
import { isProfileFilled } from "@/lib/profile";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

// A plain-text, link-rich rendering of the whole site for language models.
// Contact details (email, phone) are left out on purpose: they live on each profile page only.
export async function GET() {
  const profiles = await getProfiles();
  const sorted = [...profiles].sort((a, b) => a.name.localeCompare(b.name));
  const url = (p: { id: string; name: string }) => `${SITE_URL}/students/${p.id}/${createSlug(p.name)}`;

  const lines: string[] = [];
  lines.push("# Notre Dame College Batch 2021 Group A Student Directory", "");
  lines.push(
    `> Public directory of ${profiles.length} students of Notre Dame College (NDC), Dhaka, Batch 2021, Group A (Business Studies). Profiles are submitted voluntarily by the students through an official form.`,
    ""
  );
  lines.push("## Pages", "");
  lines.push(`- [Directory home](${SITE_URL}/): search the register by name or 8-digit ID.`);
  lines.push(
    `- [About Notre Dame College and the ID guide](${SITE_URL}/about-ndc): college history (founded 1949 by the Congregation of Holy Cross), Room 153 in the Father Tim Building, how the 8-digit roll number is built, campus map.`,
    ""
  );
  lines.push("## Facts", "");
  lines.push("- College: Notre Dame College, Arambagh, Motijheel, Dhaka 1000, Bangladesh. Website: https://ndc.edu.bd/");
  lines.push("- Batch: HSC 2021. Group A is the Business Studies section; student IDs start with 62101 (6 = Business Studies, 21 = batch year, 01 = Group A).");
  lines.push("- Classroom: Father Tim Building (Father Timm Bhaban), ground floor, Room 153.");
  lines.push("- Profile URL pattern: /students/{id}/{name-slug}. The last three digits of an ID are a roll number, not a rank.", "");
  lines.push("## Members", "");
  lines.push("Every member is listed. Members marked (profile) have shared details such as a bio, photo or social links on their page.", "");
  for (const p of sorted) {
    lines.push(`- [${p.name}](${url(p)}) ID ${p.id}${isProfileFilled(p) ? " (profile)" : ""}`);
  }
  lines.push("", "## Machine-readable data", "");
  lines.push(`- [Sitemap](${SITE_URL}/sitemap.xml)`);
  lines.push(`- [Dataset JSON-LD](${SITE_URL}/knowledge.json)`);
  lines.push(`- [Person graph JSON-LD](${SITE_URL}/entities.json)`, "");

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
