import { NextResponse } from "next/server";
import { getProfiles } from "@/lib/sheets";
import { createSlug } from "@/lib/slug";

const INDEXNOW_KEY = "b87e4fcc78a84826a48769b40cdaebf3";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export const dynamic = "force-dynamic";

async function submitToIndexNow(urls: string[], baseUrl: string) {
  const host = new URL(baseUrl).host;
  const keyLocation = `${baseUrl}/${INDEXNOW_KEY}.txt`;

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList: urls,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  return {
    status: response.status,
    ok: response.ok,
    statusText: response.statusText,
    submittedCount: urls.length,
    host,
    keyLocation,
  };
}

export async function POST(request: Request) {
  try {
    const origin = process.env.NEXT_PUBLIC_BASE_URL || "https://ndc2021a.vercel.app";
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    let urlsToSubmit: string[] = [];

    if (Array.isArray(body.urls) && body.urls.length > 0) {
      urlsToSubmit = body.urls;
    } else {
      // Gather all directory URLs: homepage, about page + all student profiles
      const profiles = await getProfiles();
      urlsToSubmit = [
        `${origin}/`,
        `${origin}/about-ndc`,
        ...profiles.map(
          (p) => `${origin}/students/${encodeURIComponent(p.id)}/${encodeURIComponent(createSlug(p.name))}`
        ),
      ];
    }

    const result = await submitToIndexNow(urlsToSubmit, origin);

    return NextResponse.json({
      success: result.ok,
      result,
      urlsCount: urlsToSubmit.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "IndexNow submission failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const origin = process.env.NEXT_PUBLIC_BASE_URL || "https://ndc2021a.vercel.app";
    const profiles = await getProfiles();
    const urlsToSubmit = [
      `${origin}/`,
      `${origin}/about-ndc`,
      ...profiles.map(
        (p) => `${origin}/students/${encodeURIComponent(p.id)}/${encodeURIComponent(createSlug(p.name))}`
      ),
    ];

    const result = await submitToIndexNow(urlsToSubmit, origin);

    return NextResponse.json({
      success: result.ok,
      message: result.ok
        ? `Successfully submitted ${urlsToSubmit.length} URLs to IndexNow`
        : `IndexNow responded with status ${result.status}: ${result.statusText}`,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "IndexNow submission failed" },
      { status: 500 }
    );
  }
}
