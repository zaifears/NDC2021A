import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/sheets";

export const revalidate = 300;

export async function GET() {
  try {
    const profiles = await getProfiles();
    return NextResponse.json(profiles, {
      headers: { "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch (err) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
