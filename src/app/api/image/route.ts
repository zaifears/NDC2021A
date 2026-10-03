import { NextResponse } from 'next/server';

const ALLOWED_HOSTS = new Set([
  'drive.google.com',
  'lh3.googleusercontent.com',
  'postimg.cc',
  'i.postimg.cc',
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const u = searchParams.get('u');
  if (!u) return NextResponse.json({ error: 'missing param' }, { status: 400 });

  let url: string;
  try {
    url = Buffer.from(u, 'base64').toString('utf8');
  } catch (err) {
    return NextResponse.json({ error: 'invalid param' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch (err) {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return NextResponse.json({ error: 'host not allowed' }, { status: 403 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      // Gracefully redirect to fallback badge on remote 403/429/404/500 rather than crashing
      return NextResponse.redirect(new URL('/badge.png', request.url));
    }

    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const body = res.body;

    // Cache on Edge CDN for 7 days (s-maxage=604800) so subsequent visitors hit Edge Cache with 0 serverless cost
    return new NextResponse(body, {
      status: 200,
      headers: {
        'content-type': contentType,
        'cache-control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    });
  } catch (err: any) {
    // Graceful fallback to default badge on timeout or network error
    return NextResponse.redirect(new URL('/badge.png', request.url));
  }
}
