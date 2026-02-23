import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/sheets";

export async function GET() {
  try {
    const profiles = await getProfiles();
    return NextResponse.json(profiles, {
      headers: { "Cache-Control": "public, max-age=60" },
    });
  } catch (err) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
