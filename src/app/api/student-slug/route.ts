import { NextResponse } from "next/server";
import { getProfileById } from "@/lib/sheets";
import { createSlug } from "@/lib/slug";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

    const profile = await getProfileById(id);
    if (!profile) return NextResponse.json({ error: "not found" }, { status: 404 });

    return NextResponse.json({ slug: createSlug(profile.name) }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
